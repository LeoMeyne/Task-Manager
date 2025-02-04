document.addEventListener('DOMContentLoaded', function () {

    // Handle login form submission
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
            if (!response.ok) throw new Error('Invalid credentials');
            return response.json();
        })
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken);  // Store token
            window.location.href = '/dashboard/';  // Redirect to dashboard
        })
        .catch(() => alert('Login failed'));
    });

    // Handle user registration form submission
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
            if (!response.ok) throw new Error('Failed to register user');
            return response.json();
        })
        .then(() => {
            alert('User registered successfully!');
            const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));
            addUserModal.hide();  // Close modal
        })
        .catch(() => alert('Registration failed'));
    });
});
