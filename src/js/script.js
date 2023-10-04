import projectsData from "./data/projectsData.js";

const body = document.querySelector("body");
const projectModal = document.querySelector(".project-set-modal");
const logo = document.querySelector(".logo");
const nextBtn = document.querySelector(".see-next");
const exitModal = projectModal.querySelector(".exit-modal");
const main = document.querySelector(".main");
const footer = document.querySelector("footer");
const getInTouch = document.querySelector("#get-in-touch");

document.querySelector(".color-fade").onclick = (e) => {
  body.classList.toggle("color-mode-toggle");
  const root = document.querySelector(":root");
  // Dark mode
  if (body.classList.contains("color-mode-toggle")) {
    logo.src = "../img/SebDoubleU-icon-dark-mode.png";
    e.target.src = "../img/svg/dark-mode.svg";
    root.style.setProperty("--link-text", "var(--white)");
    root.style.setProperty("--gray", "#585858");
    exitModal.style.color = "var(--white)";
  }
  // Light Mode
  else {
    logo.src = "../img/SebDoubleU-icon.png";
    e.target.src = "../img/svg/light-mode.svg";
    root.style.setProperty("--link-text", "#212529");
    root.style.setProperty("--gray", "#8297b7");
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

  if (project.liveProjectLink) {
    projectInfoHtml += `<br /> <br /> <span class="label">Live Project Link:</span> <a href="${project.liveProjectLink}" target="_blank">click to view</a>`;
  }

  if (project.githubLink) {
    projectInfoHtml += `<br /> <br /> <span class="label">GitHub Link:</span> <a href="${project.githubLink}" target="_blank">click to view</a>`;
  }

  projectInfoHtml += `
  <div class="d-flex align-items-center justify-content-center mt-4">
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

const observer = new IntersectionObserver((entries, observerInstance) => {
  if (entries[0].isIntersecting) {
    const footerPTags = footer.querySelectorAll("p");

    footerPTags.forEach((p) => {
      p.style.display = "block";
    });

    observerInstance.unobserve(footer);
  }
});
observer.observe(footer);
