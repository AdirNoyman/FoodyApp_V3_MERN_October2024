import express, {Request, Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

const app = express()

// Connect to the Database

// MIDDLEWARE
app.use(express.json())
app.use(cors())

app.get("/", async (req: Request, res: Response) => {

    res.json({message: "Hello Adiros 🤓"})

})

try {   

    mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    console.log("Connected successfully to the database 😎🤘")
    app.listen(7001, () => {

        console.log("Server started on localhost:7000 🚀")
    })
} catch (error) {

    console.log("Error starting the app 😫 ", error)
    
}
