const express = require('express');
const router = express.Router();
const badge = require('./generateBadge')

router.get('/', (req, res) => {
  const { key, value, keyBackgroundColor, valueBackgroundColor, keyForegroundColor, valueForegroundColor} = req.query
  badge(key, value, keyBackgroundColor, valueBackgroundColor, keyForegroundColor, valueForegroundColor).then(result => res.redirect(result))
});

module.exports = router;