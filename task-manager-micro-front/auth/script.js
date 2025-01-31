document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Connexion réussie !');
            window.location.href = '/dashboard/';
        } else {
            alert('Échec de la connexion.');
        }
    } catch (error) {
        alert('Erreur de connexion au serveur.');
    }
});
