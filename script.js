// --- VARIABLES 
const formulaire = document.getElementById("form");
const btnForm = document.querySelector("#form button");
const projectName = document.getElementById("projectName");
const projectType = document.getElementById("projectType");
const projectDate = document.getElementById("projectDate");
const containerProject = document.querySelector(".container-project");
let projets = [];
const edit = false;

getStore();


// --- EVENT LISTENER
btnForm.addEventListener("click", addProject);
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
  setProject(projectName.value, projectType.value, projectDate.value, newProjet.id); 
  setStore();
  projectName.value = "";
  projectType.value = "";
  projectDate.value = "";
}

// --- REMOVE PROJECT
function removeProject(e) {
  const parentProject = e.target.parentNode.parentNode;
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
  parent.querySelector(".container-date .date").innerHTML = newDate;

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
function setProject(nom, type, date, id) {
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
        <span class="date">${date}</span>
        <input type="text" class="dateEdit editElement hide" value="${date}"/>
      </span>
    </div>
    <div class='navigation-project'>
      <button class='edit-project'>Edit</button>
      <button class='save-project editElement hide'>Save</button>
      <button class='remove-project'>X</button>
    </div>
  `;
  containerProject.appendChild(project);
}

// --- SET STORE
function setStore() {
  localStorage.setItem("Projets", JSON.stringify(projets));
}

// --- GET STORE
function getStore() {
  const projectStore = JSON.parse(localStorage.getItem("Projets"));
  if (projectStore != null) {
    projectStore.forEach(function(projet) {
      projets.push(projet);
      setProject(projet.nom, projet.type, projet.date, projet.id); 
    })
  }
  return
}