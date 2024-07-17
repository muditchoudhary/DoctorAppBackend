async function DeleteDoctor() {
    try {
        const result = await DoctorModel.findOneAndDelete({ _id: req.params.id })
        console.log(result)
        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        console.log(error)

    }

}