export default class JobModel {
  constructor(
    id,
    category,
    destination,
    loc,
    comName,
    salary,
    applyBy,
    skills,
    openings,
    postDate,
    recruiterId,
    applicants
  ) {
    (this.id = id),
      (this.category = category),
      (this.destination = destination),
      (this.loc = loc),
      (this.comName = comName),
      (this.salary = salary),
      (this.applyBy = applyBy),
      (this.skills = skills),
      (this.openings = openings),
      (this.postDate = postDate),
      (this.recruiterId = recruiterId),
      (this.applicants = applicants);
  }

  static get() {
    return jobs;
  }

  static view(id) {
    return jobs.find((j) => j.id == Number(id));
  }

  static updateApplicant(id, file, applicantInfo) {
    const index = jobs.findIndex((j) => j.id == Number(id));
    const applicantarr = jobs[index].applicants;
    const newApplicant = {
      applicantId: applicantarr.length + 1,
      name: applicantInfo.name,
      email: applicantInfo.email,
      contact: applicantInfo.contact,
      resumePath: file,
    };
    jobs[index].applicants.push(newApplicant);
  }

  static viewApplicant(id) {
    const index = jobs.findIndex((j) => j.id == Number(id));
    const applicantarr = jobs[index].applicants;
    return applicantarr;
  }

  static addJob(newJob, recruiterId) {
    const job = new JobModel(
      jobs.length + 1,
      newJob.category,
      newJob.destination,
      newJob.loc,
      newJob.comName,
      newJob.salary,
      newJob.applyBy,
      newJob.skills,
      newJob.openings,
      new Date().toLocaleString(),
      recruiterId,
      []
    );
    jobs.push(job);
  }

  static updatejob(id, jobInfo) {
    const index = jobs.findIndex((j) => j.id == Number(id));
    const job = { ...jobs[index] };
    jobs[index] = { ...job, ...jobInfo };
  }

  static deletejob(id) {
    const index = jobs.findIndex((j) => j.id == Number(id));
    jobs.splice(index, 1);
  }

  static searchResult(name) {
    const data = jobs.filter((job) => {
      if (job.comName.toLowerCase().trim() == name) {
        return job;
      }
    });
    return data;
  }
}

const applyDate = "2024-06-25";
const date = new Date().toLocaleString();
const recruiterId = 0;

const jobs = [
  new JobModel(
    1,
    "Tech",
    "SDE",
    "Gurgaon IND Remote",
    "Coding Ninjas",
    "20 lpa",
    applyDate,
    ["REACT", "NodeJs", "SQL", "MongoDB", "Express"],
    2,
    date,
    recruiterId,
    [
      {
        applicantId: 1,
        name: "Pooja",
        email: "pooja.pravinbabu@apu.edu.in",
        contact: 9087654321,
        resumePath: "/resume/Pooja-Pravinbabu-Resume.pdf",
      },
      {
        applicantId: 2,
        name: "Pooja",
        email: "pooja@apu.edu.in",
        contact: 9087654321,
        resumePath: "/resume/Pooja-Pravinbabu-Resume.pdf",
      },
    ]
  ),
  new JobModel(
    2,
    "Tech",
    "Angular Developer",
    "Pune IND On-Site",
    "Go-Digit",
    "8-10 lpa",
    applyDate,
    ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    3,
    date,
    recruiterId,
    []
  ),
  new JobModel(
    3,
    "Tech",
    "SDE",
    "Bangalore IND",
    "Juspay",
    "20-25 lpa",
    applyDate,
    ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
    2,
    date,
    recruiterId,
    []
  ),
];
