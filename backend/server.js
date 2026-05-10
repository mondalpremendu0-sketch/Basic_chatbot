require('dotenv').config();
const app = require('./src/app.js'); // Assuming this exists
const { createServer } = require("http");
const { Server } = require("socket.io");
const content = require('./src/service/ai.service.js'); // Assuming this exists

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://basic-chatbot-theta.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id); // Log ID to confirm unique connections

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });

  socket.on("prompt", async (prompt) => {
    try {
        const response = await content(prompt);
    console.log("Received prompt:", prompt);
        socket.emit("response", response);
    } catch (error) {
        console.error("AI Error:", error);
        socket.emit("response", "Error generating response");
    }
  });
});

httpServer.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
