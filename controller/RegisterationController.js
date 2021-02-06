const User = require('../Models/User');
const Event = require('../Models/Event');
const Registration = require('../Models/Registration');
const jwt = require('jsonwebtoken');
module.exports = {
    async create(req, res) {
         jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401).json({'mmmmmm' : 'kkkk'})
            } 
            else {
                
                const { eventId } = req.params;
                    try{
        
                        const registration = await Registration.create({
                            user: authData.user._id,
                            event: eventId
                        })
                
                        await registration
                            .populate('event')
                            .populate('user','-password') // we add second argument so we remove the password
                            .execPopulate();
                        
                        registration.owner = authData.user._id;
                        registration.eventOwner = registration.event.user._id ;
                        registration.eventTitle =  registration.event.title ;  
	                    registration.eventPrice = registration.event.price ; 
	                    registration.userEmail = registration.user.email ;
                        registration.eventDate= registration.event.date ; 
                        await registration.save();
                        
                        const ownerSocket = req.connectUsers[registration.event.user]

                        if (ownerSocket) {
                             req.io.to(ownerSocket).emit('registration_request', registration)
                        }
                        
                        return res.status(200).json(registration)
                    }
                    catch(err){
                        throw Error(`Error while creating new registeration :  ${err}`)
                    }
                          
                }});     
      
}
    , 
    async getRegisterationbyId(req , res){
        const { registeration_id } = req.params ;
        try{
            jwt.verify(req.token, 'secret', async (err, authData) => {
            if(err){
                return res.status(400).json({"message" : `error existed in ${err}`});
            }
            const registeration = await Registration.findById(registeration_id);
            if(!registeration){
                return res.status(404).json({"message" : "there is no registeration by this id"})
            }
           return res.status(200).json(registeration);
        })
        }catch(err){
            throw Error(`Error while Registering new user :  ${err}`)
        }
    } , 
    async getMyRegisteration(req , res){
        const { eventOwner } = req.params ;
        try{
            jwt.verify(req.token, 'secret', async (err, authData) => {
            if(err){
                return res.status(400).json({"message" : `error existed in ${err}`});
            }
            const registeration = await Registration.find({ eventOwner });
            if(!registeration){
                return res.status(404).json({"message" : "there is no registeration by this id"})
            }
           return res.status(200).json(registeration);
        })
        }catch(err){
            return res.status(404).json({"message" : `error ${err}`})
        }
    } ,
    async getMyRegisterationResults(req , res){
        const { owner } = req.params ;
        try{
            jwt.verify(req.token, 'secret', async (err, authData) => {
            if(err){
                return res.status(400).json({"message" : `error existed in ${err}`});
            }
            const registeration = await Registration.find({ owner });
            if(!registeration){
                return res.status(404).json({"message" : "there is no registeration by this id"})
            }
           return res.status(200).json(registeration);
        })
        }catch(err){
            return res.status(404).json({"message" : `error ${err}`})
        }
    } ,
    async deleteAllRegisterations(req,res){
        try{
            const response = await Registration.deleteMany({});
            res.status(200).send(response);
        }catch(err){
            res.send(err);
        }
    }
};