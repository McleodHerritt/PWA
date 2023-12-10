const butInstall = document.getElementById("buttonInstall");

// let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  console.log("The beforeinstallprompt event has been fired.");
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    console.log("The deferred prompt is not available.");
    return;
  }

  console.log("The deferred prompt is available.");

  promptEvent.prompt();

  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log(
    "The appinstalled event has been fired. The PWA was installed.",
    event
  );
  window.deferredPrompt = null;
});

if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("This is running as a standalone PWA.");
} else {
  console.log("This is not running as a standalone PWA.");
}
