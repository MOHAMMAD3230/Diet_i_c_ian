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
    const apiRes = await fetch("https://open-ai21.p.rapidapi.com/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
      },
      body: JSON.stringify({
        question: userMessage
      })
    });

    const data = await apiRes.json();
    res.json({ reply: data.answer || "No reply from AI." });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Error connecting to AI API." });
  }
});

    
    const data = await apiRes.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.json({ reply: "Error connecting to AI." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));



POST /conversationgpt35 HTTP/1.1
X-Rapidapi-Key: 30cbe4bc30msh5fdcf92c4fd37b1p1c022fjsncc0f1842bb0a
X-Rapidapi-Host: open-ai32.p.rapidapi.com
Content-Type: application/json
Host: open-ai32.p.rapidapi.com
Content-Length: 67

{"messages":[{"role":"user","content":"hello"}],"web_access":false}
