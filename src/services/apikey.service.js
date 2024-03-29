const crypto = require('crypto');
const apiKeyModel = require("../models/apiKey.model")

const createAPIKeyForDevelopmentService = async() => {
    const newAPIKey = await apiKeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
    return newAPIKey;
}

const findKeyById = async ( key ) => {
    // const newKey = await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']});
    // console.log('NEW KEY', newKey)
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
    return objKey;
}

module.exports = {
    findKeyById,
    createAPIKeyForDevelopmentService,
}