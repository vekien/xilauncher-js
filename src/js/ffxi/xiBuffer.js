/**
 * [FFXI]
 * 
 * Handles creating buffers that work with the LandBoatSea FFXI Private Server, some 
 * of these are just straight links to Node since I didn't need to do much conversion.
 */
class FFXIBuffer {
    constructor() {}

    utf8(data, length) {
        const buffer = Buffer.alloc(length);
        buffer.write(data, 0, 'utf8');
        return buffer;
    }

    from(data) {
        return Buffer.from(data);
    }

    concat(buffers) {
        return Buffer.concat(buffers);
    }
    
    /**
     * This decodes a socket response from the FFXI Server, you can then
     * call read functions on the buffer
     */
    decodeSocketResponse(dataBuffer, length) {
        // Create a Uint8Array from the buffer
        const dataArray = new Uint8Array(dataBuffer);

        // Truncate the array to a maximum length of 33 bytes if necessary
        const slicedArray = dataArray.slice(0, length);

        // Create a Buffer from the sliced array
        const buffer = Buffer.from(slicedArray.buffer);

        return buffer;
    }

    readUInt32LE(responseBuffer, index) {
        return responseBuffer.readUInt32LE(index);
    }
}

export default new FFXIBuffer();