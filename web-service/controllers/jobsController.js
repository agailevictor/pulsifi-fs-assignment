let joblist = [
    {
        job_title: "Frontend Engineer",
        job_location: "New York, United States",
        posted_date: "11/04/2020",
        job_status: "open"
    },
    {
        job_title: "Technical Lead (Portal)",
        job_location: "Kuala Lumpur, MY",
        posted_date: "11/04/2020",
        job_status: "open"
    },
    {
        job_title: "Senior PHP Developer",
        job_location: "Petaling Jaya, MY",
        posted_date: "11/04/2020",
        job_status: "open"
    },
    {
        job_title: "Mobile Developer - (React Native)",
        job_location: "Selangor, Malaysia",
        posted_date: "11/04/2020",
        job_status: "open"
    },
    {
        job_title: "Magento Developer",
        job_location: "Shah Alam, Selangor, Malaysia",
        posted_date: "11/04/2020",
        job_status: "open"
    },
    {
        job_title: "Backend Engineer (Payments)",
        job_location: "Edmonton, Alberta, Canada",
        posted_date: "11/04/2020",
        job_status: "open"
    },
    {
        job_title: "Full Stack Developer (ReactJS)",
        job_location: "Tallinn, Harjumaa, Estonia",
        posted_date: "11/04/2020",
        job_status: "open"
    }
];

let jobs = {
    getAllJobs(req, res) {
        res.status(200).json({ data: joblist });
    }
};
module.exports = jobs;