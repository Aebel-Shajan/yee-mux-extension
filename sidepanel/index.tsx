import Frame from "./Frame/Frame";
import styles from "./index.module.css"
import { PanelGroup } from "react-resizable-panels";
import { getRightMostLeafNode, loadTree, saveTree, splitNode, type TreeNode } from "./Frame/FrameUtils";
import { Storage } from "@plasmohq/storage"
import { useEffect, useState } from "react";

// Setup storage
const storage = new Storage({
  area: "local"
})

export let frameTree: TreeNode = {
  data: {
    panelSize: 100,
    splitDirection: "notSplit",
    url: "",
    scale: 1,
    fitVideo: true
  },
  left: null,
  right: null
}


const App = () => {
  const [refreshState, setRefreshState] = useState(false)

  function handleRootClose() {
    throw new Error("Can't closse root frame!")
  }

  useEffect(() => {
    // On start immediately load tree from storage
    try {
      loadTree().then((tree: TreeNode) => {
        frameTree = tree
        setRefreshState(old => !old)
      })
    } catch (error) {
      console.log(error)
      saveTree(frameTree)
    }

    // Setup message port with the background.ts
    const port = chrome.runtime.connect({ name: 'sidepanel' });
    const intervalId = setInterval(() => {
      port.postMessage({ info: "keeping connection open" });
    }, 1000);
    port.onDisconnect.addListener(() => {
      clearInterval(intervalId)
    })

    // On message split the last node and add in new
    chrome.runtime.onMessage.addListener((message) => {
      const nodeToSplit = getRightMostLeafNode(frameTree)
      splitNode(nodeToSplit, "vertical")
      if (nodeToSplit.right) {
        nodeToSplit.right.data.url = message.url
      }
      setRefreshState(old=> !old)
    })

    return (() => {
      clearInterval(intervalId);
      port.disconnect();
    })
  }, [])

  return (
    <div className={styles.appContainer}>
      <PanelGroup
        direction="vertical"
        className={styles.frameContainer}
      >
        <Frame
          frameNode={frameTree}
          onClose={handleRootClose}
        />
      </PanelGroup>
    </div>
  );
}

export default App;