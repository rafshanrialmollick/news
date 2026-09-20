// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//       trim: true,
//       match: [/^\d{11}$/, "Please enter a valid phone number"],
//     },
//     course: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     department: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     semester: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 12,
//     },
//     address: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   {
//     timestamps: { createdAt: "createdAt", updatedAt: false },
//   },
// );

// studentSchema.index({
//   fullName: "text",
//   course: "text",
//   department: "text",
//   address: "text",
// });

// const Student = mongoose.model("Student", studentSchema);

// export default Student;