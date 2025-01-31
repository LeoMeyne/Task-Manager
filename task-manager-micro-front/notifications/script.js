const notificationsList = document.getElementById('notifications-list');

// Simuler des notifications en temps réel avec un intervalle de 5 secondes
setInterval(() => {
    const notification = document.createElement('div');
    notification.className = 'alert alert-info';
    notification.innerText = `Nouvelle notification à ${new Date().toLocaleTimeString()}`;
    notificationsList.prepend(notification);
}, 5000);
