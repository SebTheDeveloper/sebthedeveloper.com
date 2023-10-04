document.addEventListener("mousemove", parallax);
const box = document.querySelector(".box img");

function parallax(e) {
  const x = (window.innerWidth - e.pageX * 3) / 100;
  const y = (window.innerHeight - e.pageY * 3) / 100;
  box.style.transform = `translateX(${x + 50}px) translateY(${y}px)`;
}

const phoneCard = document.querySelectorAll(".phone-card");

phoneCard.forEach((card) => {
  card.addEventListener("click", () => {
    card.querySelector("a").click();
  });
});

const form = document.querySelector("form");
const successMsg = document.querySelector(".success-card");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  successMsg.style.display = "flex";
});
