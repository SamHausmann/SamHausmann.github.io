var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')('samhausmann', 'wawawewa1');
var Hogan = require('hogan.js');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: './uploads/'});

//router.use(upload.single('resume'));
var type = upload.single('resume');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Under-23 Lightweight Men\'s Rowing Camp'}); // render when page is first loaded


});

router.post('/coachapp', type, function(req, res, next){
  console.log(req.file.path)
})

// POST home page
router.post('/', function(req, res, next) {

  if (req.body.email && !req.body.emailapply && !req.body.coachemail) {

  sendgrid.send({
  	to: 'hausmann.sam@gmail.com',
  	from: req.body.email,
  	subject: req.body.subject,
  	html: req.body.message
  }, function(err, json) { // must be json rather than res cause need to access res from the function it's nested in
  	if(err) {
  		res.send('email failed');
  	} else {

  	res.render('index', { title: 'Under-23 Lightweight Men\'s Rowing Camp'}); // render when contact email is sent
}
  });

} else if(req.body.emailapply && !req.body.email && !req.body.coachemail) {
  sendgrid.send({
    to: 'hausmann.sam@gmail.com',
    from: req.body.emailapply,
    subject: 'camp application',
    html: 'Name: '+req.body.name+'<br>'+'Email: '+req.body.emailapply+'<br>'+'Birth Date: '+req.body.birthdate+'<br>'+'Height: '+req.body.height+'<br>'+'Weight: '+req.body.weight+'<br>'+'Years rowed: '+req.body.rowingexperience+'<br>'+'College: '+req.body.college+'<br>'+'Team Affiliation: '+req.body.teamaffiliation+'<br>'+'2k: '+req.body.twok+'<br>'+'6k: '+req.body.sixk+'<br>'+'Other erg score: '+req.body.othererg+'<br>'+'Port: '+req.body.port+'<br>'+'Starboard: '+req.body.starboard+'<br>'+'Scull: '+req.body.scull+'<br>'+'Results and other info: '+req.body.results
  }, function(err, json) {

    if(err) {
      res.send('email failed')
    } else {
      res.render('index', {title: 'Under-23 Lightweight Men\'s Rowing Camp'}); // render when application email is sent
    }
  });

} else if(req.body.coachemail && !req.body.email && !req.body.emailapply) {

  //fs.readFile(req.file, function(req, res, next){
    if(req.file){
      console.log('file exists');
    }else if(!req.file){
      console.log('no file')
    }
    /*sendgrid.send({
    to: 'hausmann.sam@gmail.com',
    from: req.body.coachemail,
    subject: 'coach application',
    html: 'Name: ' + req.body.coachname+'<br>'+'Email: '+req.body.coachemail,
    files: [{filename:'resume', content: data}]
  }, function(err, json) {

    if(err){
      res.send('email failed')
    } else {
       res.render('index', {title: 'Under-23 Lightweight Men\'s Rowing Camp'}); // render when coach application is sent
    }
  });*/


// })

} else{
  res.render('index', {title: 'Under-23 Lightweight Men\'s Rowing Camp'}); // render when form is submitted but no email has been sent
}


});

module.exports = router;
