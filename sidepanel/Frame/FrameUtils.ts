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
      scale: 0.7,
      fitVideo: false,
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
  sameNode.data.panelSize = 50
  const newSibling = createNewNode()
  newSibling.data.panelSize = 50
  insertChildren(nodeToSplit, sameNode, newSibling)
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
  localStorage.setItem("savedTree", JSON.stringify(treeToSave))
  console.log("Saved", treeToSave)
}

export function loadTree() {
  const loadedData = localStorage.getItem("savedTree")
  if (!loadedData) {
    throw new Error("Could not find a tree from local storage.")
  }
  console.log("Loaded", JSON.parse(loadedData))
  return JSON.parse(loadedData) as TreeNode
}

export function getRightMostLeafNode(node: TreeNode): TreeNode {
  let currentNode = node
  while (currentNode.right !== null) {
    currentNode = currentNode.right
  }
  return currentNode
}