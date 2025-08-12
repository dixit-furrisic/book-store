import express from "express"
import "dotenv/config"
import { connectDb } from "./lib/db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import bookRoutes from "./routes/book.route.js"

const app = express()

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 3000


app.use("/api/auth", authRoutes)
app.use("/api/book", bookRoutes)

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectDb()
})
