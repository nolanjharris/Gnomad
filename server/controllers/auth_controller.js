let bcrypt = require('bcryptjs');

let register = async (req, res) => {
    let { firstName, lastName, username, password } = req.body;
    if (!firstName || !lastName || !username || !password) {
        res.status(406).json({
            error: "please fill in all information"
        })
    } else {
        const db = req.app.get('db');
        let existingUser = await db.get_user([username]).catch(error => console.log(error));
        if (existingUser[0]) {
            res.status(409).json("Username already taken");
        } else {
            let hash = await bcrypt.hash(password, 10);
            let newUser = await db.create_user([firstName, lastName, username, hash]);
            console.log(newUser);
            req.session.user = {
                username,
                lastName,
                firstName,
                id: newUser[0].user_id
            }
            res.status(200).json(req.session.user);
        }
    }
}

let login = async (req, res) => {
    let { username, password } = req.body;
    const db = req.app.get('db');
    let user = await db.get_user([username]);
    if (!user[0]) {
        res.status(403).json({ error: "Username or Password is incorrect" });
    } else {
        const isAuthorized = await bcrypt.compare(password, user[0].password)
        if (!isAuthorized) {
            res.status(403).json("Username or Password is incorrect");
        } else {
            req.session.user = {
                username,
                firstName: user[0].first_name,
                lastName: user[0].last_name,
                id: user[0].user_id
            }

            res.status(200).json(req.session.user);
        }
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

module.exports = {
    register,
    login,
    logout
}