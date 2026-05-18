
const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});
async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile
            }
        },
        { text: "Caption this image." }
    ];
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
            systemInstruction: `You are the expert in generating caption form image.
      Your caption should be shot and concise.
      Use hashtags and emojis.
      Write it more professional way`
        }
    });
    return response.text;
}

module.exports = generateCaption;
