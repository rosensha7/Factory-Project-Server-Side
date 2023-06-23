class InvalidDataError extends Error {
    constructor(){
        super("Invalid data provided!");
    }
}

module.exports = {InvalidDataError}