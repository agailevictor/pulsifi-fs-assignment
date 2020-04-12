var db = require('../db/dbConnection');

var Job = {
    handleGetAllJobs(data, userId, callback) {
        try {
            return db.query('CALL SP_List_All_Jobs(?,?)', [data, userId], callback);
        } catch (e) {
            console.log("Error in handleGetAllJobs : " + e);
        }

    },

    handleCreateJob: function (data, callback) {
        try {
            return db.query('CALL SP_Create_Job(?,?,?,?,?,?)', [data.job_title, data.job_location, data.jd_file_name, data.job_status, data.created_by, data.modified_by], callback);
        } catch (e) {
            console.log("Error in handleCreateJob : " + e);
        }
    }
};
module.exports = Job;