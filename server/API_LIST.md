### Auth

```
POST /auth/signup
POST /auth/login
POST /auth/logout
GET  /auth/me
POST /auth/refresh
```

---

### Courses

```
POST /courses            (admin only)
GET  /courses            (public – published only)
GET  /courses/:id        (public)
PUT  /courses/:id        (admin | owning instructor)
```

👉 **No `/admin/courses`**
Access control is handled by **middleware**, not URL shape.

This is modern, clean backend design.

---

### Admin (users only)

```
GET /admin/users
```

Admin-course creation via `/courses` is enough.

---

### Instructor (lessons)

```
POST    /courses/:courseId/lessons
GET     /courses/:courseId/lessons
PUT     /courses/:courseId/lessons/:id
DELETE  /courses/:courseId/lessons/:id
```

---

### Student / Enrollment

```
POST   /courses/:courseId/enroll           → enroll student
GET    /auth/me/enrollments               → list enrolled courses
GET    /courses/:courseId/enrollment-status       → check enrollment status
DELETE /courses/:courseId/unenroll         → cancel enrollment

```
