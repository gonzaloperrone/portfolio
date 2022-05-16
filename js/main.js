fetch("js/projects.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(project => {
            document.getElementById('portfolioCards').innerHTML += `
            <div class="card projectCard">
            <img src=${project.img} class="card-img-top" alt="${project.name}">
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

    fetch("js/certifications.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(certification => {
            document.getElementById('certificationsCard').innerHTML += `
            <div class="card certificationCard">
            <img src=${certification.img} class="card-img-top" alt="${certification.name}">
            <div class="card-body">
              <h4 class="card-title">${certification.name}</h4>
              <h6>${certification.platform}</h6>
              <small class="text-muted">(${certification.year})</small>
             </div>
          </div>`
        });
    })
    .catch(error => console.log(error))