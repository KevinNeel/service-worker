const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!")
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API")
    }
}

const registerSW = async () => {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
            .then(function (registration) {
                console.log(registration);
                
                console.log('Registration successful, scope is:', registration.scope);
            }).catch(function (err) {
                console.log('Service worker registration failed, error:', err);
            });
    }
    // const registration = await navigator.serviceWorker.register('../sw.js');
    // return registration;
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    }

}

export const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    /* eslint-disable no-restricted-globals */
    await registerSW()
}
