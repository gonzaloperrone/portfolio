//Portfolio fetch
fetch("js/portfolio.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(portfolio => {
      document.getElementById('portfolioCards').innerHTML += `
            <div class="card projectCard">
            <img src=${portfolio.img} class="card-img-top" alt="${portfolio.name}">
            <div class="card-body">
              <h4 class="card-title">${portfolio.name}</h4>
              <small class="text-muted makeWith">${portfolio.madeWith}</small>
              <p class="card-text">${portfolio.description}</p>
              <a href="${portfolio.demo}" class="btn btn-primary" target="_blank"><i class="bi bi-globe"></i> Demo</a>
              <a href="${portfolio.code}" class="btn btn-primary" target="_blank"><i class="bi bi-code-slash"></i> Código</a>
            </div>
          </div>`
    });
  })
  .catch(error => console.log(error));

//Courses certfications
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
  .catch(error => console.log(error));

//Projects certifications
fetch("js/projectsCertifications.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(projectCertification => {
      document.getElementById('projectsCertificationsCard').innerHTML += `
            <div class="card certificationCard">
            <img src=${projectCertification.img} class="card-img-top" alt="${projectCertification.name}">
            <div class="card-body">
              <h4 class="card-title">${projectCertification.name}</h4>
              <h6>${projectCertification.platform}</h6>
              <small class="text-muted">(${projectCertification.year})</small>
             </div>
          </div>`
    });
  })
  .catch(error => console.log(error));

//Actives links scroll
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#navbar-example'
});

//Tabs
function tabs(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//EmailJs

const btn = document.getElementById('emailButton');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_9sc225f';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      Swal.fire({
        title: 'Mensaje enviado correctamente!',
        icon: 'success',
        confirmButtonColor: '#48a868',
        confirmButtonText: 'OK!'
      }).then(function(result) {
       if (result.isConfirmed) {
         clearInputs();
       }
      });
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});

function clearInputs() {
  document.getElementById('name').value = "";
  document.getElementById('lastname').value = "";
  document.getElementById('email').value = "";
  document.getElementById('message').value = "";
}