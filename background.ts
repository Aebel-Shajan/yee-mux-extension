let sidePanelPort: chrome.runtime.Port | null = null;
let runOnConnect = () => { }

// Setup message port with sidepanel
chrome.runtime.onConnect.addListener(function (port: chrome.runtime.Port) {
  if (port.name === 'sidepanel') {
    sidePanelPort = port
    sidePanelPort.onDisconnect.addListener(() => {
      sidePanelPort = null
    })
    runOnConnect()
    runOnConnect = () => { }
    console.log("connected")
  }
})



// Make panel open on logo click
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Add context menu for reading website
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Open website in sidepanel",
    id: "open-page",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    title: "Open link in sidepanel",
    id: "open-link",
    contexts: ["link"]
  });
})

// Handle logic for context menu
chrome.contextMenus.onClicked.addListener(
  async function (info, tab) {
    if (!tab) return
    if (!tab.id) return
    switch (info.menuItemId) {
      case "open-page":
        if (!info.pageUrl) return
        openLinkInSidepanel(info.pageUrl, tab.windowId)
      case "open-link":
        if (!info.linkUrl) return
        openLinkInSidepanel(info.linkUrl, tab.windowId)
    }
  }
)

/**
 * Opens a given link in the side panel of the specified window.
 *
 * @param {string} link - The URL to be opened in the side panel.
 * @param {number} currentWindow - The ID of the current window where the side panel should be opened.
 */
function openLinkInSidepanel(link: string, currentWindow: number) {
  chrome.sidePanel.open({ windowId: currentWindow })
  if (!sidePanelPort) {
    runOnConnect = () => {
      chrome.runtime.sendMessage({ "url": link })
    }
  }
  chrome.runtime.sendMessage({ "url": link })
} 