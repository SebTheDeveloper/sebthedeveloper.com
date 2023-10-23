import projectsData from "./data/projectsData.js";
import chatbot from "./chatbot.js";

const body = document.querySelector("body");
const loadingCircle = document.querySelector(".loading-circle");
const projectModal = document.querySelector(".project-set-modal");
const logo = document.querySelector(".logo");
const nextBtn = document.querySelector(".see-next");
const exitModal = projectModal.querySelector(".exit-modal");
const main = document.querySelector(".main");
const contactFormWrapper = document.getElementById("contact");
const footer = document.querySelector("footer");

let projectIndex = 0;

document.querySelector(".color-fade").onclick = (e) => {
  body.classList.toggle("color-mode-toggle");
  const root = document.querySelector(":root");
  const h1 = document.querySelector("h1");
  const chatWrapper = document.querySelector(".chat-wrapper");

  // Dark mode
  if (body.classList.contains("color-mode-toggle")) {
    logo.src = "../img/SebDoubleU-icon-dark-mode.png";
    e.target.src = "../img/svg/dark-mode.svg";
    root.style.setProperty("--link-text", "var(--white)");
    root.style.setProperty("--gray", "#585858");
    root.style.setProperty("--foreground", "var(--white)");
    chatWrapper.style.setProperty("--chatBackground", "var(--localGrey)");
    h1.style.setProperty(
      "--psuedoBackground",
      "rgba(0, 29, 73, var(--backgroundOpacity, 0))"
    );
    exitModal.style.color = "var(--white)";
  }
  // Light Mode
  else {
    logo.src = "../img/SebDoubleU-icon.png";
    e.target.src = "../img/svg/light-mode.svg";
    root.style.setProperty("--link-text", "#212529");
    root.style.setProperty("--gray", "#8297b7");
    root.style.setProperty("--foreground", "var(--darkGreyBlue)");
    chatWrapper.style.setProperty("--chatBackground", "rgb(15,15,15)");
    h1.style.setProperty(
      "--psuedoBackground",
      "rgba(191, 209, 236, var(--backgroundOpacity, 0))"
    );
    exitModal.style.color = "var(--red)";
  }
  document
    .querySelector(".btn-outline-secondary")
    .classList.toggle("dark-mode-button");
  document.querySelectorAll(".link-dark").forEach((element) => {
    element.classList.toggle("header-links");
  });
};

// Default to dark mode
document.querySelector(".color-fade").click();

function typeWriterEffect(element, message, interval) {
  return new Promise((resolve) => {
    let index = 0;

    function type() {
      if (index < message.length) {
        element.textContent += message.charAt(index);
        index++;
        setTimeout(type, interval);
      } else {
        resolve();
      }
    }

    type();
  });
}

