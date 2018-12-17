

module.exports = class Chirp {
    constructor(key = null, user = null, type = 'default', text = null, image = null, link = null) {
        this.key = key;
        this.user = user;
        this.type = type;
        this.text = text;
        this.image = image;
        this.link = link;
        this.validCheck = () => {
            if (this.key === null) {
                return false
            } else if (this.user === null) {
                return false
            } else if (this.type === null) {
                return false
            } else if (this.text === null) {
                return false
            } else {
                return true;
            }
        };
    }
};

