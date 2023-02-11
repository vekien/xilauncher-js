const com = require('com');
const regedit = require('regedit');
const child_process = require('child_process');

import Config from '../utility/Config';
import Sock from '../utility/Sock';
import xiBuffer from './xiBuffer';

/**
 * [FFXI]
 * 
 * Handle launching the game
 */
class xiGame {
    constructor() {
        this.sock;
        this.host;
        this.port;
        this.username;
        this.password;
        this.responseCallback;
    }

    launch() {
        
    }

    IPOLCoreCom() {
        // Create an instance of the COM object
        const pol = com.createObject('IPOLCoreCom');

        const inFunc = null;
        const outPlatformId = null;
        const outMajor = null;
        const outMinor = null;
        const outSPMajor = null;
        const outOSName = null;
        const inOSNameSize = 0;
        const inType = 0;
        const inBool = 0;
        const inWnd = null;
        const inPanNum = 0;
        const inCode = 0;
        const outState = null;
        const lpCmdLineW = null;
        const hdc = null;
        const hWnd = null;
        const outName = null;
        const outIsVisible = 0;
        
        // Call methods on the COM object
        const hInstance = pol.GethInstance();
        const lpCmdLine = pol.GetlpCmdLine();
        const winType = pol.GetWindowsType();
        const ptr = pol.GetCommonFunctionTable();

        pol.PolViewerExec(inFunc);
        pol.GetWindowsVersion(outPlatformId, outMajor, outMinor, outSPMajor, outOSName, inOSNameSize);
        pol.PressAnyKey(inType);
        pol.PolconSetEnableWakeupFuncFlag(inType, inBool);
        pol.CreateInput(inWnd);
        pol.UpdateInputState();
        pol.GetPadRepeat(inPanNum, outState);
        pol.GetPadOn(inPanNum, outState);
        pol.FinalCleanup();
        pol.SetParamInitW(hInstance, lpCmdLineW);
        pol.GetlpCmdLineW(lpCmdLineW);
        pol.PaintFriendList(hdc);
        pol.CreateFriendList();
        pol.DestroyFriendList();
        pol.GetPlayOnlineRegKeyNameW(outName);
        pol.GetPlayOnlineRegKeyNameA(outName);
        pol.GetSquareEnixRegKeyNameW(outName);
        pol.GetSquareEnixRegKeyNameA(outName);
        pol.SetMaskWindowHandle(hWnd);

        pol.IsVisibleMaskWindow(outIsVisible);
        pol.ShowMaskWindow(inCode);
        pol.HideMaskWindow(inCode);
        pol.GetAreaCode(outAreaCode)
        pol.SetAreaCode()

        return pol;
    }

    FindINETMutex() {
        const language = 'European'; // Assume that the language is European

        const module = (language === 'European') ? 'polcoreeu.dll' : 'polcore.dll';

        // Use the child_process.execSync() method to execute the "FindPattern" command and return the result as a buffer
        const resultBuffer = child_process.execSync(`FindPattern "${module}" "\\x8B\\x56\\x2C\\x8B\\x46\\x28\\x8B\\x4E\\x24\\x52\\x50\\x51" "xxxxxxxxxxxx"`);

        // Create a new buffer to store the value at the result - 4 address
        const valueBuffer = Buffer.alloc(4);

        // Copy the value from the resultBuffer to the valueBuffer, starting at the result - 4 address and ending at the result address
        resultBuffer.copy(valueBuffer, 0, result - 4, result);

        // Read the value from the valueBuffer using the Buffer.readInt32LE() method
        const value = valueBuffer.readInt32LE(0);

        // Use the value and the arithmetic operators to calculate the final value
        const finalValue = value + result;

        console.log(finalValue);
    }

    CreateGameInstance() {
        // Set the path to the COM object's DLL file
        const comObjectPath = 'path/to/com/object.dll';

        // Set the CLSID of the COM object
        const clsid = '{12345678-1234-1234-1234-1234567890AB}';

        // Set the IID of the interface you want to use
        const iid = '{12345678-1234-1234-1234-1234567890AC}';

        // Load the COM object
        const comObject = com.load(comObjectPath, clsid, iid);

        // Create an instance of the COM object
        const instance = new comObject();
    }

    /**
     * Obtains the PlayOnline registry key. "SOFTWARE\PlayOnlineXX"
     */
    getRegistryPlayOnlineKey(lang) {
        const registryKeys = [
            'SOFTWARE\\Wow6432Node\\PlayOnline',   // xiloader::Japanese
            'SOFTWARE\\Wow6432Node\\PlayOnlineUS', // xiloader::English
            'SOFTWARE\\Wow6432Node\\PlayOnlineEU'  // xiloader::European
        ];
      
        if (lang < 0) lang = 0;
        if (lang > 2) lang = 2;
      
        return registryKeys[lang];
    }

    /**
     * Obtains the PlayOnline lan--seguage id from the system registry.
     */
    getRegistryPlayOnlineLanguage(lang) {
        const squareEnix = (lang === 0 /*xiloader::Japanese*/) ? 'Square' : 'SquareEnix';
      
        const szRegistryPath = `${this.getRegistryPlayOnlineKey(lang)}\\${squareEnix}\\PlayOnlineViewer\\Settings`;
      
        try {
            const regValue = registry.getValue({
                hive: registry.HKEY.LOCAL_MACHINE,
                key: szRegistryPath,
                value: 'Language',
                type: registry.TYPE.DWORD
            });
        
            if (regValue) {
                lang = regValue;

                console.log("Language detected in registry: ", lang)
            }
        } catch (err) {
            // Handle error
        }
      
        return lang;
    }

    /**
     * Obtains the PlayOnlineViewer folder from the system registry.
     * eg: "C:\Program Files\PlayOnline\PlayOnlineViewer"
     */
    getRegistryPlayOnlineInstallFolder(lang) {
        const regKey = this.getRegistryPlayOnlineKey(lang);
        const regPath = `HKLM\\${regKey}\\InstallFolder`;

        console.log(regPath);

        const regResults = regedit.list("HKLM\\SOFTWARE");

        console.log(regResults);
      

      
      
    }

}

export default new xiGame();