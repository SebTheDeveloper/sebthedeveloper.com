const pool = require("../models/db.js");
const createEmbedding = require("../utils/createEmbedding.js");

async function processNewData(text) {
  try {
    const newEmbedding = await createEmbedding(text);
    const insertedEmbeddings = await pool.query(
      `INSERT INTO documents (content, embedding) VALUES ($1, $2) RETURNING *`,
      [newEmbedding.text, `[${newEmbedding.embedding}]`]
    );
    return insertedEmbeddings;
  } catch (err) {
    console.error(err.stack);
    return null;
  }
}

const snippets = require("../data/portfolio_snippets/snippets.js");
snippets.forEach((snippet) => {
  processNewData(snippet);
});
