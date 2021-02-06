const express = require('express');
const multer = require('multer');
const verifytoken = require('./config/verifytoken');
const routes = express.Router() ;

const uploadConfig = require('./config/upload');
const UserController = require('../controller/UserController');
const EventController = require('../controller/EventController');
const DashBoardController = require('../controller/DashBoardController');
const LogInController = require("../controller/LogInController");
const ApproveRegisterationController = require("../controller/ApprovalRegisterationController");
const RejectRegisterationController = require('../controller/RejectRegisterationController');
const RegisterationController = require('../controller/RegisterationController');
const upload = multer(uploadConfig) ;

routes.get('/status' , (req , res) => {
    res.send({ "status" : 200});
  
})


//registeration to an event
routes.post('/regist/:eventId' , verifytoken , RegisterationController.create);
routes.delete('/deleteAllregisterations' , verifytoken, RegisterationController.deleteAllRegisterations);
routes.get('/registeration/:registeration_id' , verifytoken, RegisterationController.getRegisterationbyId);
//get My registerations 
routes.get('/myregisteration/:owner' ,verifytoken,  RegisterationController.getMyRegisteration);
//get My registerationsResults
routes.get('/myregisterationResult/:eventOwner' , verifytoken , RegisterationController.getMyRegisterationResults);
//approveRequest
routes.post('/registeration/:registerationId/approve', verifytoken , ApproveRegisterationController.approveRequest);
//rejectRequest
routes.post('/registeration/:registerationId/reject',verifytoken , RejectRegisterationController.rejectRequest);
//login
routes.post('/login' , LogInController.logIn);
//dashboard
routes.get('/dashboard' ,verifytoken ,  DashBoardController.getAllEvents);
routes.get('/dashboard/:sport', verifytoken , DashBoardController.getAllEvents);
routes.get('/event/:eventID' , verifytoken ,  DashBoardController.getEventById);
routes.get('/dashboardUserId' , verifytoken ,DashBoardController.getEventByUserId);

//events
routes.post('/event/createEvent' , verifytoken ,upload.single("thumbnail") ,EventController.createEvent);
routes.delete('/events/:eventID' ,verifytoken , EventController.deleteEvent);
routes.delete('/eventsdelete' , EventController.deleteAllevents);
//users
routes.get('/user/:userID' , UserController.getUserById);
routes.post('/user/register' , UserController.createUser);
routes.delete('/usersdeleteAll' , UserController.deleteAllUsers);
module.exports = routes ;