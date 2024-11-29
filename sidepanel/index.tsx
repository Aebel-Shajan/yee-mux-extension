import Frame from "./Frame/Frame";
import styles from "./index.module.css"
import { PanelGroup } from "react-resizable-panels";
import {  loadTree, saveTree, type TreeNode } from "./Frame/FrameUtils";


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

try {
  frameTree = loadTree()
} catch {
  console.log("couldnt load tree from memory")
  saveTree(frameTree)
}



const App = () => {
  function handleRootClose() {
    throw new Error("Can't closse root frame!")
  }
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