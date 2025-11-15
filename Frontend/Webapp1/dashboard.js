// Character Movement Logic
const character = document.getElementById("character");
const btn = document.getElementById("animateBtn");

let moving = false;
let direction = 1;
let position = 20;

// Idle animation
character.classList.add("idle");

btn.addEventListener("click", () => {
  if (moving) return;
  moving = true;

  character.classList.remove("idle"); // stop idle animation while moving

  const interval = setInterval(() => {
    position += 4 * direction;

    character.style.left = position + "px";

    // Flip sprite when switching direction
    if (direction === 1) {
      character.style.transform = "scaleX(1)";
    } else {
      character.style.transform = "scaleX(-1)";
    }

    // Hit right edge
    if (position >= (character.parentElement.clientWidth - 120)) {
      direction = -1;
    }

    // Hit left edge
    if (position <= 0) {
      direction = 1;
    }

  }, 40); // ~25 FPS

  // Stop after 5 seconds
  setTimeout(() => {
    clearInterval(interval);
    moving = false;
    character.classList.add("idle"); // resume idle animation
  }, 5000);
});

// Example XP bar fill (you'll update dynamically later)
document.getElementById("xpBar").style.width = "60%";
