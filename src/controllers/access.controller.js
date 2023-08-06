const { CREATED, OK } = require("../core/success.response");
const AccessService = require("../services/access.service");
const { createAPIKeyForDevelopmentService } = require("../services/apikey.service");

class AccessController {

    createAPIKeyDummyForDevelopment = async (req, res, next) => {
        new OK({
            metadata: await createAPIKeyForDevelopmentService()
        }).send(res);
    }

    login = async (req, res, next) => {
        new OK({
            metadata: await AccessService.login(req.body)
        }).send(res);
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK!',
            metadata: await AccessService.signUp(req.body),
            option: {
                limit: 10
            }
        }).send(res);
    }

}

module.exports = new AccessController();