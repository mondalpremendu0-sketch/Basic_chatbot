require('dotenv').config();
const app = require('./src/app.js'); // Assuming this exists
const { createServer } = require("http");
const { Server } = require("socket.io");
const content = require('./src/service/ai.service.js'); // Assuming this exists

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    // Allow both 5173 (Vite) and standard React (3000) or strict wildcard
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    methods: ['GET', 'POST']
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
  console.log("Server running at http://127.0.0.1:3000/");
});
