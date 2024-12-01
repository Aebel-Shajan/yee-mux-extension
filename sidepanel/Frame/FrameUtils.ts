import { Storage } from "@plasmohq/storage"

// Setup storage
const storage = new Storage({
  area: "local"
})


export type splitType = "horizontal" | "vertical" | "notSplit"

export interface FrameData {
  panelSize: number,
  splitDirection: splitType,
  url: string,
  scale: number,
  fitVideo: boolean
}

export interface TreeNode {
  data: FrameData,
  left: TreeNode | null,
  right: TreeNode | null
}

export function createNewNode(
  url:string=""
): TreeNode {
  return {
    data: {
      panelSize: 50,
      splitDirection: "notSplit",
      url: url,
      scale: 1,
      fitVideo: true,
    },
    left: null,
    right: null
  }
}

export function insertChildren(
  parent: TreeNode,
  leftChild: TreeNode,
  rightChild: TreeNode
) {
  if (parent.data.splitDirection === "notSplit") {
    parent.data.splitDirection = "vertical"
  }
  if (parent.data.url !== "") {
    parent.data.url = ""
  }
  parent.left = leftChild
  parent.right = rightChild
}

export function splitNode(
  nodeToSplit: TreeNode,
  splitDirection: "vertical" | "horizontal",
) {
  const preservedData = {...nodeToSplit.data}
  nodeToSplit.data.splitDirection = splitDirection
  
  const sameNode = createNewNode()
  sameNode.data = preservedData

  insertChildren(nodeToSplit, sameNode, createNewNode())
}

/**
 * Removes a specified child node ("left" or "right") from the given parent node
 * and replaces the parent node's data and children with those of the preserved node.
 *
 * @param parentNode - The parent node from which a child node will be removed.
 * @param targetChild - The child node to be removed ("left" or "right").
 * @throws Will throw an error if either the left or right child of the parent node is null.
 */
export function removeNode (
  parentNode: TreeNode,
  targetChild: "left" | "right"
) {
  
  if (parentNode.left === null || parentNode.right === null) {
    throw new Error("Parent node must have both children not null!")
  }
  let preservedNode = parentNode.left
  if (targetChild=== "left") {
    preservedNode = parentNode.right
  }
  parentNode.left = preservedNode.left
  parentNode.right = preservedNode.right
  parentNode.data = {...preservedNode.data}
}


export function saveTree(treeToSave: TreeNode) {
  storage.set("savedTree", JSON.stringify(treeToSave))
}

export async function loadTree() {
  const loadedData = await storage.get("savedTree")
  if (!loadedData) {
    throw new Error("Could not find a tree from local storage.")
  }
  return JSON.parse(loadedData) as TreeNode
}