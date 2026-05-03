const apiKey = "AIzaSyAupjzmYWk_AArldJcCoXislpGuqHKbYF0";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
  const response = await fetch(url);
  const data = await response.json();
  
  console.log("Available Models:");
  data.models.forEach(model => {
    if (model.supportedGenerationMethods.includes("generateContent")) {
      console.log(`- ${model.name}`);
    }
  });
}

listModels();
