const express = require('express');
const { apiKeyMiddleware, checkPermission } = require('../auth/checkAuth');
const router = express.Router();

// check apiKey
router.use(apiKeyMiddleware);

// check permission
router.use(checkPermission('0000'));

router.use('/v1/api', require('./access'));

module.exports = router;
