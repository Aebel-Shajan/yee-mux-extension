import { loadTree, saveTree, splitNode } from "~sidepanel/Frame/FrameUtils";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Add context menu for reading website
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Open website in sidepanel",
    id: "open-website",
    contexts: ["page"]
  });
})


chrome.contextMenus.onClicked.addListener(
  async function (info, tab) {
    if (!tab) return
    if (!tab.id) return
    switch (info.menuItemId) {
      case "open-website":
        await chrome.sidePanel.open(
          { windowId: tab.windowId }
        )
        const rootNode = await loadTree()
        splitNode(rootNode, "vertical")
        if (rootNode.right) {
          rootNode.right.data.url = tab.url
        }
        saveTree(rootNode)
    }
  }
)