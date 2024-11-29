const express= require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const authRoutes = require("./routes/auth.route")

const app = express();
dotenv.config();
PORT = process.env.PORT || 7999;
app.use(express.json());


app.use("/api/auth", authRoutes);


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err)=>{
    console.error(err);
});


