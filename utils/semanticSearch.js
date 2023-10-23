const pool = require("../models/db.js");
const createEmbedding = require("./createEmbedding.js");

async function semanticSearch(input, limit = 3) {
  const { embedding } = await createEmbedding(input);
  const similaritySearch = await pool.query(
    `SELECT content, 1 - (embedding <=> '[${embedding}]') AS cosine_similarity FROM documents ORDER BY cosine_similarity DESC LIMIT ${limit}`
  );

  return similaritySearch.rows;
}

module.exports = semanticSearch;
