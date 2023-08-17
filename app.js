const express =require("express")
const app= new express()
const router = require("./src/router/api")
require("dotenv").config()
const mongoose =require('mongoose');

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const hpp =require('hpp');
const cors =require('cors');

app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const limiter = rateLimit({
	// ...
	handler: (request, response, next, options) => {
		if (request.rateLimit.current === request.rateLimit.limit + 1) {
			// onLimitReached code here
		}
		response.status(options.statusCode).send(options.message)
	},
})
app.use(limiter);



mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Success")
}).catch((err)=> console.log(err))


app.use("/api/v1",router)

app.use("*",(req,res)=>{
    res.status(404).json({status:'Fail',data:"Not Found"})
})

module.exports=app