function backspaceEffect(element, interval, stopBackspaceIndex) {
  return new Promise((resolve) => {
    let message = element.textContent;

    function backspace() {
      if (message.length > stopBackspaceIndex) {
        message = message.substring(0, message.length - 1);
        element.textContent = message;
        setTimeout(backspace, interval);
      } else {
        resolve();
      }
    }

    backspace();
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executeTypewriterSequence() {
  const h1 = document.querySelector("h1");
  h1.classList.add("typewriter");

  await typeWriterEffect(h1, "Hi, my name is Sebastian.", 50);
  await delay(1350);
  await backspaceEffect(h1, 45, 1);
  await delay(500);
  await typeWriterEffect(h1, "ere are some projects that I've created:", 50);

  h1.classList.remove("typewriter");
  h1.style.setProperty("--backgroundOpacity", "0.4");

  showMain();
}

executeTypewriterSequence();

function showMain(toggleList = null) {
  main.style.display = "block";
  setTimeout(() => {
    if (!toggleList) {
      main.style.opacity = "1";
    } else {
      toggleShowList(toggleList, { show: true });
    }
  }, 200);

  footer.style.display = "block";
  document.getElementById("get-in-touch").style.display = "block";
}
function hideMain() {
  main.style.display = "none";
  main.style.opacity = "0";

  footer.style.display = "none";
  document.getElementById("get-in-touch").style.display = "none";
  loadingCircle.style.display = "none";
}

function loadNextProject() {
  if (projectIndex === projectsData.length - 1) {
    projectIndex = 0;
    updateCurrentProject();
  } else {
    projectIndex++;
    updateCurrentProject();
  }
}

nextBtn.addEventListener("click", () => {
  loadNextProject();
});

updateCurrentProject();

projectModal.style.display = "none";
document.querySelectorAll(".view-project-btn").forEach((element) => {
  element.onclick = () => {
    if (body.classList.contains("color-mode-toggle")) {
      projectModal.style.backgroundColor = "rgb(8, 8, 8)";
    } else {
      projectModal.style.backgroundColor = "rgb(243, 243, 243)";
    }
    document.querySelector("html").style.overflowY = "hidden";
    projectModal.style.overflowY = "scroll";
    projectModal.style.display = "flex";
    updateCurrentProject();
  };
});

projectModal.addEventListener("click", (e) => {
  const contentClasses = [".curr-project", ".project-card-bottom", ".see-next"];

  if (
    !e.target.matches(contentClasses.join(", ")) &&
    !e.target.closest(contentClasses.join(", "))
  ) {
    projectModal.style.overflowY = "hidden";
    document.querySelector("html").style.overflowY = "scroll";

    projectModal.classList.add("fade");
    projectModal.addEventListener("animationend", () => {
      if (projectModal.classList.contains("fade")) {
        projectModal.style.display = "none";
      }
      projectModal.classList.remove("fade");
    });
  }
});

function updateCurrentProject() {
  const project = projectsData[projectIndex];

  document.querySelectorAll("h2").forEach((h2) => {
    h2.textContent = project.title;
  });

  document.querySelector(".img-carousel").src = project.img;
  document.querySelector(".curr-project").src = project.img;
  document.querySelector(".curr-num").textContent = `0${projectIndex + 1}`;

  let projectInfoHtml = `
  <br />
  <span class="label">Project Type:</span> ${project.projectType}
  <br /> <br />
  <span class="label">Tools & Technologies:</span> ${project.tech}
  `;

  if (Array.isArray(project.liveProjectLink)) {
    let formattedPreviewLinks = "";
    project.liveProjectLink.forEach((link) => {
      formattedPreviewLinks += `<a href="${link.href}" target="_blank">${link.name}</a>`;
    });

    projectInfoHtml += `<br /> <br /> <span class="label">Demo Project Links:</span> <div class="multi-link d-flex justify-content-center flex-column">${formattedPreviewLinks}</div>`;

    let formattedGithubLinks = "";
    project.liveProjectLink.forEach((link) => {
      formattedGithubLinks += `<a href="${link.github}" target="_blank">${link.name} | <strong>Github</strong></a>`;
    });

    projectInfoHtml += `<br /> <span class="label">GitHub Links:</span> <div class="multi-link d-flex justify-content-center flex-column">${formattedGithubLinks}</div>`;
  } else {
    const isDemo =
      project.liveProjectLink.startsWith("/demos") || project.demoAccount;
    projectInfoHtml += `<br /> <br /> <span class="label">${
      isDemo ? "Demo Project" : "Live Project"
    } Link:</span> <a href="${project.liveProjectLink}" target="_blank">${
      isDemo ? "View Demo" : project.liveProjectLink.replace("https://", "")
    }</a>`;

    if (project.githubLink) {
      projectInfoHtml += `<br /> <br /> <span class="label">GitHub Link:</span> <a href="${
        project.githubLink
      }" target="_blank">${project.githubLink.replace("https://", "")}</a>`;
    }
  }

  const demoAccount = project.demoAccount;
  if (demoAccount) {
    let accountInfo = `
    <div>Username: <span class="demo-account-info" onclick="copyToClipboard(event)">${demoAccount.user}</span></div>
    <div>Password: <span class="demo-account-info" onclick="copyToClipboard(event)">${demoAccount.password}</span></div>`;

    if (demoAccount.adminDashboard) {
      accountInfo += `<div>Admin Dashboard: <a class="demo-account-info" href="${
        demoAccount.adminDashboard
      }" target="_blank">${demoAccount.adminDashboard.replace(
        "https://",
        ""
      )}</a></div>
      </div>`;
    }

    projectInfoHtml += `<br /> <br /> <span class="label">Demo Account <span style="font-weight: 300; font-size: 0.9em">- Click to Copy:</span></span> <div class="multi-link d-flex justify-content-center flex-column">
    ${accountInfo}
    </div>`;
  }

  if (project.features.length > 0) {
    let formattedFeatures = "";
    for (const feature of project.features) {
      formattedFeatures += `<li>${feature}</li>`;
    }

    projectInfoHtml += `
    <div class="divider"  style="margin: 3em 0 1.5em"></div>
    <div class="label">Features:</div>
    <ul class="features d-flex flex-column">${formattedFeatures}</ul>
    ${
      project.title === "Sensory Play Days on Ezer Farm"
        ? `<br />
        <em>A live demo of this project will be available at <a href="https://ezerfarmtn.com" target="_blank">EzerFarmTN.com</a> until the Summer of 2024. The production site is set to launch afterward.</em>
        <br /><br />`
        : ""
    }
    <div class="divider" style="margin: 1.5em 0 3em"></div>
    `;
  }

  if (project.videoUrl) {
    projectInfoHtml += `
    <div class="video-wrapper d-flex flex-column">
      <span class="label mb-3">Video Preview:</span>
      <video autoplay muted loop>
      <source src="${project.videoUrl}" type="video/mp4">
      Your browser does not support the video tag.
      </video>
    </div>
  `;
  }

  projectInfoHtml += `
  <div class="d-flex align-items-center justify-content-center mt-5">
  <button class="see-next btn btn-primary">View Next Project</button>
  </div>`;

  document.querySelector(".project-info").innerHTML = projectInfoHtml;

  const seeNextBtn = projectModal.querySelector(".see-next");
  seeNextBtn.addEventListener("click", onNextClick);

  if (projectModal.style.display != "none") {
    const modalTopID = document.getElementById("modal-top");
    modalTopID.scrollIntoView({ behavior: "smooth" });
  }
}

function onNextClick(event) {
  loadNextProject();
  event.currentTarget.removeEventListener("click", onNextClick);
}

function onTransitionEnd() {
  hideMain();

  window.removeEventListener("wheel", preventDefault, { passive: false });
  window.removeEventListener("touchmove", preventDefault, { passive: false });
  main.removeEventListener("transitionend", onTransitionEnd);
}

function afterScroll() {
  if (window.scrollY === 0) {
    window.removeEventListener("scroll", afterScroll);
    main.addEventListener("transitionend", onTransitionEnd);
  }
}

function preventDefault(e) {
  e.preventDefault();
}

function setOpacityOnIntersect(elementNode, tagsToDisplay) {
  const elementsToObserve = elementNode.querySelectorAll(tagsToDisplay);

  const observerCallback = (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        observerInstance.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0,
  });

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
}

setOpacityOnIntersect(footer, ".container > span");
setOpacityOnIntersect(footer, "#contact");
setOpacityOnIntersect(footer, ".contact-info");

const observerCallback = (entries, observerInstance) => {
  if (entries[0].isIntersecting) {
    entries[0].target.querySelector(".chat-wrapper").style.display = "flex";
    observerInstance.unobserve(entries[0].target);

    const remToPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const topOfH3 = document.querySelector(".chat-wrapper h3").offsetTop;
    const adjustedPosition = topOfH3 - 16 * remToPx;

    window.scrollTo({
      top: adjustedPosition,
      behavior: "smooth",
    });
  }
};
const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
observer.observe(document.getElementById("chat-area"));

// Contact Form submit
const formElement = contactFormWrapper.querySelector("form");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formDataObject = formDataToObject(formData);

  const top = document.getElementById("top");

  window.addEventListener("wheel", preventDefault, { passive: false });
  window.addEventListener("touchmove", preventDefault, { passive: false });
  loadingCircle.style.display = "flex";

  try {
    const response = await fetch("/get-in-touch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}: ${data.message || "Error"}`
      );
    }

    top.scrollIntoView({ behavior: "smooth" });
    loadingCircle.style.display = "none";
    window.addEventListener("scroll", afterScroll);

    const firstMessage = `Thanks for reaching out, ${data.name}.`;
    const endingMessage = "I look forward to speaking with you soon.";
    excecuteTypewriterResponseMessage(firstMessage, endingMessage);
  } catch (error) {
    console.error(`Form Error: ${error}`);
    top.scrollIntoView({ behavior: "smooth" });

    const firstMessage = "There was an error submitting the form.";
    const endingMessage = "Please try sending another message.";
    excecuteTypewriterResponseMessage(firstMessage, endingMessage);
  }

  formElement.reset();
});

