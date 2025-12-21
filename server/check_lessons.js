const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const lessonSchema = new mongoose.Schema({
    courseId: mongoose.Schema.Types.ObjectId,
    title: String,
    order: Number,
}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);

async function checkLessons() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING || process.env.MONGO_URI);
        console.log("Connected to DB");

        const lessons = await Lesson.find({}).sort({ order: 1 }).limit(20);
        console.log("Lessons (sorted by order: 1):");
        lessons.forEach(l => {
            console.log(`ID: ${l._id}, Title: ${l.title}, Order: ${l.order}, CreatedAt: ${l.createdAt}`);
        });

        const lessonsRaw = await Lesson.find({}).limit(20);
        console.log("\nLessons (raw/natural order):");
        lessonsRaw.forEach(l => {
            console.log(`ID: ${l._id}, Title: ${l.title}, Order: ${l.order}`);
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkLessons();
