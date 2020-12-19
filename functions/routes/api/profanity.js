const express = require('express');
const router = express.Router();
const fuhk = require('fuhk');
router.get('/highlight-bad-words/:content', (req, res) => {
  return res.json(fuhk(req.params.content));
});
module.exports = router;
