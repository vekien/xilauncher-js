const { ipcRenderer } = require('electron');
const shell = require('electron').shell;

class AppWin
{
    constructor()
    {
        this.maximizeState = false;
    }

    init()
    {
        document.getElementById("Launcher.Window.Min").addEventListener("click", () => {
            ipcRenderer.send('minimize-window');
        });

        // document.getElementById("Launcher.Window.Max").addEventListener("click", () => {
        //     if (this.maximizeState) {
        //         ipcRenderer.send('unmaximize-window');
        //         this.maximizeState = false;
        //         return;
        //     }

        //     ipcRenderer.send('maximize-window');
        //     this.maximizeState = true;
        // });

        document.getElementById("Launcher.Window.Close").addEventListener("click", () => {
            ipcRenderer.send('close-window');
        });

        // detect links
        document.addEventListener('click', (event) => {
            // Check if the clicked element is an anchor tag with an href attribute that starts with "http"
            if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
                event.preventDefault();
                shell.openExternal(event.target.href);
            }
        });
    }
}

export default new AppWin();