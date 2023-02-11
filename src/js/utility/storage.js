import Config from './Config';

const {shell} = require('electron');
const fs  = require("fs");
const hasha = require('hasha');

/**
 * Handle storage in the asset manager save path
 */
class Storage {
    constructor() {
        this.assetSavePath = Config.get('SAVE_PATH');
    }

    /**
     * Save a file
     */
    save(folder, filename, data) {
        const directory = `${this.assetSavePath}\\${folder}`;

        // create directory if it does not exist
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }

        filename = `${directory}\\${filename}`;

        fs.writeFileSync(`${filename}`, data);
    }

    /**
     * Open a file
     * @param folder
     */
    openFolder(folder) {
        shell.openItem(folder);
    }

    /**
     * Save a buffer
     */
    saveBuffer(filename, buffer, callback) {
        fs.writeFile(filename, buffer, (error) => {
            if (error) {
                throw error;
            }

            if (!error && callback) {
                callback();
            }
        })
    }

    saveBase64(filename, base64, callback) {
        const base64Data = base64.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(filename, base64Data, 'base64', (error) => {
            if (error) {
                throw error;
            }

            if (!error && callback) {
                callback();
            }
        });
    }

    /**
     * Load a file
     */
    load(folder, filename) {
        const directory = `${this.assetSavePath}\\${folder}`;

        // create directory if it does not exist
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }

        filename = `${directory}\\${filename}`;

        // if file does not exist, return null
        if (!fs.existsSync(filename)) {
            return null;
        }

        return fs.readFileSync(`${filename}`, 'utf8');
    }

    makeFolder(folder) {
        // create directory if it does not exist
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }

        return this;
    }

    /**
     * Copy the file
     */
    copyFile(source, destination, callback) {
        try {
            fs.copyFile(source, destination, (error) => {
                if (error) {
                    throw error;
                }

                if (!error && callback) {
                    callback();
                }
            });
        } catch (ex) {
            console.error(ex.message);
        }

        return this;
    }

    /**
     * Move file
     */
    moveFile(source, destination, callback) {
        try {
            // copy file and then delete the old one
            this.copyFile(source, destination, () => {
                //this.deleteFile(source, callback)
                callback();
            });
        } catch (ex) {
            console.error(ex.message);
        }

        return this;
    }

    /**
     * Delete file
     */
    deleteFile(filename, callback) {
        if (!fs.existsSync(filename)){
            return this;
        }

        try {
            fs.unlink(filename, (error) => {
                if (error) {
                    throw error;
                }

                if (!error && callback) {
                    callback();
                }
            });
        } catch (ex) {
            console.error(ex.message);
        }

        return this;
    }

    /**
     * Read a directory
     */
    readDirectory(folder) {
        if (!fs.existsSync(folder)){
            return null;
        }

        // read directory and ignore folders
        return fs.readdirSync(folder).filter(filename => {
            return filename.indexOf('.') !== -1;
        });
    }

    /**
     * Get filename
     */
    getFileHash(filename, callback) {
        (async () => {
            // Get the MD5 hash of an image
            const hash = await hasha.fromFile(filename, {
                algorithm: 'md5'
            });

            callback(hash);
        })();
    }
}

export default new Storage();