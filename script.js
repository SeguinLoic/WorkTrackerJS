// --- STORE
const containerProject = document.querySelector(".container-project");
function getStore() {
  const projectStore = localStorage.getItem("Projets");
  if (projectStore != null) {
    containerProject.innerHTML = projectStore;
  }
  return
}
getStore();


// --- VARIABLES 
const formulaire = document.getElementById("form");
const btnForm = document.querySelector("#form button");
const projectName = document.getElementById("projectName");
const projectType = document.getElementById("projectType");
const projectDate = document.getElementById("projectDate");
const btnRemoveProject = document.querySelectorAll(".remove-project");
const edit = false;


// --- EVENT LISTENER
btnForm.addEventListener("click", addProject);
btnRemoveProject.forEach(function(projet) {
	projet.addEventListener("click", removeProject);
});


// --- FUNCTIONS
function addProject(e) {
  e.preventDefault();
  if (projectName.value == "" || projectType.value == ""  ||  projectDate.value == "") {
    alert("Veuillez remplir tous les champs");
    return;
  }
  const project = document.createElement("div");
  project.classList.add("project");

  const dataProject = document.createElement("div");
  dataProject.classList.add("data-project");
  
  const name = document.createElement("span");
  name.classList.add("name");
  name.innerText = projectName.value;
  const editName = document.createElement("input");
  editName.classList.add("edit-name");
  
  const type = document.createElement("span");
  type.classList.add("type");
  type.innerText = projectType.value;
  const editType = document.createElement("select");
  editType.classList.add("edit-type");
  
  
  const date = document.createElement("span");
  date.classList.add("date");
  date.innerText = projectDate.value;
  const editDate = document.createElement("input");
  editDate.classList.add("edit-date");
  

  const navigationProject = document.createElement("div");
  navigationProject.classList.add("navigation-project");
  
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.classList.add("edit-projet");
  btnEdit.addEventListener("click", toggleEdit);

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "X"
  btnDelete.classList.add("remove-project");
  btnDelete.addEventListener("click", removeProject);
  
  dataProject.append(name);
  dataProject.append(type);
  dataProject.append(date);
  navigationProject.append(btnDelete);
  navigationProject.append(btnEdit);
  project.append(dataProject);
  project.append(navigationProject);
  containerProject.appendChild(project);
  
  store();
  
  projectName.value = "";
  projectType.value = "";
  projectDate.value = "";
}

function removeProject(e) {
	const parentProject = e.target.parentNode.parentNode;
	parentProject.remove();
	store();
}

function toggleEdit(e) {
	e.target.parentNode.parentNode.classList.toggle("edit");
	console.log(e.target.parentNode.parentNode.classList);
}

function store() {
  const projects = containerProject.innerHTML;
  localStorage.setItem("Projets", projects);
}