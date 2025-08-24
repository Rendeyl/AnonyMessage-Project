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

app.get("/api/loadMessages", async (req, res) => {
  const { id } = req.query;
  try {
    const [rows] = await pool.query(
      "SELECT id, content, id_sent FROM messages WHERE id_sent = ?", [ id ]);
    res.json(rows);
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }
});

export default app;