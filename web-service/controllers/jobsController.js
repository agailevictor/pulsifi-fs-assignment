var jobServices = require('../services/jobsService');
let jobs = {
    getAllJobs(req, res) {
        if (req.query.page && req.query.page > 0) {
            var QueryStringPage = parseInt(req.query.page);
            jobServices.handleGetAllJobs(QueryStringPage, function (err, rows) {
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
            req.body.created_by &&
            req.body.modified_by
        ) {
            jobServices.handleCreateJob(req.body, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    return res.status(200).send(rows[0]);
                }

            });
        } else {
            return res.status(400).send("Missing required fields");
        }
    }
};
module.exports = jobs;