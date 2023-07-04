const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
const adminSecret = "admin_secret";
const userSecret = "user_secret";


function generateUserJwt(user){
  let token = jwt.sign(user, userSecret, {
    expiresIn: '1h'
  })
  return token;
}
function generateAdminJwt(user){
  let token = jwt.sign(user, adminSecret, {
    expiresIn: '1h'
  })
  return token;
}
function adminVerification(req, res, next){
  let token = req.headers.authorization;
  if(token){
    token = token.split(" ")[1];

    jwt.verify(token, adminSecret, (err, user)=>{
      if(err){
        return res.status(403);
      }
      else{
        req.user = user;
        next();
      }
    })
  }
  else{
    res.status(401);
  }
}
function userVerification(req, res, next){
  let token = req.headers.authorization;
  if(token){
    token = token.split(" ")[1];

    jwt.verify(token, userSecret, (err, user)=>{
      if(err){
        return res.status(403);
      }
      else{
        req.user = user;
        next();
      }
    })
  }
  else{
    res.status(401);
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  let admin  = req.body;
  let adminFound = false;
  for(let i=0;i<ADMINS.length; i++){
    if(ADMINS[i].username === admin.username){
      adminFound = true;
      break;
    }
  }
  if(!adminFound){
    ADMINS.push(admin);
    let token = generateAdminJwt(admin);
    res.json({
      message: 'admin created',
      token: token
    })
  }
  else{
    res.status(401).send('Admin already exist');
  }
});

app.post('/admin/login', (req, res) => {
  let {username, password} = req.headers;
  let admin = null;
  for(let i=0;i<ADMINS.length;i++){
    console.log(ADMINS[i]);
    if(ADMINS[i].username == username && ADMINS[i].password == password){
      admin = ADMINS[i];
      break;
    }
  }
  if(admin){
    let token = generateAdminJwt(admin);
    res.json({
      message: 'admin logged in',
      token: token
    })
  }
  else{
    res.status(404).send('Admin not found');
  }
});

app.post('/admin/courses', adminVerification, (req, res) => {
  // logic to create a course
  let course = req.body;
  course.courseId = COURSES.length;
  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: course.courseId })
});

app.put('/admin/courses/:courseId', adminVerification, (req, res) => {
  // logic to edit a course
  let course =req.body;
  let courseFound = false;
  for(let i=0;i<COURSES.length; i++){
    if(COURSES[i].courseId == req.params.courseId){
      COURSES[i] = course;
      courseFound = true;
      break;
    }
  }
  if(courseFound){
    res.json({message: 'course updated'})
  }
  else res.status(404).send('course not found');
});

app.get('/admin/courses', adminVerification, (req, res) => {
  // logic to get all courses
  res.json({
    courses: COURSES
  });
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  let user  = req.body;
  let userFound = false;
  for(let i=0;i<USERS.length; i++){
    if(USERS[i].username === user.username){
      userFound = true;
      break;
    }
  }
  if(!userFound){
    user.purchasedCourses = [];
    USERS.push(user);
    let token = generateAdminJwt(user);
    res.json({
      message: 'user created',
      token: token
    })
  }
  else{
    res.status(401);
  }

});

app.post('/users/login', (req, res) => {
  // logic to log in user
  let {username, password} = req.headers;
  let user = null;
  for(let i=0;i<USERS.length;i++){
    if(USERS[i].username == username && USERS[i].password == password){
      user = USERS[i];
      break;
    }
  }
  if(user){
    let token = generateUserJwt(user);
    res.json({
      message: 'user logged in',
      token: token
    })
  }
  else{
    res.status(404);
  }
});

app.get('/users/courses', userVerification, (req, res) => {
  // logic to list all courses
  let courses = [];
  for(let i = 0; i<COURSES.length; i++){
    if(COURSES[i].published == true){
      courses.push(COURSES[i]);
    }
  }
  res.json({
    courses: courses
  })
});

app.post('/users/courses/:courseId', userVerification, (req, res) => {
  // logic to purchase a course
  let courseId = req.params.courseId;
  let courseFound = null;
  for(let i = 0;i<COURSES.length; i++){
    if(COURSES[i].courseId == courseId){
      courseFound = COURSES[i];
      break;
    }
  }
  if(courseFound){
    for(let i = 0;i<USERS.length; i++){
      if(USERS[i] == req.user){
        USERS[i].purchasedCourses.push(courseFound);
        break;
      }
    }
    res.json({ message: 'Course purchased successfully' })
  }
  else{
    res.json({ message: 'Course not found' })
  }
});

app.get('/users/purchasedCourses', userVerification, (req, res) => {
  // logic to view purchased courses
  let user = null;
  for(let i = 0;i<USERS.length; i++){
    if(USERS[i] == req.user){
      user  = USERS[i];
      break;
    }
  }
  res.json({
    purchasedCourses: user.purchasedCourses
  })
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
