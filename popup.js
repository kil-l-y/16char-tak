document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');

  toggleButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'toggleExtension' }, function(response) {
      toggleButton.innerText = response.enabled ? 'Disable Extension' : 'Enable Extension';
    });
  });

  chrome.runtime.sendMessage({ action: 'getExtensionStatus' }, function(response) {
    toggleButton.innerText = response.enabled ? 'Disable Extension' : 'Enable Extension';
  });
});
