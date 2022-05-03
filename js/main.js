fetch("js/projects.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(project => {
            document.getElementById('portfolioCards').innerHTML += `
            <div class="card">
            <img src=${project.img} class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title">${project.name}</h4>
              <small class="text-muted makeWith">${project.madeWith}</small>
              <p class="card-text">${project.description}</p>
              <a href="${project.demo}" class="btn btn-primary" target="_blank"><i class="bi bi-globe"></i> Demo</a>
              <a href="${project.code}" class="btn btn-primary" target="_blank"><i class="bi bi-code-slash"></i> Código</a>
            </div>
          </div>`
        });
    })
    .catch(error => console.log(error))