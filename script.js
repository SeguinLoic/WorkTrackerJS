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
const form = document.getElementById("form");
const btnForm = document.querySelector("#form button");
const projectName = document.getElementById("projectName");
const projectType = document.getElementById("projectType");
const projectDate = document.getElementById("projectDate");


// --- EVENT LISTENER
btnForm.addEventListener("click", addProject);


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
  
  const type = document.createElement("span");
  type.classList.add("type");
  type.innerText = projectType.value;
  
  const date = document.createElement("span");
  date.classList.add("date");
  date.innerText = projectDate.value;

  const navigationProject = document.createElement("div");
  navigationProject.classList.add("navigation-project");

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "X"
  btnDelete.classList.add("remove-project");
  
  dataProject.append(name);
  dataProject.append(type);
  dataProject.append(date);
  navigationProject.append(btnDelete);
  project.append(dataProject);
  project.append(navigationProject);
  containerProject.appendChild(project);
  
  store();
  
  projectName.value = "";
  projectType.value = "";
  projectDate.value = "";
}

function store() {
  const projects = containerProject.innerHTML;
  localStorage.setItem("Projets", projects);
}