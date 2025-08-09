const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/createaccount', (req, res) => {
    const {username, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);

    const sql_req = "INSERT INTO accounts (username, password) VALUES (?, ?)";
    db.query(sql_req, [username, hashPassword], (err, result) =>{
        if (err) throw res.status(400).json({error: "User May Already Exist"});
        res.json({message: "User Added!"});
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM accounts WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = results[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
});