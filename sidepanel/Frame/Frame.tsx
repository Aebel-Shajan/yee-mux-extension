import { type ImperativePanelGroupHandle, Panel, PanelGroup, PanelResizeHandle, type PanelResizeHandleProps } from "react-resizable-panels";
import styles from "./Frame.module.css"
import FrameOptions from "./FrameOptions/FrameOptions";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
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
  const [landscape] = useStorage("landscape", false)
  const [refreshState, setRefreshState] = useState(false)
  const [urlInput, setUrlInput] = useState(frameNode.data.url)
  const [url, setUrl] = useState(frameNode.data.url)
  const [scale, setScale] = useState(frameNode.data.scale)
  const [fitVideo, setFitVideo] = useState(frameNode.data.fitVideo)
  const [refreshIframe, setRefreshIframe] = useState(false)
  const panelGroupRef = useRef<ImperativePanelGroupHandle | null>(null)
  const [childMinimized, setChildMinimized] = useState<boolean>(false)

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

      const isChildMinimized = frameNode.left.data.panelSize <= 2 ||
        frameNode.right.data.panelSize <= 2
      setChildMinimized(isChildMinimized)
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
      !urlInput.startsWith("https://") &&
      !urlInput.startsWith("http://") &&
      !urlInput.startsWith("file://") &&
      !urlInput.startsWith("data:image/")
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


  useEffect(() => {
    setRefreshState(old => !old)
  }, [frameNode.data])

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
          direction={
            !landscape ?
              frameNode.data.splitDirection :
              frameNode.data.splitDirection === "vertical" ?
                "horizontal" :
                "vertical"
          }
          onLayout={handleResize}
        >
          <Frame
            frameNode={frameNode.left}
            onClose={() => handleChildClose("left")}
          />
          <PanelResizeHandle
            className={styles.resizableHandle}
            style={
              childMinimized ?
                { backgroundColor: "#d63336" } :
                {}
            }
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
            changeUrl={changeUrl}
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
            <FaHome />
          </button>

        </div>
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