const settings = require('electron-settings');

export class BootstrapperService {
    constructor () {
        this.setDefaults();
    }

    isFirstRun (): boolean {
        return settings.getSync('firstRun');
    }

    private setDefaults() {
        settings.defaults({
            firstRun: true,
            lastUsed: "",
            lastFolder:"",
        });
    }
}