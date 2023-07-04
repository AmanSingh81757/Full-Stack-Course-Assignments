const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let currId = 0;

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  let adminUsername = req.body.username;
  let password = req.body.password;
  let found = false;
  for(let i=0;i<ADMINS.length;i++){
    if(adminUsername===ADMINS[i].username && password === ADMINS[i].passsword){
      found=true;
    }
  }
  if(!found){
    ADMINS.push({
      username: adminUsername,
      password: password
    })
    res.json({
      message: 'Admin created successfully'
    })
  }
  else{
    res.status(401).send('admin already present');
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let givenUsername = req.headers.username;
  let givenPassword = req.headers.password;
  let userFound = false;
  for(let i=0;i<ADMINS.length;i++){
    if(givenUsername === ADMINS[i].username && givenPassword === ADMINS[i].password){
      userFound = true;
      break;
    }
  }
  if(userFound){
    res.json({
      message: 'ADMIN Logged in successfully'
    })
  }
  else{
    res.status(404).send('admin not found create a new account');
  }
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  let givenUsername = req.headers.username;
  let givenPassword = req.headers.password;
  let userFound = false;
  for(let i=0;i<ADMINS.length;i++){
    if(givenUsername === ADMINS[i].username && givenPassword === ADMINS[i].password){
      userFound = true;
      break;
    }
  }
  if(userFound){
    let course = req.body;
    course.courseId = currId;
    COURSES.push(course);
    currId++;
    res.json({
      message: 'Course created successfully',
      courseId: course.courseId
    })
  }
  else {
    res.status(404).send('you cannot add course');
  }
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  let courseId = req.params.courseId;
  let givenUsername = req.headers.username;
  let givenPassword = req.headers.password;
  let userFound = false;
  for(let i=0;i<ADMINS.length;i++){
    if(givenUsername === ADMINS[i].username && givenPassword === ADMINS[i].password){
      userFound = true;
      break;
    }
  }
  if(userFound){
    let flag = 0;
    for(let i=0;i<COURSES.length; i++){
      if(COURSES[i].courseId == courseId){
        COURSES[i] = req.body;
        COURSES[i].courseId = Number(courseId);
        flag = 1;
        break;
      }
    }
    if(flag == 1){
      res.json({ message: 'Course updated successfully' })
    }
    else{
      res.status(400).json({ message: 'No such course found' })
    }
  }
  else {
    res.status(404).send('you cannot update course');
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  let givenUsername = req.headers.username;
  let givenPassword = req.headers.password;
  let userFound = false;
  for(let i=0;i<ADMINS.length;i++){
    if(givenUsername === ADMINS[i].username && givenPassword === ADMINS[i].password){
      userFound = true;
      break;
    }
  }
  if(userFound){
    res.send(COURSES);
  }
  else{
    res.status(404).send('User not found');
  }
});


function userVerification(req, res, next){
  let givenUsername = req.headers.username;
  let givenPassword = req.headers.password;
  let userFound = false;
  for(let i=0;i<USERS.length;i++){
    if(givenUsername === USERS[i].username && givenPassword === USERS[i].password){
      userFound = true;
      break;
    }
  }
  if(userFound)
    next();
  else{
    res.status(403).send('Unauthorised')
  }
}
// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  let found = false;
  for(let i=0;i<USERS.length;i++){
    if(USERS[i].username == req.headers.username && USERS[i].passsword==req.headers.password){
      found = true;
      break;
    }
  }
  if(found){
    res.json({message: 'User already exists'});
  }
  else{
    let user = req.body;
    user.purchasedCourses = [];
    USERS.push(user);
    res.json({ message: 'User created successfully' })
  }
});

app.post('/users/login', userVerification,  (req, res) => {
  // logic to log in user
  res.json({
    message: 'Logged in successfully'
  })
});

app.get('/users/courses', userVerification, (req, res) => {
  // logic to list all courses
  let courseArray = [];
  for(let i=0;i<COURSES.length; i++){
    if(COURSES[i].published==true){
      courseArray.push(COURSES[i]);
    }
  }
  res.send(courseArray);
});

app.post('/users/courses/:courseId', userVerification, (req, res) => {
  // logic to purchase a course
  let course = null;
  for(let i=0;i<COURSES.length;i++){
    if(COURSES[i].courseId == req.params.courseId){
      course = COURSES[i];
      break;
    }
  }
  if(course){
    let user = null;
    for(let i=0; i<USERS.length; i++){
      if(USERS[i].username == req.headers.username && USERS[i].password == req.headers.password){
        user = USERS[i];
        break;
      }
    }
    if(user){
      user.purchasedCourses.push(course);
      res.json({ message: 'Course purchased successfully' })
    }
    else res.send('User Not found');
  }
  else {
    res.status(404).send('Not found');
  }
});

app.get('/users/purchasedCourses', userVerification, (req, res) => {
  // logic to view purchased courses
  let user = null;
  for(let i=0; i<USERS.length; i++){
    if(USERS[i].username == req.headers.username && USERS[i].password == req.headers.password){
      user = USERS[i];
      break;
    }
  }
  if(user){
    res.json({
      purchasedCourses: user.purchasedCourses
    });
  }
  else {
    res.status(404).send('Not found');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
