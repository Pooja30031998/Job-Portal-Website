import JobModel from "../models/job_model.js";

export default class JobController {
  home(req, res, next) {
    res.render("home", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  error(req, res, next) {
    res.render("error", {
      userNotFound: null,
      jobNotFound: true,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  getJobs(req, res, next) {
    const jobsArr = JobModel.get();
    console.log(typeof jobsArr[1].skills);
    res.render("jobs", {
      jobsArr,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  viewJob(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.view(id);
    if (jobFound) {
      return res.render("jobView", {
        job: jobFound,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
        recruiterId: req.session.recruiterId,
      });
    }
    res.redirect("/404");
  }
  postapplicant(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.view(id);
    if (jobFound) {
      const applicantInfo = req.body;
      const file = "/resume/" + req.file.filename;
      JobModel.updateApplicant(id, file, applicantInfo);
      return res.redirect("/jobs");
    }
    res.redirect("/404");
  }
  getapplicant(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.view(id);
    if (jobFound) {
      const applicantArray = JobModel.viewApplicant(id);
      return res.render("applicants", {
        applicantArray,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
    res.redirect("/404");
  }
  getpostjobform(req, res, next) {
    res.render("postJob");
  }
  postJob(req, res, next) {
    const newJob = req.body;
    const recruiterId = req.session.recruiterId;
    JobModel.addJob(newJob, recruiterId);
    res.redirect("/jobs");
  }
  getUpdateJob(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.view(id);
    if (jobFound) {
      return res.render("updateJob", {
        job: jobFound,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
    res.redirect("/404");
  }
  postUpdatedJob(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.view(id);
    if (jobFound) {
      const jobInfo = req.body;
      JobModel.updatejob(id, jobInfo);
      return res.redirect("/job/" + id);
    }
    res.redirect("/404");
  }
  postDeleteJob(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.view(id);
    if (jobFound) {
      JobModel.deletejob(id);
      return res.redirect("/jobs");
    }
    res.redirect("/404");
  }
  search(req, res) {
    const name = req.body.name;
    let searcharr = JobModel.searchResult(name.toLowerCase().trim());
    if (searcharr.length > 0) {
      res.render("searchResults", {
        jobsArr: searcharr,
        error: null,
      });
    } else {
      res.render("searchResults", {
        jobsArr: null,
        error: true,
      });
    }
  }
}
