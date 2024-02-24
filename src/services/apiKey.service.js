const apiKeyModel = require("../models/apikey.model")
const crypto = require("crypto")

const findById = async (key) => {
    // const newKey = await apiKeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
    // console.log(newKey)
    return await apiKeyModel.findOne({key, status: true}).lean();
}

module.exports = {
    findById
}