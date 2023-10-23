require("dotenv").config();

async function createEmbedding(input) {
  try {
    const options = {
      model: "text-embedding-ada-002",
      input,
    };

    const result = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(options),
    });
    const embedding = await result.json();
    return { embedding: embedding.data[0].embedding, text: input };
  } catch (error) {
    console.error(
      `An error occured while generating the OpenAI Embedding: ${error.message}`
    );
    return null;
  }
}

module.exports = createEmbedding;
