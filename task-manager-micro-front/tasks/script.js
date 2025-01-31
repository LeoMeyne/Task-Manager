const projectId = new URLSearchParams(window.location.search).get('projectId');

async function fetchTasks() {
    try {
        const response = await fetch(`/api/projects/${projectId}/tasks`);
        if (!response.ok) throw new Error('Erreur lors du chargement des tâches.');

        const tasks = await response.json();
        const tasksList = document.getElementById('tasks-list');

        tasksList.innerHTML = '';
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'card mb-3';
            taskCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <span class="badge bg-info">${task.status}</span>
                </div>
            `;
            tasksList.appendChild(taskCard);
        });
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById('add-task').addEventListener('click', () => {
    window.location.href = `/tasks/create.html?projectId=${projectId}`;
});

fetchTasks();
