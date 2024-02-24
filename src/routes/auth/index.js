const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
// const {authenticationV2} = require("../../auth/authUtils");
// const validation = require('../../middleware/validators/access.validator')


// router.post('/login', validation.validateLoginRequest, accessController.login)
// router.post('/register', validation.validateRegister, accessController.signUp)
router.post('/signup',  accessController.signUp)

// authentication
// router.use(authenticationV2)

// router.post('/logout', accessController.logout)
// router.post('/refresh-token', accessController.refreshToken)

module.exports = router
