const express = require("express");

const app = express();
const auth_router = require("./route/auth");

const connectDB = require("./utils/db");
const cros = require("cors");

const crosOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}

app.use(cros(crosOptions));
app.use(express.json());

app.use("/", auth_router)

app.get("/", (req, res)=>{
    res.status(200).send("Successful");
})

const port = 5000;

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`server running at port : ${port}`);
    });
});