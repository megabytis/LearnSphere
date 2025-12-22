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
  price: { type: Number, required: true, min: 0, default: 0 },
  currency: { type: String, default: "inr" },
  published: { type: Boolean, default: false },
});

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  content: { type: String },
  order: { type: Number },
  freePreview: { type: Boolean, default: false },
});

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  status: { type: String, enum: ["active", "completed", "dropped"], default: "active" },
  enrolledAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Lesson = mongoose.model("Lesson", lessonSchema);
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING || process.env.MONGO_URI);
    console.log("Connected to DB");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Enrollment.deleteMany({});
    console.log("Cleared existing data");

    const hashedPassword = await bcrypt.hash("Password123!", 10);

    // Create Admin & Instructor
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

    // Create 20 Students
    const studentsData = [];
    for (let i = 1; i <= 20; i++) {
      studentsData.push({
        name: `Student ${i}`,
        email: `student${i}@learnsphere.com`,
        password: hashedPassword,
        role: "student",
      });
    }
    const students = await User.insertMany(studentsData);
    console.log("Users created (Admin, Instructor, 20 Students)");

    // Create 25 Courses with prices
    const courseTitles = [
      "Mastering Node.js", "React for Professionals", "MongoDB Deep Dive", "Express.js Best Practices", "Fullstack Web Development",
      "Python for Data Science", "Machine Learning 101", "Docker & Kubernetes", "AWS Cloud Practitioner", "Cybersecurity Basics",
      "UI/UX Design Fundamentals", "Figma Mastery", "Adobe Illustrator Guide", "Digital Marketing Strategy", "SEO Optimization",
      "Public Speaking Mastery", "Business Communication", "Project Management PMP", "Agile & Scrum", "Leadership Skills",
      "Financial Literacy", "Stock Market Investing", "Personal Branding", "Content Creation 101", "Video Editing with Premiere Pro"
    ];

    // Price tiers in paisa (₹499 to ₹4999)
    const priceTiers = [49900, 99900, 149900, 199900, 249900, 299900, 349900, 399900, 449900, 499900];

    const coursesData = courseTitles.map((title, index) => ({
      title,
      description: `A comprehensive guide to ${title}. Learn the ins and outs of this topic with practical examples and real-world projects. This course is designed to take you from beginner to advanced level.`,
      instructorId: instructor._id,
      price: priceTiers[index % priceTiers.length],
      currency: "inr",
      published: true,
    }));

    const courses = await Course.insertMany(coursesData);
    console.log("25 Courses created");

    // Create Lessons for each course
    const lessonsData = [];
    courses.forEach((course) => {
      for (let i = 1; i <= 8; i++) {
        lessonsData.push({
          courseId: course._id,
          title: `Lesson ${i}: ${course.title} - Part ${i}`,
          content: `This is the detailed content for lesson ${i} of the course ${course.title}. It covers key concepts, examples, and exercises.`,
          order: i,
          freePreview: i <= 2, // First 2 lessons are free
        });
      }
    });

    await Lesson.insertMany(lessonsData);
    console.log("Lessons created (8 per course)");

    // Create Random Enrollments
    const enrollmentsData = [];
    students.forEach((student) => {
      // Enroll each student in 3-5 random courses
      const numCourses = Math.floor(Math.random() * 3) + 3;
      const shuffledCourses = courses.sort(() => 0.5 - Math.random());
      const selectedCourses = shuffledCourses.slice(0, numCourses);

      selectedCourses.forEach((course) => {
        enrollmentsData.push({
          userId: student._id,
          courseId: course._id,
          status: "active",
        });
      });
    });

    await Enrollment.insertMany(enrollmentsData);
    console.log("Random Enrollments created");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
