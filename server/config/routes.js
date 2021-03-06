var auth = require('./auth');
var mentors = require('../controllers/mentors');
var students = require('../controllers/students');
var degprogram = require('../controllers/programs');

module.exports = function (app) {

    app.post('/api/v1/authenticate', auth.authenticate);

    ////////////////////////
    // PROGRAMS           //
    ////////////////////////

    // Get the list of degrees
    app.get('/api/getdegreelist', degprogram.getDegree);

    // Get the program area for the appropriate degree
    app.post('/api/getdegreeprogram', degprogram.getDegreeProgram);

    // Get the program for the appropriate degree and program area
    app.post('/api/getdegreeprogramarea', degprogram.getDegreeProgramAreaList);

    // Get the papers for the appropriate program
    app.post('/api/getCourses', degprogram.getCourses);

    // Get the list of all papers with mentors
    app.post('/api/getpaperswithmentors', degprogram.getPapersWithMentors);

    // Get the list of all programs with paper count
    app.post('/api/getprogramswithpapercount', degprogram.getProgramWithPaperCount);

    // Get the list of all program areas
    app.get('/api/getprogramarealist', degprogram.getProgramAreaList);

    // Save the edited details for papers
    app.post('/api/savepaperedit', degprogram.savePaperEdit);

    // Delete a paper
    app.post('/api/deletepaper', degprogram.deletePaper);

    // Add new paper
    app.post('/api/savepapernew', degprogram.savePaperNew);

    ////////////////////////
    // STUDENTS           //
    ////////////////////////

    // Get student detail during registration using auth token
    app.post('/api/getstudentdetails', students.getStudentDetails);

    // Registering a student
    app.post('/api/v1/savestudentinformation', students.createUser);

    // Get the count of users by roleid
    app.get('/api/getalluserscount', students.getUsersCount);

    // Get the information about a student
    app.get('/api/getstudentinfo', students.getStudentInfo);

    // Get the list of papers for the appropriate program
    app.post('/api/getpaperlist', students.getPaperList);

    // Update the profile for a student
    app.post('/api/editProfile', students.updateProfileInfo);

    // Assign papers and mentors for a student
    app.post('/api/studentopportunity', students.studentOpportunity);

    //Get the list of all sessions for students
    app.get('/api/getsessionlistforstudent', students.getSessionListStudent);

    ////////////////////////
    // MENTORS            //
    ////////////////////////

    // Add schedule for session handled by mentor
    app.post('/api/mentorsession', mentors.addMentorSession);

    // Get the list of sessions for the mentor
    app.get('/api/getmentorsession', mentors.getMentorSession);

    // Mark session completed
    app.post('/api/marksessioncompleted', mentors.markSessionCompleted);

    // Get the list of all papers for mentor
    app.get('/api/getpaperlistformentor', mentors.getPaperListMentor);

    // Get the list of all top mentors
    app.get('/api/gettopmentors', mentors.getTopMentors);

    // Get the list of latest students
    app.get('/api/getlateststudents', mentors.getLatestStudents);

    // Get the list of mentors from mentors table
    app.get('/api/mentorusers', mentors.getUsers);

    // Get the list of mentors from user table
    app.get('/api/mentorstudents', mentors.getMentorStudent);

    // Add a new mentor
    app.post('/api/addNewMentor', mentors.addNewMentor)

    // Get the details of all users
    app.get('/api/studentusers', students.getStudentList);

    // Get the org information of salesforce from config variable
    app.get('/api/getsalesforceorginfo', function(req, res) {
        res.send({salesforceOrgID: global.dbvars.sfoid});
    });

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.post('/auth/isloggedin', function (req, res) {
        if (req.isAuthenticated()) {
            res.send({state: 'success', user: req.user});
        } else {
            res.send({state: 'failure', user: null});
        }
    });

    app.route('/site/*').get(function (req, res) {
        res.render('sitehome', {bootstrappedUser: req.user});
    })

    app.get('/dashboard/*', function (req, res) {
        res.render('sitehome', {bootstrappedUser: req.user});
    });

    app.get('*', function (req, res) {
        res.render('index', {bootstrappedUser: req.user});
    });
}
