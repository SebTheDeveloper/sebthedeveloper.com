const agentPrompt = require("../data/prompts/agentPrompt.js");
const countGptTokens = require("../utils/countGptTokens.js");
const openaiChatRequest = require("../utils/openaiChatRequest.js");
const { performance } = require("perf_hooks");
const saveChatMessages = require("../utils/saveChatMessages.js");
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
  const searchResultsArr = await semanticSearch(questionText, 3);
  searchResultsArr.forEach((result) => {
    relevantData += result.content + "\n";
  });

  const relevantDataMessage = `[Collected Relevant Data]: ${relevantData}
  (Reminder: Again, please keep your answers as short as reasonably possible given the context. Ideally responses should be between 1-2 sentences)`;

  messages.push({
    role: "user",
    content: relevantDataMessage,
  });
  totalTokenCount += countGptTokens(relevantDataMessage);

  let startTime = performance.now();

  const completion = await openaiChatRequest({
    model: "gpt-4-1106-preview",
    messages,
  });

  let endTime = performance.now();
  let timeTaken = endTime - startTime;

  console.log(`INPUT TOKEN COUNT: ${totalTokenCount}
  OUTPUT TOKEN COUNT: ${countGptTokens(completion)}
  CHAT REQUEST COMPLETED AT: ${new Date().toLocaleString()}
  TIME TAKEN FOR COMPLETION: ${timeTaken} MILLISECONDS.`);

  await saveChatMessages({ userText, agentText: [...agentText, completion] });

  return completion;
}

module.exports = askChatbot;
