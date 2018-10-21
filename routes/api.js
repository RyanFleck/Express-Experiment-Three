const express = require('express');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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

router.get('/', (req, res) => {
    res.render('api', { title: 'Experiment 03 API' });
});

router.get('/id/:id', (req, res, next) => {
    // Everything before the response is sent is 'middleware'.
    const uid = Number(req.params.id);
    let resp = data.filter(x => x.id === uid)[0];
    if (!resp) { resp = { error: `No user ID ${uid}` }; }
    res.json({
        'req-info': `Recieved GET request for ID ${uid}.`,
        data: resp,
    });
    next();
}, (req, res) => {
    res.end();
});

router.get('/random', (req, res) => {
    const uid = Math.floor(Math.random() * data.length);
    console.log(uid);
    const resp = data.filter(x => x.id === uid)[0];
    res.json({
        'req-info': `Recieved GET request for random info. Returning info for user ${uid}.`,
        data: resp,
    });
});

router.get('/random/:count', (req, res) => {
    const max = data.length;
    const uidArr = [];
    for (let i = 0; i < req.params.count; i++) {
        uidArr.push(Math.floor(Math.random() * max));
    }
    const resp = data.filter(x => uidArr.indexOf(x.id) > -1);
    res.json({
        'req-info': `Recieved GET request for random info. Returning info for users ${uidArr}.`,
        data: resp,
    });
});

router.post('/', (req, res) => {
    res.json({
        request: 'Recieved POST request.',
        content: req.body,
    });
});

router.put('/', (req, res) => {
    res.json({
        request: 'Recieved PUT request.',
    });
});

router.delete('/', (req, res) => {
    res.json({
        request: 'Recieved DELETE request.',
    });
});

/*
 * This can all be refactored with chaining.
 */

router.route('/user')
    .get((req, res) => {
        res.json({
            request: 'Recieved GET request at api/user.',
        });
    })
    .put((req, res) => {
        res.json({
            request: 'Recieved PUT request at api/user.',
        });
    })
    .post((req, res) => {
        res.json({
            request: 'Recieved POST request at api/user.',
        });
    })
    .delete((req, res) => {
        res.json({
            request: 'Recieved DELETE request at api/user.',
        });
    });

module.exports = router;
