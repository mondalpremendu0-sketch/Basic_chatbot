
const { GoogleGenAI } = require("@google/genai");
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});

async function content(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt
  });
  return response.text;
}

module.exports = content