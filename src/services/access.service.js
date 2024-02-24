const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const {
  Api403Error,
  BusinessLogicError,
  Api401Error,
} = require('../core/error.response');

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: '001',
  READ: '002',
  DELETE: '003',
  ADMIN: '000',
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    //step1: check email exist
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new Api403Error("shop already registered");
    }

    //todo hash password
    const passwordHash = await bcrypt.hash(password, 10);

    //todo create new shop
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    if (!newShop) {
      return null;
    }

    //todo create keys
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEnconding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });

    console.log(privateKey, '---', publicKey);

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: newShop._id,
      privateKey: privateKey.toString(),
      publicKey: publicKey.toString(),
    });

    if (!publicKeyString) {
      throw new BusinessLogicError();
    }
    console.log('publicKeyString:: ', publicKeyString);

    const publicKeyObject = await crypto.createPublicKey(publicKeyString);
    console.log('publicKeyObject:: ', publicKeyObject);

    //todo created token pair
    const tokens = await createTokenPair(
      {
        userId: newShop._id,
        email,
      },
      publicKeyObject,
      privateKey
    );
    console.log(`Created token success: `, tokens);

    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email', 'msisdn'],
        object: newShop,
      }),
      tokens,
    };
  };
}

module.exports = {
  AccessService,
};
