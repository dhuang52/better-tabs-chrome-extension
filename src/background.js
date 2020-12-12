chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tabId, changeInfo, tab)
  
  // even if "status" is "complete", the title of the tab may not be updated yet
  // observed 3 different types of changeInfo: status, favicon, and title
  if(changeInfo.status === "complete" || changeInfo.title) {
    chrome.tabs.query({currentWindow: true}, (tabArr) => {
      tabArr.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, tabArr)
      })
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.tabs.update(message.tabId, {
    active: true
  })
})
