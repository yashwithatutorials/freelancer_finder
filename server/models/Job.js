const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  location: String,
  skills: [String],
  description: String
});

module.exports = mongoose.model('jobportal', jobSchema);

