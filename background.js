let extensionEnabled = true;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (extensionEnabled && changeInfo.url) {
    const url = changeInfo.url;
    const updatedUrl = insertDash(url);
    if (updatedUrl !== url) {
      chrome.tabs.update(tabId, { url: updatedUrl });
    }
  }
});

function insertDash(url) {
  const dashPosition = 16;
  if (url.length > dashPosition && url.charAt(dashPosition) !== '-') {
    return url.slice(0, dashPosition) + '-' + url.slice(dashPosition);
  }
  return url;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleExtension') {
    extensionEnabled = !extensionEnabled;
    sendResponse({ enabled: extensionEnabled });
  }
});
