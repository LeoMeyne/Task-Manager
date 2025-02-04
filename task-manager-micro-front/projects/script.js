document.addEventListener('DOMContentLoaded', async function () {

    const projectId = localStorage.getItem('currentProjectId');
    const token = localStorage.getItem('accessToken');

    // Redirect to dashboard if token or project ID is missing
    if (!token || !projectId) {
        window.location.href = '/dashboard/';
        return;
    }

    try {
        // Fetch project details
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to load project details.');

        const project = await response.json();
        document.getElementById('project-title').innerText = project.name;

        // Display tasks
        const tasksList = document.getElementById('tasks-list');
        const noTasksMsg = document.getElementById('no-tasks-msg');

        if (project.tasks && project.tasks.length > 0) {
            noTasksMsg.style.display = 'none';
            project.tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <span>
                        <strong>${task.title}</strong>
                        <p>${task.description}</p>
                    </span>
                    <span class="badge bg-primary">${task.status.toUpperCase()}</span>
                `;
                tasksList.appendChild(li);
            });
        } else {
            noTasksMsg.style.display = 'block';
        }

        // Handle back to dashboard button click
        document.getElementById('back-to-dashboard-btn').addEventListener('click', function () {
            window.location.href = '/dashboard/';
        });

        // Handle task creation form submission
        document.getElementById('create-task-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;

            try {
                const createResponse = await fetch(`/api/projects/${projectId}/tasks`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, description })
                });

                if (!createResponse.ok) throw new Error('Failed to create task.');

                alert('Task created successfully!');
                window.location.reload();
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });

    } catch (error) {
        alert('Error: ' + error.message);
        window.location.href = '/dashboard/';
    }
});
