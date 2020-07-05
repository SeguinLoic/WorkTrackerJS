// --- STORE
const containerProject = document.querySelector(".container-project");

function getStore() {

  const projectStore = JSON.parse(localStorage.getItem("Projets"));
  if (projectStore != null) {

    projectStore.forEach(function(projet) {
      const project = document.createElement("div");
      project.classList.add("project");
    
      project.innerHTML = `
      <div class='data-project'>
        <span class='name'>
          ${projet.nom}
          <input type="text" class="nameEdit"/>
        </span>
        <span class='type'>
          ${projet.type}
          <input type="text" class="typeEdit"/>
        </span>
        <span class='date'>
          ${projet.date}
          <input type="text" class="dateEdit"/>
        </span>
      </div>
      <div class='navigation-project'>
        <button class='edit-project'>Edit</button>
        <button class='remove-project'>X</button>
      </div>
      `;
      containerProject.append(project);
    })
    
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
const projets = [];
const edit = false;


// --- EVENT LISTENER
btnForm.addEventListener("click", addProject);
containerProject.addEventListener("click", function(e){
  e.preventDefault();
  if (e.target.classList.contains('remove-project')){
    removeProject(e);
  }

  console.log(e.target);
});


// --- FUNCTIONS
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
    id: Date.now(),
    edit: false
  }
  projets.push(newProjet);

  const project = document.createElement("div");
  project.classList.add("project");

  project.innerHTML = `
    <div class='data-project'>
      <span class='name'>
        ${projectName.value}
        <input type="text" class="nameEdit"/>
      </span>
      <span class='type'>
        ${projectType.value}
        <input type="text" class="typeEdit"/>
      </span>
      <span class='date'>
        ${projectDate.value}
        <input type="text" class="dateEdit"/>
      </span>
    </div>
    <div class='navigation-project'>
      <button class='edit-project'>Edit</button>
      <button class='remove-project'>X</button>
    </div>
  `;

  /*const dataProject = document.createElement("div");
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
  */

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
  localStorage.setItem("Projets", JSON.stringify(projets));
}