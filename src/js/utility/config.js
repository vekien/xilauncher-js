const fs  = require("fs");
const path = require('path');

/**
 * Handles app and user config
 */
class Config {
    constructor() {
        this.directory = path.join(__dirname, '/settings/');
        this.filename  = 'settings.json';
        this.config = {};
        this.config_defaults  = {
            SAVE_PATH: null,
            DEFAULT_SERVER_PORT: 54231,
        };

        this.loadSettings();
    }

    /**
     * Ensure we have some valid settings
     */
    hasSettings() {
        return this.config.SAVE_PATH !== null;
    }

    /**
     * Get single config entry, uses default if missing
     */
    get(option) {
        return (typeof this.config[option] === 'undefined') 
            ? this.config_defaults[option] 
            : this.config[option];
    }

    /**
     * Get the entire config
     */
    getConfig() {
        return this.config;
    }

    /**
     * Set a new config, this will also save it
     */
    set(option, value) {
        if (typeof this.config[option] === 'undefined') {
            console.error("There is no config field for: " + option);
            return;
        }

        this.config[option] = value;
        this.saveSettings();
    }

    /**
     * Load the apps config
     */
    loadSettings() {
        // create directory if it does not exist
        if (!fs.existsSync(this.directory)){
            fs.mkdirSync(this.directory);
        }

        // if file does not exist, create it
        if (!fs.existsSync(`${this.directory}${this.filename}`)) {
            // set config to the defaults and save them.
            this.config = this.config_defaults;
            this.saveSettings();
        }

        // read config and parse them
        this.config = JSON.parse(
            fs.readFileSync(`${this.directory}${this.filename}`, 'utf8')
        );
    }

    /**
     * Save the apps config
     */
    saveSettings() {
        const json = JSON.stringify(this.config);
        fs.writeFileSync(`${this.directory}${this.filename}`, json, "utf-8");
    }
}

export default new Config();