
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const EmployeeModel = require('./models/Employee');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}
app.use('/uploads', express.static('uploads'));

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// ======== SIGNUP ========
app.post('/signup', upload.single('profileImage'), async (req, res) => {
  const { name, email, password, role } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ status: "error", message: "All fields are required" });
  }

  try {
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
    });

    return res.json({
      status: "success",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage
          ? `http://localhost:${PORT}/uploads/${newUser.profileImage}`
          : null
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Signup failed", error: err });
  }
});


// ======== LOGIN ========
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ status: "error", message: "Invalid password" });
    }

    return res.json({
      status: "success",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
          ? `http://localhost:${PORT}/uploads/${user.profileImage}`
          : null
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error", error });
  }
});
const uploadFields = upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'companyLogo', maxCount: 1 }
]);

app.put('/api/employees/update', uploadFields, async (req, res) => {
  console.log("=== Incoming Update Request ===");
console.log("BODY:", req.body);
console.log("FILES:", req.files);
  try {
    const {
      email,
      phoneNumber,
      experience,
      rating,
      location,
      position,
      description,
      skills 
    } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required for update" });
    }

    const updateData = {
      ...(phoneNumber && { phoneNumber }),
      ...(experience && { experience }),
      ...(rating && { rating }),
      ...(location && { location }),
      ...(position && { position }),
      ...(description && { description }),
    };

    if (skills) {
      try {
        updateData.skills = JSON.parse(skills); 
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid skills format" });
      }
    }

    if (req.files?.resume?.length) {
      updateData.resume = req.files.resume[0].filename;
    }

    if (req.files?.companyLogo?.length) {
      updateData.companyLogo = req.files.companyLogo[0].filename;
    }

    const updatedUser = await EmployeeModel.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
     if (updatedUser.profileImage && !updatedUser.profileImage.startsWith('http')) {
      updatedUser.profileImage = `http://localhost:${PORT}/uploads/${updatedUser.profileImage}`;
    }
    if (updatedUser.resume && !updatedUser.resume.startsWith('http')) {
      updatedUser.resume = `http://localhost:${PORT}/uploads/${updatedUser.resume}`;
    }
    if (updatedUser.companyLogo && !updatedUser.companyLogo.startsWith('http')) {
      updatedUser.companyLogo = `http://localhost:${PORT}/uploads/${updatedUser.companyLogo}`;
    }
    res.json({ success: true, updatedUser });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.put('/api/employees/job', async (req, res) => {
  try {
    const { email, title, descrip, loca, category } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const updatedUser = await EmployeeModel.findOneAndUpdate(
      { email },
      {
        $set: {
          jobTitle: title,
          jobDescription: descrip,
          jobLocation: loca,
          jobCategory: category,
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, updatedUser });
  } catch (err) {
    console.error("Job update failed:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// ✅ Fixed GET /api/jobs route
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await EmployeeModel.find({ role: 'client' }); // ✅ use EmployeeModel
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/api/freelancers', async (req, res) => {
  try {
    // optional query params: ?location=Delhi&skill=React
    const { location, skill } = req.query;
    const query = { role: 'freelancer' };

    if (location) query.location = location;
    if (skill)    query.skills   = skill;

    const people = await EmployeeModel.find(query);
    res.json(people.map(formatUser));
  } catch (err) {
    console.error('Fetch freelancers error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// 8. HELPERS
// ────────────────────────────────────────────────────────────────────────────
function formatUser(u) {
  const fileUrl  = f => (f ? `http://localhost:${PORT}/uploads/${f}` : null);
  return {
    id           : u._id,
    name         : u.name,
    email        : u.email,
    role         : u.role,
    location     : u.location,
    skills       : u.skills,
    experience   : u.experience,
    phoneNumber  : u.phoneNumber,
    jobTitle     : u.jobTitle,
    jobDescription: u.jobDescription,
    jobLocation  : u.jobLocation,
    jobCategory  : u.jobCategory,
    profileImage : fileUrl(u.profileImage),
    resume       : fileUrl(u.resume),
    companyLogo  : fileUrl(u.companyLogo)
  };
}



app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
