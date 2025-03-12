const express = require('express')
const router = express.Router()

const { getUsers, signIn } = require('../controllers/authController')

router.get('/getUsers', getUsers) 
router.post('/signIn', signIn)

module.exports = router