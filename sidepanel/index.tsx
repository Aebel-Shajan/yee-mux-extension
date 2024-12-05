import Frame from "./Frame/Frame";
import styles from "./index.module.css"
import { PanelGroup } from "react-resizable-panels";
import { getRightMostLeafNode, loadTree, saveTree, splitNode, type TreeNode } from "./Frame/FrameUtils";
import { useEffect, useState } from "react";
import Options from "./Options/Options";

export let frameTree: TreeNode = {
  data: {
    panelSize: 100,
    splitDirection: "notSplit",
    url: "",
    scale: 0.7,
    fitVideo: true
  },
  left: null,
  right: null
}


const App = () => {
  console.log("rerendered!")
  const [state, setState] = useState(Date.now());

  function handleRootClose() {
    throw new Error("Can't closse root frame!")
  }

  function forceRefresh() {
    setState(Date.now())
    frameTree = {...loadTree()}
  }

  useEffect(() => {
    // On start immediately load tree from storage
    try {
      forceRefresh()
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
      console.log(message)
      if (message.url) {
        const targetNode = getRightMostLeafNode(frameTree)
        if (targetNode.data.url === "") {
          targetNode.data.url = message.url
        } else {
          splitNode(targetNode, "vertical")
          if (targetNode.right) {
            targetNode.right.data.url = message.url
          }
        }
        saveTree(frameTree)
        forceRefresh()
      }
    })

    return (() => {
      clearInterval(intervalId);
      port.disconnect();
    })
  }, [])
  console.log("Rendered: ", frameTree)
  return (
    // Used key to force a rerender of child states because react is tryna be smart 
    <div className={styles.appContainer} key={state}> 
      <Options forceRefresh={forceRefresh}/>
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