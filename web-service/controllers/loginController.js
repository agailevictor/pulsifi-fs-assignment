var loginServices = require('../services/loginService');
let login = {
    loginUser(req, res) {
        if (req.body.email && req.body.password) {
            loginServices.handleLoginUser(req.body, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    var data = {
                        "status": 200,
                        "result": rows[0]
                    }
                    return res.json(data);
                }

            });
        } else {
            return res.status(400).send("Missing fields");
        }

    }
};
module.exports = login;