const agentPrompt = require("../data/prompts/agentPrompt.js");
const countGptTokens = require("../utils/countGptTokens.js");
const openaiRequest = require("../utils/openaiRequest.js");
const { performance } = require("perf_hooks");
require("dotenv").config();

async function askChatbot(questionText, chatHistory) {
  let startTime = performance.now();

  const messages = [];
  const initialPrompt = agentPrompt();
  let totalTokenCount = countGptTokens(initialPrompt);

  messages.push({
    role: "system",
    content: initialPrompt,
  });

  const userText = chatHistory.userTextList;
  const agentText = chatHistory.agentTextList;
  if (userText.length > 0) {
    for (let i = 0; i < userText.length; i++) {
      messages.push({
        role: "assistant",
        content: agentText[i],
      });
      totalTokenCount += countGptTokens(agentText[i]);

      messages.push({
        role: "user",
        content: userText[i],
      });
      totalTokenCount += countGptTokens(userText[i]);
    }
  }

  const relevantData = `There is none at the moment.`;
  const relevantDataMessage = `[Collected Relevant Data]: ${relevantData}`;

  messages.push({
    role: "user",
    content: relevantDataMessage,
  });
  totalTokenCount += countGptTokens(relevantDataMessage);

  console.log(`INPUT TOKEN COUNT: ${totalTokenCount}`);

  console.log(`MESSAGES: ${JSON.stringify(messages)}`);

  const completion = await openaiRequest({
    model: "gpt-4",
    messages,
  });
  console.log(`output token count: ${countGptTokens(completion)}`);

  let endTime = performance.now();
  let timeTaken = endTime - startTime;
  console.log(`Time taken for the API request: ${timeTaken} milliseconds.`);

  return completion;
}

module.exports = askChatbot;
