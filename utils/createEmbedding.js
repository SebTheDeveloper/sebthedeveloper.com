async function createEmbedding(input, openai) {
  const embeddingResponse = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input,
  });
  const [{ embedding }] = embeddingResponse.data.data;
  return { embedding, text: input };
}

module.exports = createEmbedding;
