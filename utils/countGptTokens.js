const tokenizerPackage = require("gpt3-tokenizer");

const GPT3Tokenizer = tokenizerPackage.default;
const tokenizer = new GPT3Tokenizer({ type: "gpt4" });

function countGptTokens(input) {
  const encoded = tokenizer.encode(input);
  const tokenCount = encoded.bpe.length;
  return tokenCount;
}

module.exports = countGptTokens;