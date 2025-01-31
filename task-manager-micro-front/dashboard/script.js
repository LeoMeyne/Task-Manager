async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Erreur lors du chargement des projets.');

        const projects = await response.json();
        const projectsList = document.getElementById('projects-list');

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'card mb-3';
            projectCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="/tasks/?projectId=${project.id}" class="btn btn-primary">Voir les tâches</a>
                </div>
            `;
            projectsList.appendChild(projectCard);
        });
    } catch (error) {
        alert(error.message);
    }
}

fetchProjects();
