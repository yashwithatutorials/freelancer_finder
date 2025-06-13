// const mongoose=require('mongoose')
// const EmployeeSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// })
// const EmployeeModel=mongoose.model("employees",EmployeeSchema)
// module.exports=EmployeeModel;
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  } ,
  email: { type: String, unique: true },
  password: {
    type:String,
    required:true,
  } ,
  role:{
    type:String,
    enum:['client','freelancer'],
    required:true
  },
  profileImage: { type: String },
  phoneNumber: String,
  skills: [String], 
//  clientDetails: {
  companyLogo: String,
  location: String,
  position: String,
  description: String,
// },
// freelancerDetails: {
  resume: String,
  experience: String,
  rating: String,
// },

 jobTitle: String,
  jobDescription: String,
  jobLocation: String,
  jobCategory: String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
