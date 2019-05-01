import { Fetch } from './FetchService'

export const setUpWebPush = async () => {

  const requestInit: RequestInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  }
  const response: any = await new Fetch().fetch({
    path: 'webpush/publicKey',
    init: requestInit
  }).then(response => response.json())

  console.log(response)
  debugger

  if (!response.publicKey) return


  // Check for service worker
  if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
  }

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(response.publicKey)
  })
  console.log("Push Registered... subscription: ", subscription);

  // Send Push Notification

  const form = new FormData()
  form.append('subscription', JSON.stringify(subscription))

  const requestInit: RequestInit = {
    method: 'POST',
    mode: 'cors',
    body: form,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    cache: 'default'
  }
  await new Fetch().fetch({
    path: 'webpush/subscribe',
    init: requestInit
  })

  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String: any) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

}