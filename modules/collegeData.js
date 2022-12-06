
const { resolve } = require('path');
const Sequelize = require('sequelize');

var sequelize = new Sequelize('qdtgjsjl', 'qdtgjsjl', '2Fc7U04KbR9-gL9ISFvqieZwQMJw0Ilv', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

var student = sequelize.define('Student', {
    studentNum:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
})

var course = sequelize.define("Course", {
    courseId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode : Sequelize.STRING,
    courseDescritpion: Sequelize.STRING
})

course.hasMany(student, {foreignKey: 'Course'})

module.exports.initialize = function () {
    return new Promise(function(resolve, reject){
    sequelize.sync().then(()=>{ resolve("Sucessfully Connected")
    })
    .catch(()=>{reject("unable to sync the database")})})
}

module.exports.getAllStudents = function(){
    return new Promise(function(resolve, reject)
    {
        student.findAll().then((data) => {resolve(data)})
        .catch(() => {reject("no results returned")})

    })
}

module.exports.getCourses = function(){
    return new Promise(function(resolve, reject)
    {
        course.findAll().then((data) => {resolve(data)})
        .catch(() => {reject("no results returned")})

    })
};

module.exports.getStudentByNum = function (num) {
    return new Promise(function(resolve, reject)
    {
        student.findAll({
            where: {
                studentNum : num
            }
        }).then((data)=>{resolve(data[0])})
        .catch(()=>{reject("no result found")})
    })
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise(function(resolve, reject)
    {
        student.findAll({
            where: {
                Course: course
            }
        }).then((data)=>{resolve(data)})
        .catch(()=>{reject("no result found")})
    })
};

module.exports.getCourseById = function (id) {
    return new Promise(function(resolve, reject)
    {
        course.findAll({
            where: {
                courseId : id
            }
        }).then((data)=>{resolve(data[0])})
        .catch(()=>{reject("no result found")})
    })
};

module.exports.addStudent = function (studentData) {
    return new Promise(function(resolve, reject) {
    studentData.TA = (studentData.TA) ? true : false;
    for(const prob in studentData)
    {
        if(prob === "")
        {
            prob = null;
        }
    }
    student.create({
        studentNum: studentData.studentNum,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        addressStreet: studentData.addressStreet,
        addressCity: studentData.addressCity,
        addressProvince: studentData.addressProvince,
        TA: studentData.TA,
        status: studentData.status,
        Course: studentData.course
    }).then(()=>{resolve("Student Successfully Added")})
    .catch(()=>{reject("unable to create student")})})
};

module.exports.updateStudent = function (studentData) {
    return new Promise(function(resolve, reject){
    studentData.TA = (studentData.TA) ? true : false;
    for(const prob in studentData)
    {
        if(prob === "")
        {
            prob = null;
        }
    }
    student.update({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        addressStreet: studentData.addressStreet,
        addressCity: studentData.addressCity,
        addressProvince: studentData.addressProvince,
        TA: studentData.TA,
        status: studentData.status
    },
    {
        where: {studentNum : studentData.studentNum}
    }).then(()=>{resolve("Student is successfully updated")})
    .catch(()=>{reject("unable to update student")})})
};

module.exports.addCourse = function (courseData) {
    return new Promise(function(resolve, reject) {
    for(const prob in courseData)
    {
        if(prob === "")
        {
            prob = null;
        }
    }
    course.create({
        courseId : courseData.courseId,
        courseCode : courseData.courseCode,
        courseDescritpion : courseData.courseDescritpion
    }).then(()=>{resolve("Course Successfully Added")})
    .catch(()=>{reject("unable to create course")})})
};

module.exports.updateCourse = function (courseData)
{
    return new Promise(function(resolve, reject) {
    for(const prob in courseData)
    {
        if(prob === "")
        {
            prob = null;
        }
    }
    course.update({
        courseId : courseData.courseId,
        courseCode : courseData.courseCode,
        courseDescritpion : courseData.courseDescritpion
    },
    {
        where : {courseId : courseData.courseId}
    }).then(()=>{resolve("Course is successfully updated")})
    .catch(() => {reject("unable to update course")})})
}

module.exports.deleteCourseById = function(id)
{
    return new Promise(function(resolve, reject){
        course.destroy({
            where : {courseId : id}
        }).then(() => {resolve("Course is successfully deleted")})
        .catch(() => {reject("Unable to delete course")})
    })
}

module.exports.deleteStudentByNum = function(num)
{
    return new Promise(function(resolve, reject){
        student.destroy({
            where : {studentNum : num}
        }).then(() => {resolve("Student is successfully deleted")})
        .catch(() => {reject("Unable to delete student")})
    })
}
