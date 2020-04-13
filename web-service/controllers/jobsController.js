var jobServices = require('../services/jobsService');
var config = require('../config/config');
var fs = require('fs');
let jobs = {
    getAllJobs(req, res) {
        if (req.query.page && req.query.page > 0 && req.query.userId) {
            var QueryStringPage = parseInt(req.query.page);
            var QueryStringUser = parseInt(req.query.userId)
            jobServices.handleGetAllJobs(QueryStringPage, QueryStringUser, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    var userlists = {
                        "page": parseInt(req.query.page),
                        "per_page": rows[1][0].per_page,
                        "total": rows[1][0].total,
                        "total_pages": rows[1][0].total_pages,
                        "data": rows[0]
                    }
                }
                res.json(userlists);
            });

        } else {
            return res.status(400).send("Page Number Should be greater than Zero");
        }
    },

    postJob(req, res) {
        if (
            req.body.job_title &&
            req.body.job_location &&
            req.body.jd_file_name &&
            req.body.job_status &&
            req.body.job_description &&
            req.body.created_by &&
            req.body.modified_by
        ) {
            var base64File = req.body.job_description;
            var decodedFile = new Buffer(base64File, 'base64');
            fs.writeFile(config.upload_path + req.body.jd_file_name, decodedFile, function (err) {
                if (!err) {

                    jobServices.handleCreateJob(req.body, function (err, rows) {
                        if (err) {
                            res.json(err);
                        }
                        else {
                            return res.status(200).send(rows[0]);
                        }

                    });
                } else {
                    return res.send(400, {
                        error: 'failed to write the image'
                    });
                }
            });
        } else {
            return res.status(400).send("Missing required fields");
        }
    }
};
module.exports = jobs;