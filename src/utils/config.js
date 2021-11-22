class Config {
    constructor() {
        this.avatarFieldName = 'avatar';
        this.uploadBaseDir = './res/user';
        this.supExts = ['.jpeg', '.png', '.jpg',];
        this.deleteOldAvatar = false;
        Config.instance = this;
    }

    static get Instance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    get AvatarFieldName() {
        return this.avatarFieldName;
    }

    get SupportedExtensions() {
        return this.supExts;
    }

    get UploadBaseDir() {
        return this.uploadBaseDir;
    }

    get DeleteOldAvatar() {
        return this.deleteOldAvatar;
    }
}

export default Config;

