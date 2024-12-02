import { type ImperativePanelGroupHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./Frame.module.css"
import FrameOptions from "./FrameOptions/FrameOptions";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaEraser } from "react-icons/fa";
import Scale from "./Scale/Scale";
import CustomIframe from "./CustomIframe/CustomIframe";
import { removeNode, saveTree, type TreeNode } from "./FrameUtils";
import { frameTree } from "~sidepanel";
import { useStorage } from "@plasmohq/storage/hook";

interface FrameProps {
  frameNode: TreeNode,
  onClose: CallableFunction
}

const Frame = ({ frameNode, onClose }: FrameProps) => {
  const [showFrameOptions] = useStorage("showFrameOptions", true)
  const [refreshState, setRefreshState] = useState(false)
  const [urlInput, setUrlInput] = useState(frameNode.data.url)
  const [url, setUrl] = useState(frameNode.data.url)
  const [scale, setScale] = useState(frameNode.data.scale)
  const [fitVideo, setFitVideo] = useState(frameNode.data.fitVideo)
  const [refreshIframe, setRefreshIframe] = useState(false)
  const panelGroupRef = useRef<ImperativePanelGroupHandle | null>(null)

  function handleChildClose(targetChild: "left" | "right") {
    removeNode(frameNode, targetChild)
    saveTree(frameTree)
    setRefreshState((old: boolean) => !old)
  }

  function handleResize(layout: number[]) {
    if (
      frameNode.data.splitDirection !== "notSplit" &&
      frameNode.left !== null &&
      frameNode.right !== null
    ) {
      frameNode.left.data.panelSize = layout[0]
      frameNode.right.data.panelSize = layout[1]
      saveTree(frameTree)
    }
  }

  function changeScale(newScale: number) {
    frameNode.data.scale = newScale
    setScale(newScale)
    saveTree(frameTree)
  }

  function changeUrl(newUrl: string) {
    frameNode.data.url = newUrl
    setUrl(newUrl)
    setUrlInput(newUrl)
    setRefreshIframe(true)
    saveTree(frameTree)
  }

  function changeFitVideo(newValue: boolean) {
    frameNode.data.fitVideo = newValue
    setFitVideo(newValue)
    saveTree(frameTree)
  }

  function handleUrlSubmit(event: FormEvent) {
    event.preventDefault()
    if (
      !urlInput.startsWith("https://") ||
      !urlInput.startsWith("https://")
    ) {
      setUrlInput(() => {
        changeUrl("https://" + urlInput)
        return "https://" + urlInput
      })
    } else {
      changeUrl(urlInput)
    }
  }

  useEffect(() => {
    setUrl(frameNode.data.url)
    setUrlInput(frameNode.data.url)
    setRefreshIframe(true)
  }, [frameNode.data.url])

  if (
    frameNode.data.splitDirection !== "notSplit" &&
    frameNode.left !== null &&
    frameNode.right !== null
  ) {

    if (panelGroupRef.current) {
      // Set layout for child nodes.
      const panelGroup = panelGroupRef.current
      panelGroup.setLayout([
        frameNode.left.data.panelSize,
        frameNode.right.data.panelSize
      ])
    }

    return (
      <Panel
        defaultSize={frameNode.data.panelSize}
      >
        <PanelGroup
          ref={panelGroupRef}
          direction={frameNode.data.splitDirection}
          onLayout={handleResize}
        >
          <Frame
            frameNode={frameNode.left}
            onClose={() => handleChildClose("left")}
          />
          <PanelResizeHandle
            className={styles.resizableHandle}
          />
          <Frame
            frameNode={frameNode.right}
            onClose={() => handleChildClose("right")}
          />
        </PanelGroup>
      </Panel>
    )
  }

  return (
    <Panel
      className={styles.panel}
      defaultSize={frameNode.data.panelSize}
    >
      {/* Frame input */}
      <div
        className={styles.frameInput}
        style={
          showFrameOptions ?
            {} :
            { display: "none" }
        }
      >
        <button
          onClick={() => changeUrl(url)}
        >
          <BiRefresh />
        </button>
        <form
          onSubmit={handleUrlSubmit}
          className={styles.urlInput}
        >
          <input
            type="text"
            placeholder="Enter url here..."
            value={urlInput}
            onChange={(event) => { setUrlInput(event.target.value) }}
            style={url === urlInput ? { backgroundColor: "#AADFA3" } : { backgroundColor: "#DADADA" }}
          />
        </form>
        <button
          onClick={() => changeUrl("")}
        >
          <FaEraser />
        </button>

      </div>

      {/* Iframe */}
      <div className={styles.frameContent}>
        <Scale
          scale={scale}
        >
          <CustomIframe
            src={url}
            refreshIframe={refreshIframe}
            setRefreshIframe={setRefreshIframe}
            fitVideo={fitVideo}
          />
        </Scale>
      </div>

      {/* Frame options */}
      <div
        className={styles.frameOptions}
        style={
          showFrameOptions ?
            {} :
            { display: "none" }
        }
      >
        <FrameOptions
          frameNode={frameNode}
          setRefreshState={setRefreshState}
          onClose={onClose}
          scale={scale}
          setScale={changeScale}
          fitVideo={fitVideo}
          setFitVideo={changeFitVideo}
        />
      </div>
    </Panel>
  )

}

export default Frame;