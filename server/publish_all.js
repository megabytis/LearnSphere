const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function publishAll() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING || process.env.MONGO_URI);
        console.log("Connected to DB");

        const Course = mongoose.model('Course', new mongoose.Schema({ published: Boolean }));
        const Lesson = mongoose.model('Lesson', new mongoose.Schema({ freePreview: Boolean }));

        const courseResult = await Course.updateMany({}, { $set: { published: true } });
        console.log(`Updated ${courseResult.modifiedCount} courses to published: true`);

        const lessonResult = await Lesson.updateMany({ order: 1 }, { $set: { freePreview: true } });
        console.log(`Updated ${lessonResult.modifiedCount} lessons (order 1) to freePreview: true`);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

publishAll();
