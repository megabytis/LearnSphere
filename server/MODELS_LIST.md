## 1️⃣ User

```
User
- name
- email (unique)
- password
- role: "admin" | "instructor" | "student"
- createdAt
```

---

## 2️⃣ Course

```
Course
- title
- description
- instructorId (User)
- published (boolean)
- createdAt
```

---

## 3️⃣ Lesson

```
Lesson
- courseId
- title
- content (string / markdown)
- order (number)
```

---

## 4️⃣ Enrollment

```
Enrollment
- userId (student)
- courseId
- completedLessons: [lessonId]
- progress (number)   // 0–100
- enrolledAt
```

✅ No payments
✅ No reviews
✅ No certificates

Finite, strong domain.
