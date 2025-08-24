import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

app.post("/api/login", async (req, res) => {
    const { username, password} = req.body;
    
    if(!username || !password){
        return res.status(400).json({message: "Empty Fields"});
    }

    try{
        const [rows] = await pool.query("SELECT id, username, password FROM users WHERE username = ?",
            [username]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid Login" });
        }

        const valid = await bcrypt.compare(password, rows[0].password);
        
        if(!valid){
            res.status(400).json({ message: "Invalid Login" });
            return;
        }

        const token = jwt.sign({id: rows[0].id, username: rows[0].username},
            process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.cookie("token", token, {
             httpOnly: true,
             sameSite: "none",
             secure: true
        })
        return res.json({
            message: "Succes",
            id: rows[0].id,
            username: rows[0].username,
        });

        /*
         if(!valid){
            res.status(400).json({ message: "Invalid Login" });
        }else{
            return res.json({ redirect: `/user/${username}` });
        }
        */

    }catch (err){
        console.log("ERROR: " + err);
        res.status(500).json({ message: "Server error" });
    }
});

export default app;