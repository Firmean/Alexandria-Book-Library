const express = require('express');
const db = require('../connection.js');
const router = express.Router();

router.post('/adminSignup', (req, res) => {
    const { username, email, password } = req.body;

    db.query(`SELECT * FROM admin WHERE email = '${email}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.status(400).send({ message: "User already exists" });
            } else {
                db.query(`INSERT INTO admin (admin_username, email, password) VALUES ('${username}', '${email}', '${password}')`, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send({ message: "Admin Registered" });
                    }
                });
            }
        }
    });
});

router.get('/adminLogin/:email/:password', (req, res) => {
    const { email, password } = req.params;

    db.query(`SELECT * FROM admin WHERE email = '${email}' AND password = '${password}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(404).send({ message: "Invalid Credentials" });
            }
        }
    });
});


module.exports = router;