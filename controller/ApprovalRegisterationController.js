const Registeration = require('../Models/Registration');
const jwt = require('jsonwebtoken');
module.exports = {
async approveRequest (req , res){
    console.log("approve ");
    const { registerationId } = req.params ;
    console.log("iddd = " + registerationId);
   try {
      jwt.verify(req.token, 'secret', async (err, authData) => {
      if(err){
        return res.status(400).json({message : `error occured ${err}`});s
      }
      const registeration = await Registeration.findById(registerationId);
      if(!registeration){
        return res.status(400).json({"message" : "no registeration was found"});
      }
      registeration.approved = true;
      await registeration.save();
     
      console.log(registeration);
      return res.status(200).json(registeration);
    });

   }catch(err){
       throw Error (`the error is ${err}`);
   }
}
};