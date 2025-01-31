document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in both fields.');
        return;
    }

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    })
    .then(data => {
        // Stocke le token dans le stockage local (ou cookies si nécessaire)
        localStorage.setItem('accessToken', data.accessToken);

        // Redirige vers la page Dashboard
        window.location.href = '/dashboard/';
    })
    .catch(error => {
        alert('Login failed: ' + error.message);
    });
});
