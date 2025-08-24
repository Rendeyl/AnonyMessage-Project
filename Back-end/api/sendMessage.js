import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://anonymessagex.vercel.app",   
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const pool = mysql.createPool({
  host: process.env.HOST, 
  user: process.env.USER, 
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: Number(process.env.PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }
});

app.post("/api/sendmessage", async (req, res) => {
    const {content, id_sent} = req.body
    try{
        const [rows] = await pool.query("INSERT INTO messages (content, id_sent) VALUES(?, ?)",[content, id_sent]);
        res.status(200).json({ message: "Message sent successfully!" });
    }catch (err){
        console.log("ERROR: " + err);
        res.status(500).json({ message: "Server error" });
    }
});

export default app;