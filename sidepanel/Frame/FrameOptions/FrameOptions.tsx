import { VscClose, VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";
import styles from "./FrameOptions.module.css";
import { useState } from "react";
import { splitNode, type TreeNode } from "../FrameUtils";
import { CgMoreVertical } from "react-icons/cg";
import { useStorage } from "@plasmohq/storage/hook";
interface FrameOptionsProps {
  frameNode: TreeNode,
  setRefreshState: CallableFunction,
  onClose: CallableFunction,
  scale: number,
  setScale: CallableFunction,
  fitVideo: boolean,
  setFitVideo: CallableFunction
}

const FrameOptions = (
  {
    frameNode,
    setRefreshState,
    onClose,
    scale,
    setScale,
    fitVideo,
    setFitVideo
  }: FrameOptionsProps
) => {

  const [showScale, setShowScale] = useState(false)
  const [landscape] = useStorage("landscape", false)

  function handleSplit(splitDirection: "vertical" | "horizontal") {
    splitNode(frameNode, splitDirection)
    setRefreshState((old: boolean) => !old)
  }

  function handleClose() {
    onClose()
  }

  return (
    <div className={styles.frameOptions}>
      {showScale &&

        <div
          className={styles.popupOptions}
        >
          <div>
            Scale:
            <input
              type="range"
              min={0.3}
              max={1.5}
              step={0.05}
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
            />
            {scale}

          </div>
          <div >
            Expand to fit video:
            <input
              type="checkbox"
              checked={fitVideo}
              onChange={() => setFitVideo(!fitVideo)}
            />
          </div>

        </div>



      }
      <button
        onClick={() => setShowScale((old: boolean) => !old)}
        style={showScale ? { background: "#0275FF", color: "white" } : {}}
      >
        <CgMoreVertical />
      </button>
      <button onClick={() => handleSplit("vertical")}>
        {
          landscape ?
            <VscSplitHorizontal /> :
            <VscSplitVertical />
        }
      </button>
      <button onClick={() => handleSplit("horizontal")}>
        {
          !landscape ?
            <VscSplitHorizontal /> :
            <VscSplitVertical />
        }
      </button>
      <button onClick={() => handleClose()}>
        <VscClose />
      </button>
    </div>
  );
}

export default FrameOptions;