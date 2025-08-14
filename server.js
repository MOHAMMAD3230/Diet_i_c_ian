import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const apiRes = await fetch("open-ai21.p.rapidapi.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.X-Rapidapi-Key}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });
    
    const data = await apiRes.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.json({ reply: "Error connecting to AI." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
