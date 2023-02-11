import React, { useState, useEffect } from 'react';
import xiAccount from './ffxi/xiAccount';
import xiGame from './ffxi/xiGame';
import { xiCodes } from './ffxi/xiCodes';

export default function Launcher() {
    const [server, setServer] = useState('139.59.182.214');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handle a new login request
     */
    function handleAccountLogin(event) {
        event.preventDefault();

        console.log(`Attempting to login with user: ${username} ...`);

        // Attempt to login to the FFXI server
        xiAccount.set(server, username, password).login((responseCode, account_id) => {
            // Login successful
            if (responseCode == xiCodes.account_login_success) {
                console.log(`Login successful for: ${username} - Account ID: ${account_id}`);

                const lang = xiCodes.language_english;

                // Attempt to get installation path
                const installPath = xiGame.getRegistryPlayOnlineInstallFolder(lang);

                // // Attempt to launch the game
                // const polcore = xiGame.IPOLCoreCom();

                // polcore.SetAreaCode(xiCodes.language_english);
                // polcore.SetParamInit(null, " /game eAZcFcB -net 3")
            }
            
            // Login failed
            if (responseCode == xiCodes.account_login_error) {
                console.log(`Login failed for: ${username} - try again?`);
            }

        });
    }

    /**
     * Popup the account creation form
     */
    function handleAccountCreation(event) {
        console.log("Creating a new account...");

        xiAccount.set(server, username, password).create(responseCode => {
            // Account created!
            if (responseCode == xiCodes.account_create_success) {
                console.log(`Account created for: ${username} - You may now login!`);
            }

            // Username is taken
            if (responseCode == xiCodes.account_create_taken) {
                console.log(`Sorry, the username: ${username} is already taken!`);
            }

            // Account creation disabled
            if (responseCode == xiCodes.account_create_disabled) {
                console.log(`Sorry, this server does not allow account creation through the loader.`);
            }

            // Server-side error
            if (responseCode == xiCodes.account_create_error) {
                console.log(`Sorry, account could not be created due to a server-side issue!.`);
            }

            // (NOT IMPLEMENTED) - Change Passowrd
            // (NOT IMPLEMENTED) - Change Passowrd Success
            // (NOT IMPLEMENTED) - Change Passowrd Error
            if (responseCode == xiCodes.account_pass_change_request
                || responseCode == xiCodes.account_pass_change_success
                || responseCode == xiCodes.account_pass_change_error) {
                console.log(`(${responseCode} code not implemented)`);
            }
        });
    }

    useEffect(() => {});

    return (
        <main>
            {/* Discord link */}
            <a href="#your discord url" className="discord-link"></a>
            
            {/* Login Modal */}
            <div className="login">
                <h6>CONNECT</h6>
                <h3>Login to Vanadiel.</h3>

                <button type="button" className="btn login-create-account-button" onMouseUp={handleAccountCreation}>Create Account!</button>

                <form onSubmit={handleAccountLogin} className="login-form">
                    <div className="form-row">
                        <label>Server IP</label>
                        <input id="login-server-ip"
                            type="text"
                            value={server}
                            onChange={event => setServer(event.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="flex">
                        <div className="flex-50 flex-pad-right-10 form-row">
                            <label>Username <em>Max 16</em></label>
                            <input id="login-username"
                                type="text"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                                autoFocus
                                maxLength={16}
                            />
                        </div>
                        <div className="flex-50 flex-pad-left-10 form-row">
                            <label>Password <em>Max 16</em></label>
                            <input id="login-password"
                                type="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                autoFocus
                                maxLength={16}
                            />
                        </div>
                    </div>
                    <div>
                        <br/>
                        <button type="submit" className="btn btn-success w100">Connect</button>
                    </div>
                </form>
            </div>
        </main>
    )
}