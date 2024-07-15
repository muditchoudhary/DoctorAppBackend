import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("Hello world!");
});




app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
