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

app.post("/api/getuser", async (req, res) =>{
    const { username } = req.body;
    const [rows] = await pool.query("SELECT id, username FROM users WHERE username = ?",[username]);
    if(rows.length === 0){
        return res.status(404).json({ message: "User does not exist" });
    }

    return res.json({
      message: "User exist!",
      id: rows[0].id,
      username: rows[0].username
    });

});

export default app;