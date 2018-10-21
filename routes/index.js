const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express Experiment 03' });
});

router.get('/about', (req, res) => {
    res.redirect('https://ryanfleck.github.io');
});

router.get('/resume', (req, res) => {
    res.download('public/RCF_Resume_F18.pdf');
});

module.exports = router;
