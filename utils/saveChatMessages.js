const pool = require("../models/db.js");

function insertChatLog(messages) {
  const timestamp = new Date();
  const query = "INSERT INTO chat_log (timestamp, messages) VALUES ($1, $2)";
  const values = [timestamp, JSON.stringify(messages)];

  return pool.query(query, values);
}

module.exports = insertChatLog;
