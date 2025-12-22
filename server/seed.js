const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "instructor", "student"], default: "student" },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  published: { type: Boolean, default: false },
});

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  content: { type: String },
  order: { type: Number },
  freePreview: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Lesson = mongoose.model("Lesson", lessonSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING || process.env.MONGO_URI);
    console.log("Connected to DB");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    console.log("Cleared existing data");

    const hashedPassword = await bcrypt.hash("Password123!", 10);

    // Create Users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@learnsphere.com",
      password: hashedPassword,
      role: "admin",
    });

    const instructor = await User.create({
      name: "John Instructor",
      email: "instructor@learnsphere.com",
      password: hashedPassword,
      role: "instructor",
    });

    const student = await User.create({
      name: "Jane Student",
      email: "student@learnsphere.com",
      password: hashedPassword,
      role: "student",
    });

    console.log("Users created");

    // Create Courses
    const coursesData = [
      { title: "Mastering Node.js", description: "Deep dive into Node.js internals and best practices.", instructorId: instructor._id, published: true },
      { title: "React for Professionals", description: "Advanced React patterns and performance optimization.", instructorId: instructor._id, published: true },
      { title: "MongoDB Deep Dive", description: "Mastering NoSQL with MongoDB.", instructorId: instructor._id, published: true },
      { title: "Express.js Best Practices", description: "Building scalable APIs with Express.", instructorId: instructor._id, published: true },
      { title: "Fullstack Web Development", description: "The complete guide to modern web development.", instructorId: instructor._id, published: true },
    ];

    const courses = await Course.insertMany(coursesData);
    console.log("Courses created");

    // Create Lessons
    const lessonsData = [];
    courses.forEach((course) => {
      for (let i = 1; i <= 5; i++) {
        lessonsData.push({
          courseId: course._id,
          title: `Lesson ${i}: Introduction to ${course.title} Part ${i}`,
          content: `This is the content for lesson ${i} of ${course.title}.`,
          order: i,
          freePreview: i === 1, // First lesson is free
        });
      }
    });

    await Lesson.insertMany(lessonsData);
    console.log("Lessons created");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
