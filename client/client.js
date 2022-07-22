const publicVapidKey = 'BF-whiyD5q65SpZLY5rAyIvSpvcU4cVYPcCCcvB4IMi9EyEWEMi9VilHExDuWrFlLXVWMjpgbId9hVmMS_BwgDQ';


//Check for service worker
if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));

}

//Register Service Worker, Register Push, Send Push
async function send() {
    console.log('Registering service worker...');
    const register = navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service Worker Registered...');

    //Regitser Push
    console.log('Registering Push...');
    const subscription = await (await register).pushManager.subscribe({
        userVisibility: true,
        applicationserviceKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered...');

    //Send Notification

    console.log('Sending Push...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }

    });
    console.log('Push Sent...');


}

function urlBase64ToUint8Array(base64String) {
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