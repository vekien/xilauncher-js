# FF11 Private Server Launcher in JS/React

This is a custom built FF11 private server launcher built in JS/React, a fair amount of the logic was built by ChatGPT to convert XILoader and LandBoatSea logic to work with JS buffers. All the account logic works fine. Works with bother Ashita and Windower.
 
![preview.png](Launcher Preview)

## Still todo...

I have't got the booting of the game working just yet, was considering just running `xiloader.exe` as a CLI application, that would be the easiest solution. Sadly I'm not really developing this much more now as I'm working on VR stuff :D

Would love to add:

- Ability to modify regedit (a paint in Electron because of Chrome Security layer)
- Ability to download the game and patch (Dead easy, just have it on a GDrive or DropBox then add a downloader)
- Ability to add mods (Again super super simple)

### Development

Built in:
- Node 18.12.1
- Electron https://www.electronjs.org/
- Symfony Encore https://symfony.com/doc/current/frontend/encore/installation.html
- React Hooks https://reactjs.org/docs/hooks-intro.html


- npm install @symfony/webpack-encore --save-dev
- npm install @babel/preset-react@^7.0.0 --save-dev
- npm install sass-loader@^13.0.0 sass --save-dev
- npm install electron --save-dev
- npm install react react-dom 

- npm run encore-dev
- npm run electron-dev