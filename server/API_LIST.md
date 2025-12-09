### Auth

```
POST /auth/signup
POST /auth/login
POST /auth/logout
GET  /auth/me
```

---

### Admin

```
GET  /admin/users
POST /admin/courses
PUT  /admin/courses/:id
DELETE /admin/courses/:id
```

---

### Courses (Public / Student)

```
GET /courses
GET /courses/:id
```

---

### Instructor

```
POST /courses/:id/lessons
PUT  /lessons/:id
DELETE /lessons/:id
```

---

### Student / Enrollment

```
POST /courses/:id/enroll
GET  /my-courses
POST /lessons/:id/complete
```
