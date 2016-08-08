var auth = require('./auth'),
   mentors = require('../controllers/mentors');


module.exports = function(app) {

	// ==============================================

	app.post('/api/v1/authenticate',  auth.authenticate);

	app.post('/logout', function(req, res) { req.logout();  res.end(); });

	app.post('/auth/isloggedin', function(req, res){  if(req.isAuthenticated()) { res.send({state: 'success', user: req.user}); }
	    else  { res.send({state: 'failure', user: null});  }
	});


	app.get('/api/mentorusers', mentors.getUsers);


	app.route('/site/*').get(function(req, res) {res.render('sitehome', {  bootstrappedUser: req.user });})

    app.get('/dashboard/*', function(req, res) { res.render('sitehome',{bootstrappedUser: req.user});});

	app.get('*', function(req, res) { res.render('index', {bootstrappedUser: req.user});});
}