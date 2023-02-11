import Config from '../utility/Config';
import Sock from '../utility/Sock';
import xiBuffer from './xiBuffer';
import { xiCodes } from './xiCodes';

/**
 * [FFXI]
 * 
 * Handle Logging into FFXI Private Server
 */
class xiAccount {
    constructor() {
        this.sock;
        this.host;
        this.port;
        this.username;
        this.password;
        this.responseCallback;
    }

    /**
     * Request a login attempt for a specific FFXI Server
     */
    login(responseCallback) {
        this.responseCallback = responseCallback;
        this.sockSend(xiCodes.launcher_login)
    }

    
    /**
     * Create an account
     */
    create(responseCallback) {
        this.responseCallback = responseCallback;
        this.sockSend(xiCodes.launcher_create)   
    }

    /**
     * Sets any account data passed, will also vet it.
     */
    set(server, username, password) {
        // todo - basic user/pass length truncate (to 16 characters) and empty check
        this.username = username;
        this.password = password;


       
        // grab the host and port from the server address
        server = server.split(":");
        this.host = server[0];
        this.port = server[1] ? server[1] : Config.get('DEFAULT_SERVER_PORT');
        
        return this;
    }

    /**
     * Send a message to the socket with a specific code, eg:
     * create account, login, change password...
     */
    sockSend(xiCode) {
        console.log("Connected to the login server.");

        // Create request buffer
        const user = xiBuffer.utf8(this.username, 16);
        const pass = xiBuffer.utf8(this.password, 16);
        const code = xiBuffer.from([ xiCode ]);
        const requestBuffer = xiBuffer.concat([user, pass, code]);

        // Create a new Socket to the server
        this.sock = new Sock();

        // Connect to the server and send the request

        // todo - find a nicer way to do this, i need to maintain "this" 
        //        with assigned class variables.

        this.sock.connect(this.host,this.port, () => {
            // send buffer request to server
            // it is 33 bytes as: [username][password][code]
            this.sock.send(requestBuffer, 33);
        }, (responseBuffer) => {
            this.sockResponse(responseBuffer);
        }, (closeBuffer) => {
            this.sockClose(closeBuffer);
        });
    }

    /**
     * Handle socket response
     */
    sockResponse(response) {
        const buffer = xiBuffer.decodeSocketResponse(response, 16);
        const login_response_code = buffer[0];

        console.log(buffer);
        console.log(`Login server response code: ${login_response_code}`);

        switch(login_response_code) {
            // A successfull login, send the account code back.
            case xiCodes.account_login_success:
                const account_id = xiBuffer.readUInt32LE(buffer, 1);
                this.responseCallback(xiCodes.account_login_success, account_id);
                break;

            // Send all others back with just the login response code
            default:
                this.responseCallback(login_response_code);
                break;
        }
    }

    /**
     * Socket closed after sending data
     */
    sockClose() {
        this.reset();
    }

    /**
     * Reset any state data.
     */
    reset() {
        this.sock = null;
        this.username = null;
        this.password = null;
    }
}

export default new xiAccount();