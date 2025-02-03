document.addEventListener('DOMContentLoaded', function () {
    // Gestion du formulaire de connexion
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
            // Stocke le token dans le stockage local
            localStorage.setItem('accessToken', data.accessToken);

            // Redirige vers la page Dashboard
            window.location.href = '/dashboard/';
        })
        .catch(error => {
            alert('Login failed: ' + error.message);
        });
    });

    // Gestion du formulaire d'enregistrement d'utilisateur
    document.getElementById('add-user-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const role = document.getElementById('register-role').value;

        if (!username || !password || !role) {
            alert('Please fill in all fields.');
            return;
        }

        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return response.json();
        })
        .then(data => {
            alert('User registered successfully!');
            // Ferme le modal
            const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));
            addUserModal.hide();
        })
        .catch(error => {
            alert('Registration failed: ' + error.message);
        });
    });
});
