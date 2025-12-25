document.documentElement.classList.add("js");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

const revealSections = document.querySelectorAll(".reveal");

revealSections.forEach((section) => {
  observer.observe(section);
});

setTimeout(() => {
  revealSections.forEach((section) => section.classList.add("visible"));
}, 2500);

const audio = document.querySelector("#bg-audio");
const toggleButton = document.querySelector("[data-audio-toggle]");

const setButtonState = (isPlaying) => {
  toggleButton.classList.toggle("is-playing", isPlaying);
  toggleButton.textContent = isPlaying ? "Pausar música" : "Tocar música";
};

if (audio && toggleButton) {
  setButtonState(false);

  toggleButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        setButtonState(true);
      } catch (error) {
        setButtonState(false);
      }
    } else {
      audio.pause();
      setButtonState(false);
    }
  });

  audio.addEventListener("play", () => setButtonState(true));
  audio.addEventListener("pause", () => setButtonState(false));
}
