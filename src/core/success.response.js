const httpStatusCode = require("./httpStatusCode/httpStatusCode");

class SuccessResponse {
    constructor({message, statusCode = httpStatusCode.StatusCodes.OK, reasonStatusCode = httpStatusCode.ReasonPhrases.OK, metadata = {}}) {
        this.message = !message ? reasonStatusCode : message;
        this.statusCode = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse {
    constructor({option = {}, message, statusCode = httpStatusCode.StatusCodes.CREATED, reasonStatusCode = httpStatusCode.ReasonPhrases.CREATED , metadata}) {
        super({message, statusCode, reasonStatusCode, metadata})
        this.option = option;
    }
}

module.exports = {
    OK, CREATED
}