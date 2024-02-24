const { AccessService } = require('../services/access.service');
const catchAsync = require('../helpers/catch.async');
const { CREATED, OK } = require('../core/success.response');

class AccessController {
  signUp = catchAsync(async (req, res) => {
    CREATED(res, 'Register success', await AccessService.signUp(req.body));
    // return res.status(201).json(await AccessService.signUp(req.body));
  });
}

module.exports = new AccessController();