function formDataToObject(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

async function excecuteTypewriterResponseMessage(message, endingMessage = "") {
  const h1 = document.querySelector("h1");
  h1.classList.add("typewriter");

  const getInTouch = document.querySelector(".col-md-3.text-end a");

  const toggleList = [
    { element: main },
    { element: footer },
    { element: getInTouch, onlyPointerEvents: true },
  ];

  toggleShowList(toggleList, { show: false });
  h1.style.setProperty("--backgroundOpacity", "0");

  await backspaceEffect(h1, 60, 0);
  await delay(500);
  await typeWriterEffect(h1, message, 65);

  if (endingMessage !== "") {
    await delay(2000);
    await backspaceEffect(h1, 60, 0);
    await delay(500);
    await typeWriterEffect(h1, endingMessage, 65);
    await delay(200);
  }

  h1.classList.remove("typewriter");

  showMain(toggleList);
  h1.style.setProperty("--backgroundOpacity", "0.4");
}

function toggleShowList(list, { show }) {
  list.forEach(({ element, onlyPointerEvents = false }) => {
    if (show) {
      if (onlyPointerEvents) {
        element.style.pointerEvents = "all";
      } else {
        element.style.opacity = "1";
        element.style.pointerEvents = "all";
      }
    } else {
      if (onlyPointerEvents) {
        element.style.pointerEvents = "none";
      } else {
        element.style.opacity = "0";
        element.style.pointerEvents = "none";
      }
    }
  });
}

chatbot();
