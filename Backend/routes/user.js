const express = require('express');
const db = require('../connection.js');
const router = express.Router();

router.post('/userSignup', (req, res) => {
    const { username, email, password } = req.body;

    db.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.status(400).send({ message: "User already exists" });
            } else {
                db.query(`INSERT INTO user (username, email, password) VALUES ('${username}', '${email}', '${password}')`, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send({ message: "User Registered" });
                    }
                });
            }
        }
    });
});

router.get('/userLogin/:email/:password', (req, res) => {
    const { email, password } = req.params;

    db.query(`SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`, (err, result) => {
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

router.get('/allUsers', (req, res) => {
    db.query(`SELECT * FROM user`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result);
        }
    });
})

router.post('/deleteUser', (req, res) => {
    const { email } = req.body;

    db.query(`DELETE FROM user WHERE email = "${email}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ message: "User Deleted" });
        }
    });
})

router.post('/updateUser', (req, res) => { 
    const { username, email, password, oldEmail } = req.body;

    db.query(`UPDATE user SET username = "${username}", password = "${password}", email="${email}" WHERE email = "${oldEmail}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ message: "User Updated" });
        }
    });
})
module.exports = router;