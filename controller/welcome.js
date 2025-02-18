const welcome= (req, res)=>{
    try{
        return res.json({message: "Welcome to Lean In @5 API!"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}
module.exports={
    welcome
}