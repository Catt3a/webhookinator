const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const SALT = process.env.salt || '';
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.users.find(u => u.username === username);
    if (!user) return res.status(401).json({ success: false, message: 'Неверный логин!' });

    const hash = crypto.scryptSync(password, SALT, 64).toString('hex');
    console.log(hash);
    if (hash === user.passwordHash) {
        res.json({ success: true, message: 'Вход выполнен' });
    } else {
        res.status(401).json({ success: false, message: 'Неверный логин или пароль.' });
    }
});

app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
