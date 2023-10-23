const agentPrompt = require("../data/prompts/agentPrompt.js");
const countGptTokens = require("../utils/countGptTokens.js");
const openaiChatRequest = require("../utils/openaiChatRequest.js");
const { performance } = require("perf_hooks");
const semanticSearch = require("../utils/semanticSearch.js");
require("dotenv").config();

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
  const searchResultsArr = await semanticSearch(questionText, 2);
  searchResultsArr.forEach((result) => {
    relevantData += result.content + "\n";
  });

  const relevantDataMessage = `[Collected Relevant Data]: ${relevantData}`;

  messages.push({
    role: "user",
    content: relevantDataMessage,
  });
  totalTokenCount += countGptTokens(relevantDataMessage);

  let startTime = performance.now();

  const completion = await openaiChatRequest({
    model: "gpt-4",
    messages,
  });

  let endTime = performance.now();
  let timeTaken = endTime - startTime;

  console.log(`INPUT TOKEN COUNT: ${totalTokenCount}
  OUTPUT TOKEN COUNT: ${countGptTokens(completion)}
  CHAT REQUEST COMPLETED AT: ${new Date().toLocaleString()}
  TIME TAKEN FOR COMPLETION: ${timeTaken} MILLISECONDS.`);

  return completion;
}

module.exports = askChatbot;
