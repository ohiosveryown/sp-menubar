const {ipcRenderer} = require('electron')

document.addEventListener('DOMContentLoaded', () => {
  let n = new Notification('Oh 💩!', {
    body: 'You Have a New Invoice.', icon: "img/icon.png"
  })

  // Tell the notification to show the menubar popup window on click
  n.onclick = () => { ipcRenderer.send('show-window') }

});
