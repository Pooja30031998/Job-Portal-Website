import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import JobController from "./src/controllers/job_controller.js";
import { uploadFile } from "./src/middlewares/file_upload_middleware.js";
import sendMail from "./src/middlewares/nodemailer.js";
import UserController from "./src/controllers/user_controller.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastvisit_middleware.js";

const server = express();
server.use(express.static("public"));

//cookie parser
server.use(cookieParser());

//session
server.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//parse from post data using middleware
server.use(express.urlencoded({ extended: true }));

//setup viewengine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

//create an object instance of JobController
const jobcontroller = new JobController();
server.get("/", jobcontroller.home);
server.get("/jobs", setLastVisit, jobcontroller.getJobs);
server.get("/job/:id", jobcontroller.viewJob);
server.post(
  "/apply/:id",
  uploadFile.single("resume"),
  sendMail,
  jobcontroller.postapplicant
);
server.get("/applicants/:id", jobcontroller.getapplicant);
server.get("/postjob", jobcontroller.getpostjobform);
server.post("/job", jobcontroller.postJob);
server.get("/job/update/:id", jobcontroller.getUpdateJob);
server.post("/job/:id", jobcontroller.postUpdatedJob);
server.post("/job/delete/:id", jobcontroller.postDeleteJob);
server.post("/search", jobcontroller.search);
server.get("/404", jobcontroller.error);

// register
const usercontroller = new UserController();
server.post("/register", usercontroller.postUser);
server.post("/login", usercontroller.loginUser);

server.get("/logout", usercontroller.logout);

server.listen(3500);
