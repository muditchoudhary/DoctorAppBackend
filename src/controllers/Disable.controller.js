async function DisableDoctor(){
    try {
        let result = await DoctorModel.updateOne(
            {_id:req.params.id},
            {
                $set:req.body
            }
            
        )
        res.status(200).json({
            message: "Doctor Diable"
        })
        
    } catch (error) {
        console.log(error);
        
    }

}