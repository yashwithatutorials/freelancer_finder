
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const bcrypt   = require("bcrypt");
const multer   = require("multer");
const path     = require("path");
const fs       = require("fs");
require("dotenv").config();

const EmployeeModel = require("./models/Employee");
const JobModel      = require("./models/Job");
const MessageModel = require("./models/Message");
const app  = express();
const PORT = process.env.PORT || 8080;


/* ─────────────  middleware  ───────────── */
app.use(express.json());
app.use(cors());
const toArray = (val) =>
  Array.isArray(val)
    ? val.map((s) => String(s).trim())
    : typeof val === "string"
    ? val.split(",").map((s) => s.trim())
    : [];

/* ─────────────  file upload  ───────────── */
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename  : (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload       = multer({ storage });
const uploadFields = upload.fields([
  { name: "resume",       maxCount: 1 },
  { name: "companyLogo",  maxCount: 1 },
  { name: "profileImage", maxCount: 1 }
]);
// app.use("/uploads", express.static("uploads"));
const uploadsPath = path.join(__dirname, "uploads");
 app.use("/uploads", express.static(uploadsPath));
 const BASE_URL = process.env.BASE_URL || "https://freelancer-finder.onrender.com";

/* ─────────────  DB connect  ───────────── */
// mongoose
//   .connect("mongodb://127.0.0.1:27017/employee", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB error:", err));
mongoose
  .connect("mongodb+srv://yashwithareddy1212:Yashu2004@cluster0.hdseipc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

 .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("MongoDB error:", err));

/* ════════════  AUTH  ════════════ */
app.post("/signup", upload.single("profileImage"), async (req, res) => {
  const { name, email, password, role, description } = req.body;
  const profileImage = req.file?.filename ?? null;

  if (!name || !email || !password || !role)
    return res.status(400).json({ status: "error", message: "All fields are required" });

  try {
    if (await EmployeeModel.findOne({ email }))
      return res.status(409).json({ status: "error", message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user   = await EmployeeModel.create({
      name,
      email,
      password: hashed,
      role,
      profileImage,
      description
    });

    res.json({
      status: "success",
      user: formatUser(user)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Signup failed", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.json({ status: "error", message: "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.json({ status: "error", message: "Invalid password" });
  res.json({ status: "success", user: formatUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error", error: err.message });
  }
});

/* ════════════  PROFILE UPDATE  ════════════ */
app.put("/api/employees/update", uploadFields, async (req, res) => {
   console.log("🛠️ UPDATE REQUEST RECEIVED");
  console.log("BODY:", req.body);
  console.log("FILES:", Object.keys(req.files || {}), req.files);
  
  const {
    email, phoneNumber, experience, rating, location,
    position, description, skills, projects,companyName
  } = req.body;

  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const update = {
    ...(phoneNumber && { phoneNumber }),
    ...(experience  && { experience }),
    ...(rating      && { rating }),
    ...(location    && { location }),
    ...(position    && { position }),
    ...(projects    && { projects }),
    companyName: companyName ?? '',
    ...(description && { description }),
  
  };

  if (skills) {
    try {
      update.skills = JSON.parse(skills);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid skills format" });
    }
  }

 if (req.files?.resume?.[0]) {
   // store only the filename, not the full path
   update.resume = req.files.resume[0].filename;
 }

 if (req.files?.companyLogo?.[0]) {
   update.companyLogo = req.files.companyLogo[0].filename;
 }

 if (req.files?.profileImage?.[0]) {
   update.profileImage = req.files.profileImage[0].filename;
}

  try {
    const user = await EmployeeModel.findOneAndUpdate({ email }, { $set: update }, { new: true,strict:false });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, updatedUser: formatUser(user) });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

/* ════════════  JOB ROUTES  ════════════ */

/* CREATE */
app.post("/api/jobs", async (req, res) => {
  const { email, title, descrip, loca, category, requirement, skillreq, level } = req.body;
  if (!email || !title || !descrip || !loca || !category)
    return res.status(400).json({ success: false, message: "Missing required fields" });

  try {
    const employer = await EmployeeModel.findOne({ email, role: "client" });
    if (!employer) return res.status(404).json({ success: false, message: "Employer not found" });

    const job = await JobModel.create({
      employerId   : employer._id,
      employerEmail: email,

      jobTitle       : title,
      jobDescription : descrip,
      jobRequirement : toArray(requirement),
      jobSkills      : toArray(skillreq),
      category,
      location       : loca,
      level,
company        : employer.name,
 companyName    : employer.companyName || employer.name,  
 companyLogo    : employer.companyLogo || null
    });

    res.json({ success: true, job: decorateJob(job, employer) });
  } catch (err) {
    console.error("Create job error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

/* LIST / FILTER */
app.get("/api/jobs", async (req, res) => {
  const { category, location, search } = req.query;

  const filter = {
    ...(category && { category }),
    ...(location && { location }),
    ...(search   && { jobTitle: new RegExp(search, "i") })
  };

  try {
   const jobs = await JobModel.find(filter).sort({ createdAt: -1 }).lean();
const employers = await EmployeeModel.find({
  _id: { $in: jobs.map((j) => j.employerId) }
}).select("name companyLogo companyName").lean();

const map = Object.fromEntries(employers.map((e) => [String(e._id), e]));

res.json(jobs.map((j) => decorateJob(j, map[String(j.employerId)])));

  } catch (err) {
    console.error("Fetch jobs error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* SINGLE JOB DETAIL  ← NEW */
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id).lean();
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const employer = await EmployeeModel.findById(job.employerId).select("name companyLogo companyName").lean();
    res.json(decorateJob(job, employer));
  } catch (err) {
    console.error("Fetch job detail error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

/* UPDATE */
app.put("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, descrip, loca, category, requirement, skillreq, level } = req.body;

  try {
    const job = await JobModel.findByIdAndUpdate(
      id,
      {
        ...(title       && { jobTitle      : title }),
        ...(descrip     && { jobDescription: descrip }),
        ...(loca        && { location      : loca }),
        ...(category    && { category }),
        ...(level       && { level }),
        ...(requirement && { jobRequirement: toArray(requirement) }),
        ...(skillreq    && { jobSkills     : toArray(skillreq) })
      },
      { new: true }
    ).lean();

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const employer = await EmployeeModel.findById(job.employerId).select("name companyLogo").lean();
    res.json({ success: true, job: decorateJob(job, employer) });
  } catch (err) {
    console.error("Update job error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

/* DELETE */
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const doc = await JobModel.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error("Delete job error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});
/* ── APPLY ─────────────────────────────────────────── */
app.post("/api/jobs/:jobId/apply", async (req, res) => {
  const { jobId }    = req.params;
  const { userEmail } = req.body;

  if (!jobId || !userEmail)
    return res.status(400).json({ message: "Missing jobId or email" });

  try {
    const freelancer = await EmployeeModel.findOne({ email: userEmail });
    if (!freelancer) return res.status(404).json({ message: "User not found" });

    const job = await JobModel.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.applicants.some(a => a.freelancerEmail === userEmail))
      return res.status(400).json({ message: "Already applied" });
    job.applicants.push({
      freelancerId   : freelancer._id,
      freelancerEmail: freelancer.email,
      status         : "pending",           
    });
    await job.save();

    freelancer.jobApplications.push({
      jobId : job._id,
      status: "pending",                   
    });
    await freelancer.save();

    res.json({ status: "ok" });
  } catch (err) {
    console.error("apply error", err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ════════════  EMPLOYER VIEW APPLICANTS  ════════════ */
/* 🔸 GET all applicants for every job this employer owns */
app.get("/api/employers/applicants", async (req, res) => {
  const { email } = req.query;                       // employer e‑mail
  if (!email) return res.status(400).json({ msg: "missing email" });

  try {
    const jobs = await JobModel.find({ employerEmail: email }).lean();
    const freelancerIds = [
      ...new Set(
        jobs.flatMap((j) => j.applicants.map((a) => a.freelancerId.toString()))
      ),
    ];
    const freelancers = await EmployeeModel.find({
      _id: { $in: freelancerIds },
    }).lean();
    const mapJob = Object.fromEntries(jobs.map((j) => [j._id, j]));
    const payload = freelancers.map((f) => {
      const apps = jobs
        .filter((j) =>
          j.applicants.some((a) => a.freelancerId.toString() === f._id.toString())
        )
        .map((j) => {
          const a = j.applicants.find(
            (x) => x.freelancerId.toString() === f._id.toString()
          );
          return {
            jobId: j._id,
            jobTitle: j.jobTitle,
            status: a.status,
            applicationDate: a.applicationDate,
          };
        });

      return {
        id: f._id,
        name: f.name,
        email: f.email,
        skills: f.skills,
        resume: f.resume ? `https://freelancer-finder.onrender.com/uploads/${f.resume}` : null,
        profileImage: f.profileImage
          ? `https://freelancer-finder.onrender.com/uploads/${f.profileImage}`
          : null,
        applications: apps,
      };
    });

    res.json(payload);
  } catch (err) {
    console.error("Fetch applicants error:", err);
    res.status(500).json({ msg: "server error" });
  }
});


/* ════════════  APPLICATION STATUS UPDATE  ════════════ */

app.put("/api/applications/status", async (req, res) => {
  const { jobId, freelancerId, status } = req.body;
  const allowed = ["reviewed", "rejected", "hired"];
  if (!allowed.includes(status))
    return res.status(400).json({ message: "Bad status" });

  try {
    await JobModel.updateOne(
      { _id: jobId, "applicants.freelancerId": freelancerId },
      { $set: { "applicants.$.status": status } }
    );
    await EmployeeModel.updateOne(
      { _id: freelancerId, "jobApplications.jobId": jobId },
      { $set: { "jobApplications.$.status": status } }
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
/* ════════════  FREELANCER SEARCH  ════════════ */
app.get("/api/freelancers", async (req, res) => {
  try {
    const { location, skill } = req.query;
    const q = {
      role: "freelancer",
      ...(location && { location }),
      ...(skill && { skills: skill })
    };
    const list = await EmployeeModel.find(q);
    res.json(list.map(formatUser));
  } catch (err) {
    console.error("Fetch freelancers error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* GET /api/messages?user1=…&user2=…&jobId=…  ← all msgs for this conversation */
app.get("/api/messages", async (req, res) => {
  const { user1, user2, jobId } = req.query;
  if (!user1 || !user2 || !jobId)
    return res.status(400).json({ msg: "Missing params" });

  try {
    const messages = await MessageModel.find({
      jobId,
      $or: [
        { senderEmail: user1, receiverEmail: user2 },
        { senderEmail: user2, receiverEmail: user1 }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error("fetch messages", err);
    res.status(500).json({ msg: "server error" });
  }
});

/* POST /api/messages  ← send one message (optionally with file) */
app.post("/api/messages", upload.single("file"), async (req, res) => {
  const { senderEmail, receiverEmail, jobId, message } = req.body;
  if (!senderEmail || !receiverEmail || !jobId)
    return res.status(400).json({ msg: "Missing fields" });

  try {
    const doc = await MessageModel.create({
      senderEmail,
      receiverEmail,
      jobId,
      message,
      file: req.file?.filename
    });
    res.json(doc);                  
  } catch (err) {
    console.error("save message", err);
    res.status(500).json({ msg: "server error" });
  }
});

/* helper: add absolute URLs and hide password */
// function fileURL(file) {
//   return file ? `https://freelancer-finder.onrender.com/uploads/${file}` : null;
// }
function fileURL(file) {
  return file ? `${BASE_URL}/uploads/${file}` : null;
}

function formatUser(u) {
  return {
    id          : u._id,
    name        : u.name,
    email       : u.email,
    role        : u.role,
    location    : u.location,
    skills      : u.skills,
    experience  : u.experience,
    phoneNumber : u.phoneNumber,
    projects    : u.projects,
    description : u.description,
    companyName:u.companyName,
    profileImage: fileURL(u.profileImage),
    resume      : fileURL(u.resume),
    companyLogo : fileURL(u.companyLogo)
  };
}


function decorateJob(job, employer) {
  
  const url = (f) => (f ? `${BASE_URL}/uploads/${f}` : null);
  return {
    _id            : job._id,
    jobTitle       : job.jobTitle ?? job.title,
    jobDescription : job.jobDescription ?? job.description,
    jobRequirement : job.jobRequirement ?? job.requirement,
    jobSkills      : job.jobSkills ?? job.skills,
    category       : job.category,
    location       : job.location,
    level          : job.level,
    employerEmail  : job.employerEmail,
    company        : employer?.name || "Unknown",
    companyName    : employer?.companyName || job.companyName ||employer?.name || "Unknown",
    // companyLogo : url(job.companyLogo ),
    applicants     : job.applicants,
    createdAt      : job.createdAt,
    updatedAt      : job.updatedAt,
     companyLogo: employer?.companyLogo ? url(employer.companyLogo) : 
               (job.companyLogo ? url(job.companyLogo) : null),
  };
}
app.use((err, req, res, next) => {
  console.error('UNHANDLED', err);
  res.status(500).json({ success: false, message: err.message });
});

/* ─────────────  start  ───────────── */
app.listen(PORT, () => console.log(`✅  Server running at http://localhost:${PORT}`));
