const router = require("express").Router();
const bcrypt = require("bcrypt");

const { pool } = require("../db");
const jwtGenerator = require("../utils/jwtGeneratos");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const { name, email, password } = req.body;

        //2. check if the user exist (if user exist then throw error)
        const user = await pool.query('SELECT * FROM t_user WHERE user_email = $1', [email]);
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exist");
        }

        //3. Bcrypt the user password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);


        //4. enter the new user inside out database
        const newUser = await pool.query("INSERT INTO t_user (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        //5. genrating out jwt token
        const token = await jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login route
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. Destructure the req.body
        const { email, password } = req.body;

        //2. Check if user doesn't exist (if not the we throw error)
        const user = await pool.query("SELECT * FROM t_user WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //3. Check if incomming password is the same the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //4.Give them the jwt token
        const token = await jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
