export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          // console.log('Service Worker registered:', registration);
        })
        .catch(() => {
          // console.log("Service Worker registration failed:", error);
        });
    });
  }
}

export function sendMessageToServiceWorker(message: any) {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}
