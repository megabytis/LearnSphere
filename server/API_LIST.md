### Auth

```
POST /auth/signup
POST /auth/login
POST /auth/logout
GET  /auth/me
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
POST   /courses/:id/lessons
PUT    /lessons/:id
DELETE /lessons/:id
```

---

### Student / Enrollment

```
POST /courses/:id/enroll
GET  /my-courses
POST /lessons/:id/complete
```
