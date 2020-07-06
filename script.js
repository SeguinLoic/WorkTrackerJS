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
    saveEdit();
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
    id: Date.now()
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
  console.log("save");
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
function setProject(nom, type, date) {
  const project = document.createElement("div");
  project.classList.add("project");
  project.id = Date.now();
  project.innerHTML = `
    <div class='data-project'>
      <span class='name'>
        ${nom}
        <input type="text" class="nameEdit editElement hide" value="${nom}"/>
      </span>
      <span class='type'>
        ${type}
        <input type="text" class="typeEdit editElement hide" value="${type}"/>
      </span>
      <span class='date'>
        ${date}
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
      setProject(projet.nom, projet.type, projet.date); 
    })
  }
  return
}