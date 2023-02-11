const dns = require('node:dns');
const net = require('net');

/**
 * Handle creating sockets to a server
 */
class Sock {
    constructor() {
        this.client = new net.Socket();
    }

    /**
     * Connect to a socket, trigger the different types of
     * callbacks for: Connected, Data Received and Connection Closed.
     */
    connect(host, port, cbConnected, cbDataReceived, cbConnectionClosed) {
        console.log(`Connecting to socket: ${host}:${port} ...`);

        // Connect to socket and setup data/close listeners.
        this.client.connect(port, host, cbConnected);
        this.client.on('data', cbDataReceived);
        this.client.on('close', cbConnectionClosed);
    }

    /**
     * Send a buffer array of a specific length.
     */
    send(data, length) {
        // Create a Uint8Array from the buffer
        const dataArray = new Uint8Array(data);

        // Truncate the array to a maximum length
        const slicedArray = dataArray.slice(0, length);

        // Create a Buffer from the sliced array
        const buffer = Buffer.from(slicedArray.buffer);

        // Write to socket
        this.client.write(buffer);
    }

    /**
     * Resolves a hostname like my-server.com to it's IP.
     * Is a callback function
     */
    resolveHostname(hostname, callback) {
        const hints = {
            family: dns.AF_INET
        };

        dns.lookup(hostname, hints, (error, address) => {
            callback(address)
        });
    }
}

export default Sock;