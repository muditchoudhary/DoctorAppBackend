export async function UserRegister(req, res) {
    try {
        const user = new UserModel({
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
        });
        const result = await user.save();
        return res.status(200).json({
          result
        })
      } catch (error) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
}
export async function DoctorRegiter(req,res){
    try {
		const doctor = new DoctorModel({
		  fullName: req.body.fullName,
		  email: req.body.email,
		  password: req.body.password,
		  speciality: req.body.speciality
		});
		const result = await doctor.save();
		return res.status(200).json({
		  result
		})
	  } catch (error) {
		return res.status(500).json({
		  message: "Internal Server Error",
		});
	  }

}