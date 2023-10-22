function processQuestionForm(e) {
  e.preventDefault();

  const questionText = e.target.querySelector('[name="question"]').value;
  if (questionText.trim() === "") return;

  const submitButton = e.target.querySelector('[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
  }

  const chatWrapper = document.querySelector(".chat-wrapper");

  document.querySelector(
    ".user:last-of-type"
  ).innerHTML = `<p>${questionText}</p>`;

  const chatHistory = {
    userTextList: [],
    agentTextList: [],
  };

  const userTextDomNodes = document.querySelectorAll(".chat-wrapper .user p");
  const agentTextDomNodes = document.querySelectorAll(".chat-wrapper .agent p");

  const NODE_LIMIT = 4;
  let limitHistoryLength = userTextDomNodes.length >= NODE_LIMIT + 1;

  function processMessages(nodeList, targetList, limitLength) {
    const startIndex = limitHistoryLength ? nodeList.length - limitLength : 0;

    for (let i = startIndex; i < nodeList.length; i++) {
      targetList.push(nodeList[i].textContent.trim().replace(/\s{3,}/g, "  "));
    }
  }

  processMessages(userTextDomNodes, chatHistory.userTextList, NODE_LIMIT);
  processMessages(agentTextDomNodes, chatHistory.agentTextList, NODE_LIMIT - 1);

  const loadingAgent = document.createElement("div");
  loadingAgent.classList.add("agent");
  loadingAgent.innerHTML = `
  <img
    src="img/profile-picture.jpg"
    alt="Sebastian's Profile Picture"
  />
  <p>
    <span class="loading">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  </p>`;

  chatWrapper.appendChild(loadingAgent);

  (async function askChatbot() {
    const response = await fetch("/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionText, chatHistory }),
    });
    const { chatbotResponse } = await response.json();

    const parsedChatbotResponse = replaceATagTarget(chatbotResponse);

    loadingAgent.innerHTML = `
    <img
      src="img/profile-picture.jpg"
      alt="Sebastian's Profile Picture"
    />
    <p style="fade-in 0.3s ease-in-out">
      ${parsedChatbotResponse}
    </p>`;

    const newUserForm = document.createElement("div");
    newUserForm.classList.add("user");
    newUserForm.innerHTML = `<form>
      <input
        required
        type="text"
        name="question"
        placeholder="ask a question"
        oninvalid="setCustomValidity('Please enter a question')"
        oninput="setCustomValidity('')"
        minlength="2"
      />
      <button type="submit">Submit</button>
    </form>`;

    chatWrapper.appendChild(newUserForm);
  })();
}

function replaceATagTarget(inputString) {
  return inputString.replace(/<a href=["'](http[^"']+)["']/g, (match, href) => {
    if (match.includes("target=")) {
      return match;
    }
    return `<a href="${href}" target="_blank"`;
  });
}

function chatbot() {
  const chatWrapper = document.querySelector(".chat-wrapper");

  chatWrapper.addEventListener("submit", function (e) {
    if (e.target.matches(".user form")) {
      processQuestionForm(e);
    }
  });
}

export default chatbot;
