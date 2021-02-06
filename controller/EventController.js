
const Event = require('../Models/Event');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
module.exports = {
   

    async createEvent (req,res){
        try{
            jwt.verify(req.token, 'secret', async (err, authData) => {
             if (err) {
                return res.status(403).json({ message : `error is detected ${err}`});
             }

            else{
            const {title , description , price , sport , date} = req.body;
            const  user_id  = authData.user._id; 
            // const { filename } = req.file;
            
            //check if user already exists 
            const user = await User.findById(user_id) ; 
            
            if(!user){
                return res.status(404).json({
                    message : "the user doesn't exist " + user_id
                })
               
            }
            const new_event = await Event.create(
                {
                    title ,
                    description , 
                    price: parseFloat(price) ,
                    sport ,
                    user : user_id ,
                    // thumbnail : filename ,
                    date : date
                } 
            )
            
            return res.status(200).json(new_event);
            
            

             }
            })
           
        }
        catch (err) {
            
            throw Error(`Error while Registering new user :  ${err}`)
            
		}
    },
    

     async deleteEvent(req,res){
       const {eventID} =  req.params ;
       try{
            jwt.verify(req.token, 'secret', async (err, authData) => {
                if (err) {
                   return res.status(403).json({ message : `error is detected ${err}`});
                }
    
                else{
                    await Event.findByIdAndDelete(eventID)
                    res.status(200).send("done");
                }
            })
           
        }catch(error){
            res.status(404).json({
                'message' : "this eventID doesn't exist"
            })
        }
    }, async getAllEvents(req,res){
        const { eventType } = req.params ;
        const query = {"sport" : eventType} || {} 
        
        try{
        const events = await Events.find(query)
        if (events){
            return res.json(events);
       }
          return res.status(404).json({
              "message" : "no events were found" 
          })

        }catch(error){
            res.status(404).json({
                'message' : 'no event type not fount'
            })
        }
      
    }, async deleteAllevents(req, res){
        await Event.deleteMany({}, function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
        
    }
}