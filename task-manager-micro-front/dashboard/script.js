document.addEventListener('DOMContentLoaded', async function () {

    const token = localStorage.getItem('accessToken');

    // Redirect to login if no token is found
    if (!token) {
        window.location.href = '/auth/';
        return;
    }

    try {
        // Fetch user information
        const response = await fetch('/api/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to authenticate user.');

        const user = await response.json();
        document.getElementById('welcome-message').innerText = `Hello, ${user.username}!`;
        document.getElementById('role-info').innerText = `Role: ${user.role === 'team_leader' ? 'Team Leader' : 'User'}`;

        // Fetch user projects
        const projectsResponse = await fetch('/api/projects', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const projects = await projectsResponse.json();
        const projectsList = document.getElementById('projects-list');
        const noProjectsMsg = document.getElementById('no-projects-msg');

        // Display projects if available
        if (projects.length > 0) {
            noProjectsMsg.style.display = 'none';

            projects.forEach(project => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <span>${project.name}</span>
                    <button class="btn btn-primary view-project-btn" data-project-id="${project.id}">View</button>
                `;
                projectsList.appendChild(li);
            });

            // Add event listeners to project buttons
            document.querySelectorAll('.view-project-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const projectId = this.getAttribute('data-project-id');
                    localStorage.setItem('currentProjectId', projectId);
                    window.location.href = '/projects/';
                });
            });
        } else {
            noProjectsMsg.style.display = 'block';
        }

        // Show project creation button if user is a team leader
        if (user.role === 'team_leader') {
            const createProjectBtn = document.getElementById('create-project-btn');
            createProjectBtn.style.display = 'block';

            createProjectBtn.addEventListener('click', async function () {
                const projectName = prompt('Enter project name:');
                if (!projectName) return;

                const createResponse = await fetch('/api/projects', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: projectName })
                });

                if (createResponse.ok) {
                    alert('Project created successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to create project.');
                }
            });
        }
    } catch (error) {
        alert('Error: ' + error.message);
        window.location.href = '/auth/';
    }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('accessToken');
    window.location.href = '/auth/';
});
