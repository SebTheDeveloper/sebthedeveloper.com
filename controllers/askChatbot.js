const agentPrompt = require("../data/prompts/agentPrompt.js");
const countGptTokens = require("../utils/countGptTokens.js");
const openaiRequest = require("../utils/openaiRequest.js");
const { performance } = require("perf_hooks");
require("dotenv").config();

const snippets = require("../data/portfolio_snippets/snippets.js");

async function askChatbot(questionText, chatHistory) {
  const messages = [];
  const initialPrompt = agentPrompt();
  let totalTokenCount = countGptTokens(initialPrompt);

  messages.push({
    role: "system",
    content: initialPrompt,
  });

  const agentText = chatHistory.agentTextList;
  const userText = chatHistory.userTextList;

  if (userText.length > 0) {
    for (let i = 0; i < userText.length; i++) {
      if (agentText.length < userText.length) {
        if (agentText[i]) {
          messages.push({
            role: "user",
            content: userText[i],
          });
          totalTokenCount += countGptTokens(userText[i]);

          messages.push({
            role: "assistant",
            content: agentText[i],
          });
          totalTokenCount += countGptTokens(agentText[i]);
        } else {
          messages.push({
            role: "user",
            content: userText[i],
          });
          totalTokenCount += countGptTokens(userText[i]);
        }
      } else {
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
  }

  let relevantData = "";
  snippets.forEach((snippet, index) => {
    if (index <= 1) {
      relevantData += snippet + "\n";
    }
  });
  const relevantDataMessage = `[Collected Relevant Data]: ${relevantData}`;

  messages.push({
    role: "user",
    content: relevantDataMessage,
  });
  totalTokenCount += countGptTokens(relevantDataMessage);

  let startTime = performance.now();

  console.log("MESSAGES:", JSON.stringify(messages));

  const completion = await openaiRequest({
    model: "gpt-3.5-turbo",
    messages,
  });
  console.log(`INPUT TOKEN COUNT: ${totalTokenCount}`);
  console.log(`OUTPUT TOKEN COUNT: ${countGptTokens(completion)}`);

  let endTime = performance.now();
  let timeTaken = endTime - startTime;
  console.log(`Time taken for the API request: ${timeTaken} milliseconds.`);

  return completion;
}

module.exports = askChatbot;
