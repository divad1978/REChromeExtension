function save_options() {
  var weight = document.getElementById('weight').value;
  var cp = document.getElementById('cp').value;
  chrome.storage.sync.set({
    weight: weight,
    cp: cp
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    weight: '70',
    cp: '0'
  }, function(items) {
    document.getElementById('weight').value = items.weight;
    document.getElementById('cp').value = items.cp;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);