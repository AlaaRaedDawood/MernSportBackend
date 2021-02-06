const Registeration = require('../Models/Registration');
const jwt = require('jsonwebtoken');

module.exports = {
async rejectRequest (req , res){

    const { registerationId } = req.params ;
    console.log(registerationId);
   try {
    jwt.verify(req.token, 'secret', async (err, authData) => {
      if(err){
        return res.status(400).json({message : `error occured ${err}`});s
      }
      //const registeration = await Registeration.findByIdAndUpdate(registerationId , {approved : true})
      const registeration = await Registeration.findById(registerationId);
      if(!registeration){
        return res.status(400).json({"message" : "the error occured"});
      }
      registeration.approved = false;
      await registeration.save();
      return res.status(200).json(registeration);
      
    })
   }catch(err){
       throw Error (`the error is ${err}`);
   }
}
};