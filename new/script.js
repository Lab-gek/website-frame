

const light = document.getElementById('light');
const roomPosition = {
    'top': document.getElementById('darkness').offsetTop,
    'left': document.getElementById('darkness').offsetLeft
};

const topMargin = roomPosition.top + (window.innerHeight * Math.random());
const position = {
    left:  Math.random() * roomPosition.left,
    top: topMargin + 150 < window.innerHeight ? topMargin : topMargin - 350
};

function update(e) {

    var x = ( e.clientX - 250) || (e.touches[0].clientX - 250); //50% of size
    var y = (e.clientY - 250) || (e.touches[0].clientY - 250);

    light.style.left = x + "px";
    light.style.top = y + "px";

}

document.addEventListener('mousemove', update);
document.addEventListener('touchmove', update);


const projects = [];

fetch('projects.json')// fetch the data from the json file (cards for display)
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('portfolio-grid');
        data.forEach(project => {
            projects.push(project);
            for (let i = 0; i < 2; i++) {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project';
                projectDiv.dataset.id = project.id;
                projectDiv.dataset.type = project.type;
                projectDiv.dataset.date = project.date;
                projectDiv.innerHTML = `
                        <h2>${project.title}</h2>
                        <p>${project.description}</p>
                         `;
                projectDiv.style.order = Math.floor(Math.random() * 100);
                grid.appendChild(projectDiv);
                console.log(projectDiv);

            }
        });
        document.querySelectorAll('.project').forEach(project => project.style.display = 'block');
    });

let openedProjects = [];

window.sortProjects = function(criteria) {
    const sortedProjects = [...document.querySelectorAll('.project')].sort((a, b) => {
        return a.dataset[criteria] > b.dataset[criteria] ? 1 : -1;
    });
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';
    grid.appendChild(document.querySelector('.dark-overlay'));
    sortedProjects.forEach(project => grid.appendChild(project));
}


//over view card
document.addEventListener('click', (e) => {
    if (e.target.closest('.project')) {
        const projectId = e.target.closest('.project').dataset.id;
        openedProjects.push(projectId);

        const modal = document.getElementById('projectModal');
        const modalDetails = document.getElementById('modalDetails');
        const project = projects.find(p => p.id === projectId);
        modalDetails.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description} Dit valt in de catogorie; ${project.type}</p>
                ${project.htmldata}
                <p>Datum: ${project.date}</p>
            `;
        modal.style.display = 'block';

        if (openedProjects.filter(id => id === projectId).length === 2) {
            const pairFoundSound = document.getElementById('pairFoundSound');
            pairFoundSound.play();
            document.querySelectorAll(`.project[data-id="${projectId}"]`).forEach(element => {
                element.classList.add('found');
            });
            openedProjects = openedProjects.filter(id => id !== projectId);
        }
    }

    if (e.target.classList.contains('close') || e.target.closest('.modal')) {
        document.getElementById('projectModal').style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target === document.getElementById('projectModal')) {
        document.getElementById('projectModal').style.display = 'none';
    }
}

