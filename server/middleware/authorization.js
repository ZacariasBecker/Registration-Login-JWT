const jwt = require("jsonwebtoken");
// require("dotenv").config({ path: "server\\.env" });
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(403).json("Not Authorize");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = await payload.user;
        next();

    } catch (err) {
        console.error(err);
        return res.status(403).json("Not Authorize");
    }

};