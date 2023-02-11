import React, { useState, useEffect } from 'react';
import AppWin from './electron/app-win';

export default function Header() {
    const [appWinInit, setAppWinInit] = useState(false);

    useEffect(() => {
        // init app window
        if (appWinInit === false) {
            AppWin.init();
            setAppWinInit(true);
        }
    });

    return (
        <header>
            <div className='header-title'>
                    FFXI Server Launcher v1.0
            </div>
            <div className='header-buttons'>
                <button type="button" className='header-button-min' id="Launcher.Window.Min"></button>
                {/* <button type="button" className='header-button-max' id="Launcher.Window.Max"></button> */}
                <button type="button" className='header-button-close' id="Launcher.Window.Close"></button>
            </div>
        </header>
    )
}