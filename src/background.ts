chrome.runtime.onInstalled.addListener(function() {
  chrome.action.setBadgeText({
    text: '',
  })
})

// When the user clicks on the extension action
chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['inject-bundle.js'],
  })
})
