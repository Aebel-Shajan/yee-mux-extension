let sidePanelPort: chrome.runtime.Port | null = null;
let runOnConnect = () => { }

chrome.runtime.onConnect.addListener(function (port: chrome.runtime.Port) {
  if (port.name === 'sidepanel') {
    sidePanelPort = port
    runOnConnect()
    runOnConnect = () => { }
    console.log("connected")
  }
})

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
        chrome.sidePanel.open(
          { windowId: tab.windowId }

        )
        if (!sidePanelPort) {
          runOnConnect = () => {
            setTimeout(() => chrome.runtime.sendMessage({ "url": tab.url.toString() }), 600)
          }
        }
        chrome.runtime.sendMessage({ "url": tab.url.toString() })
    }
  }
)