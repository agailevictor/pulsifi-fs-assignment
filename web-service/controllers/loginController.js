var loginServices = require('../services/loginService');
let login = {
    loginUser(req, res) {
        if (req.body.email && req.body.password) {
            loginServices.handleLoginUser(req.body, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    return res.status(200).send(rows[0]);
                }

            });
        } else {
            return res.status(400).send("Missing fields");
        }

    }
};
module.exports = login;