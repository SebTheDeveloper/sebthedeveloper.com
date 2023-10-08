import projectsData from "./data/projectsData.js";

const body = document.querySelector("body");
const projectModal = document.querySelector(".project-set-modal");
const logo = document.querySelector(".logo");
const nextBtn = document.querySelector(".see-next");
const exitModal = projectModal.querySelector(".exit-modal");
const main = document.querySelector(".main");
const contactForm = document.getElementById("contact");
const footer = document.querySelector("footer");

document.querySelector(".color-fade").onclick = (e) => {
  body.classList.toggle("color-mode-toggle");
  const root = document.querySelector(":root");
  // Dark mode
  if (body.classList.contains("color-mode-toggle")) {
    logo.src = "../img/SebDoubleU-icon-dark-mode.png";
    e.target.src = "../img/svg/dark-mode.svg";
    root.style.setProperty("--link-text", "var(--white)");
    root.style.setProperty("--gray", "#585858");
    root.style.setProperty("--foreground", "var(--white)");
    exitModal.style.color = "var(--white)";
  }
  // Light Mode
  else {
    logo.src = "../img/SebDoubleU-icon.png";
    e.target.src = "../img/svg/light-mode.svg";
    root.style.setProperty("--link-text", "#212529");
    root.style.setProperty("--gray", "#8297b7");
    exitModal.style.color = "var(--red)";
    root.style.setProperty("--foreground", "var(--darkGreyBlue)");
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

function backspaceEffect(element, interval) {
  return new Promise((resolve) => {
    let message = element.textContent;

    function backspace() {
      if (message.length > 1) {
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

  await typeWriterEffect(h1, "Hi, my name is Sebastian.", 70);
  await delay(1300);
  await backspaceEffect(h1, 50);
  await delay(500);
  await typeWriterEffect(h1, "ere are some projects that I've created:", 70);

  h1.classList.remove("typewriter");
  main.style.display = "block";
  footer.style.display = "block";
  document.getElementById("get-in-touch").style.display = "block";
}

executeTypewriterSequence();

let projectIndex = 0;

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
    projectInfoHtml += `<br /> <br /> <span class="label">Demo Account <span style="font-weight: 300; font-size: 0.9em">- Click to Copy:</span></span> <div class="multi-link d-flex justify-content-center flex-column">
    <div>Username: <span class="demo-account-info" onclick="copyToClipboard(event)">${demoAccount.user}</span></div>
    <div>Password: <span class="demo-account-info" onclick="copyToClipboard(event)">${demoAccount.password}</span></div>
    </div>`;
  }

  if (project.features.length > 0) {
    let formattedFeatures = "";
    for (const feature of project.features) {
      formattedFeatures += `<li>${feature}</li>`;
    }

    projectInfoHtml += `
    <br /> <br />
    <div class="divider"  style="margin: 1em 0 1.5em"></div>
    <div class="label">Features:</div>
    <ul class="features d-flex flex-column">${formattedFeatures}</ul>
    <div class="divider" style="margin-bottom: 1.5em"></div>
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
}

function onNextClick(event) {
  loadNextProject();
  event.currentTarget.removeEventListener("click", onNextClick);
}

function displayOnIntersect(elementNode, tagsToDisplay) {
  const observer = new IntersectionObserver((entries, observerInstance) => {
    if (entries[0].isIntersecting) {
      const elements = elementNode.querySelectorAll(tagsToDisplay);

      elements.forEach((element) => {
        element.style.display = "block";
      });

      observerInstance.unobserve(elementNode);
    }
  });
  observer.observe(elementNode);
}

displayOnIntersect(main.querySelector(".container"), "h2");
displayOnIntersect(contactForm, "form *");
displayOnIntersect(footer, "p");