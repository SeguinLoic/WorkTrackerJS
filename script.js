// --- VARIABLES 
const formulaire = document.getElementById("form");
const btnForm = document.querySelector("#form button");
const projectName = document.getElementById("projectName");
const projectType = document.getElementById("projectType");
const projectDate = document.getElementById("projectDate");
const btnNavigation = document.querySelector(".btn-navigation");
const navigationTableau = document.querySelector(".navigationTableaux");
const containerProject = document.querySelector(".container-project");
const containerArchives = document.querySelector(".container-project-archives");
const filtres = document.querySelector(".filtres");
let projets = [];
let projetsArchives = [];
const edit = false;

getStore();


// --- EVENT LISTENER
btnForm.addEventListener("click", addProject);
btnNavigation.addEventListener("click", function(e){
  const parent = e.target.parentNode;
  parent.classList.toggle("actif");
})
containerProject.addEventListener("click", function(e){
  e.preventDefault();
  if (e.target.classList.contains('remove-project')){
    removeProject(e);
  }
  if (e.target.classList.contains('edit-project')){
    toggleEdit(e);
  }
  if (e.target.classList.contains('save-project')){
    saveEdit(e);
  }
});
navigationTableau.addEventListener("click", function(e){
	e.preventDefault();
	if( e.target.classList.contains("enCours")){
		containerArchives.classList.remove("actif");
    containerProject.classList.add("actif");
    navigationTableau.querySelector(".archives").classList.remove("actif");
    navigationTableau.querySelector(".enCours").classList.add("actif");

	} else if( e.target.classList.contains("archives")) {
		containerProject.classList.remove("actif");
    containerArchives.classList.add("actif");
    navigationTableau.querySelector(".archives").classList.add("actif");
    navigationTableau.querySelector(".enCours").classList.remove("actif");
	}
});
filtres.addEventListener("click", filtresProjets);


// --- ADD PROJECT
function addProject(e) {

  e.preventDefault();
  if (projectName.value == "" || projectType.value == ""  ||  projectDate.value == "") {
    alert("Veuillez remplir tous les champs");
    return;
  }

  // AJOUT PROJET AU TABLEAU
  const newProjet = {
    nom: projectName.value,
    type: projectType.value,
    date: projectDate.value,
    id: Date.now().toString()
  }
  projets.push(newProjet);
  setProject(projectName.value, projectType.value, projectDate.value, newProjet.id, containerProject); 
  setStore();
  projectName.value = "";
  projectType.value = "";
  projectDate.value = "";
}

// --- REMOVE PROJECT
function removeProject(e) {
  const parentProject = e.target.parentNode.parentNode;
  const projetsFind = projets.filter(function(obj){
    return obj.id === parentProject.id;
  })
  const firstElem = projetsFind.shift();
  projetsArchives.push(firstElem);
  console.log(projetsArchives);
  setProject(firstElem.nom, firstElem.type, firstElem.date, firstElem.id, containerArchives); 
  const projetsFiltered = projets.filter(function(obj){
    return obj.id != parentProject.id;
  })
  projets = projetsFiltered;
	parentProject.remove();
	setStore();
}

// --- SAVE EDIT
function saveEdit(e) {
  const parent = e.target.parentNode.parentNode;
  const id = parent.id;
  const index = projets.findIndex((x) => x.id === id);

  const newName = parent.querySelector(".nameEdit").value;
  const newType = parent.querySelector(".typeEdit").value;
  const newDate = parent.querySelector(".dateEdit").value;
  const newProjet = {
    nom: newName,
    type: newType,
    date: newDate, 
    id: id
  }

  parent.querySelector(".container-name .name").innerHTML = newName;
  parent.querySelector(".container-type .type").innerHTML = newType;
  parent.querySelector(".container-date .date").innerHTML = newDate.split("-").reverse().join("-");

  projets.splice(index, 1, newProjet);
  setStore();
  toggleEdit(e);
}

// --- TOGGLE EDIT PROJECT
function toggleEdit(e) {
  e.target.parentNode.parentNode.classList.toggle("edit");
  const parent = e.target.parentNode.parentNode;
  const elems = parent.querySelectorAll(".editElement");
  elems.forEach(function(elem) {
    elem.classList.toggle("hide");
  })
}

// --- SET PROJECT
function setProject(nom, type, date, id, container) {
  const formatDate = date.split("-").reverse().join("-");
  const project = document.createElement("div");
  project.classList.add("project");
  project.id = id;
  project.innerHTML = `
    <div class='data-project' >
      <span class='container-name'>
        <span class="name">${nom}</span>
        <input type="text" class="nameEdit editElement hide" value="${nom}"/>
      </span>
      <span class='container-type'>
        <span class="type">${type}</span>
        <select class="typeEdit editElement hide" value="${type}">
        <option>Home + 1 PA</option>
        <option>Pages d'Activités</option>
        <option>Modifs</option>
        <option>Refonte</option>
        <option>Reprise de parc</option>
        </select>
      </span>
      <span class='container-date'>
        <span class="date">${formatDate}</span>
        <input type="date" class="dateEdit editElement hide" value="${date}"/>
      </span>
    </div>
    <div class='navigation-project'>
      <button class='edit-project editElement'><i class="far fa-edit"></i></button>
      <button class='save-project editElement hide'><i class="fas fa-check"></i></button>
      <button class='remove-project'><i class="far fa-trash-alt"></i></button>
    </div>
  `;
  container.appendChild(project);
}

// --- FILTRES
function filtresProjets(e){
  const dataFiltre = e.target.dataset.filtre;
  if (dataFiltre == "nom") {
    projets.sort((a, b) => (a.nom > b.nom) ? 1 : ((b.nom > a.nom) ? -1 : 0));
  }
  if (dataFiltre == "type") {
    projets.sort((a, b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));
  }
  if (dataFiltre == "date") {
    projets.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  containerProject.innerHTML = "";
  projets.forEach(function(projet) {
    setProject(projet.nom, projet.type, projet.date, projet.id, containerProject); 
  });
}

// --- SET STORE
function setStore() {
  localStorage.setItem("Projets", JSON.stringify(projets));
  localStorage.setItem("Archives", JSON.stringify(projetsArchives));
}

// --- GET STORE
function getStore() {
  const projectStore = JSON.parse(localStorage.getItem("Projets"));
  const projectArchivesStore = JSON.parse(localStorage.getItem("Archives"));
  if (projectStore != null) {
    projectStore.forEach(function(projet) {
      projets.push(projet);
      setProject(projet.nom, projet.type, projet.date, projet.id, containerProject); 
    })
  }
  if (projectArchivesStore != null) {
    projectArchivesStore.forEach(function(projetArchive) {
      projetsArchives.push(projetArchive);
      setProject(projetArchive.nom, projetArchive.type, projetArchive.date, projetArchive.id, containerArchives); 
    })
  }
  return
}