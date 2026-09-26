// A guided preview. Signing happens in the desktop app; the downloadable
// example was generated and verified with the same Rust core.
const steps = [
  { heading: "Start with your words.", copy: "Write in Presskeep, open a Markdown file, or bring over posts from a Substack export or public feed. Your imported writing starts as private drafts.", caption: "YOUR DRAFT / YOUR DEVICE", file: "the-work.md", badge: "A work in progress", next: "Next: make it yours" },
  { heading: "Put your name to it.", copy: "Publish a self-contained HTML edition with your publication’s signature. Presskeep saves the original on your Mac before sending copies anywhere.", caption: "YOUR ORIGINAL / SIGNED EDITION", file: "the-work.presskeep.html", badge: "✓ Signed · Version 1", next: "Next: let it travel" },
  { heading: "Give it a life of its own.", copy: "Send the file, make archive copies, and share your follow code. Readers can verify your words wherever they find them, then save a copy for later.", caption: "YOUR WORDS / MORE PLACES", file: "the-work.presskeep.html", badge: "Same file. Same signature.", next: "Take the tour again" },
];
const tabs = [...document.querySelectorAll("[data-step]")];
const nextButton = document.querySelector("#tour-next");
let currentStep = 0;

function showStep(index, focusTab = false) {
  currentStep = index;
  const step = steps[index];
  tabs.forEach((tab, tabIndex) => {
    tab.setAttribute("aria-selected", String(tabIndex === index));
    tab.tabIndex = tabIndex === index ? 0 : -1;
  });
  const panel = document.querySelector("#tour-stage");
  panel.setAttribute("aria-labelledby", tabs[index].id);
  panel.dataset.stage = String(index);
  for (const [id, value] of Object.entries({
    "tour-heading": step.heading, "tour-copy": step.copy,
    "tour-caption": step.caption, "tour-file": step.file,
    "tour-badge": step.badge, "tour-number": `0${index + 1}`,
  })) document.getElementById(id).textContent = value;
  nextButton.firstChild.textContent = `${step.next} `;
  if (focusTab) tabs[index].focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showStep(index));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    showStep(next, true);
  });
});
nextButton.addEventListener("click", () => showStep((currentStep + 1) % steps.length));
document.querySelector("#year").textContent = String(new Date().getFullYear());
