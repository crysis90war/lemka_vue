
export default class UserModel {
    constructor(options = {}) {
        Object.assign(this, options)
    }

    static from(json) {
        return Object.assign(new UserModel(), json)
    }

    applyData(json) {
        Object.assign(this, json)
    }
}