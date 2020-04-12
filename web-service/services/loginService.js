var db = require('../db/dbConnection');

var Login = {
    handleLoginUser: function (data, callback) {
        try {
            return db.query('CALL SP_Login_User(?,?)', [data.email, data.password], callback);
        } catch (e) {
            console.log("Error in handleLoginUser : " + e);
        }
    }
};
module.exports = Login;