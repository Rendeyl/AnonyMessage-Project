import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}


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

async function checkUsernames(username, password) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if(rows.length > 0){
        console.log("Username Exist");
        return false;
    }else{
        console.log("Good to go!");
        await addUser(username, password);
        return true;
    }
}

async function addUser(username, password) {
  password = await hashPassword(password);
    const [rows] = await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
}

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  try {
    const created = await checkUsernames(username, password);
    if (!created) {
      return res.status(409).json({ message: "Username already exists" });
    }
    res.json({ message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default app;