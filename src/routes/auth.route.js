const { Router } = require('express');

const router = Router();

router.post('/register', (req, res) => {
    return res.status(200).json('Register');
});
module.exports = router;
