const express = require('express');

const router = express.Router();

const data = require('../data/data.json');

/*
 * Express enables the simple creation of responses to REST requests:
 *   GET - Just returns the data at an address.
 *   POST - Used to create new entities.
 *   PUT - Use to update existing data.
 *   DELETE - Use to remove data.
 *
 * HTTP Status Codes:
 *   1* is informational.
 *   2* indicates a success.
 *   3* is redirection.
 *   4* suggests a client error.
 *   5* suggests a server error.
 */

router.get('/', (req, res, next) => {
    res.render('api', { title: 'Experiment 03 API' });
});

router.get('/id/:id', (req, res, next) => {
    const uid = Number(req.params.id);
    const resp = data.filter(x => x.id === uid)[0];
    res.json({
        'req-info': `Recieved GET request for ID ${uid}.`,
        data: resp,
    });
});

router.get('/random', (req, res, next) => {
    const uid = Math.floor(Math.random() * data.length);
    console.log(uid);
    const resp = data.filter(x => x.id === uid)[0];
    res.json({
        'req-info': `Recieved GET request for random info. Returning info for user ${uid}.`,
        data: resp,
    });
});

router.post('/', (req, res, next) => {
    res.json({
        request: 'Recieved POST request.',
    });
});

router.put('/', (req, res, next) => {
    res.json({
        request: 'Recieved PUT request.',
    });
});

router.delete('/', (req, res, next) => {
    res.json({
        request: 'Recieved DELETE request.',
    });
});

module.exports = router;
