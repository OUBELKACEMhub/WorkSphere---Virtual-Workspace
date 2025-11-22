const worker = document.getElementById('worker');
const addworkerBtn = document.getElementById('addWorkerBtn');
const UnassignedWorker = document.getElementById('UnassignedWorker');
const descWorker = document.getElementById('descWorker');
const DefaultWorkerData = [
    {
        name: "Ahmed",
        image: "images/WhatsApp Image 2025-11-13 à 22.38.16_da362682.jpg",
        role: "Réceptionniste",
        email:"Ahmedoub78@gmail.com",
        telephone:"+21270306879",
        company: "Tech Solutions SARL",
        experiences: [
            {
                Company:"Z12",
                position: "Support IT",
                duration: "Jan 2022 - Dec 2022",
                description: "Maintenance des systèmes et assistance aux utilisateurs."
            },
            {
                Company:"Z12",
                position: "Technicien réseau",
                duration: "Jan 2023 - Present",
                description: "Gestion des infrastructures réseau et sécurité informatique."
            }
        ]
    },
    {
        name: "Khalid",
        image: "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg",
        role: "Technicien IT",
        email:"Khalid21@gmail.com",
        telephone:"+21270306974",
        company: "Tech Solutions SARL",
        experiences: [
            {
                Company:"Z12",
                position: "Support IT",
                duration: "Jan 2022 - Dec 2022",
                description: "Maintenance des systèmes et assistance aux utilisateurs."
            },
            {
                Company:"Z12",
                position: "Technicien réseau",
                duration: "Jan 2023 - Present",
                description: "Gestion des infrastructures réseau et sécurité informatique."
            }
        ]
    },
    {
        name: "Fatima",
        image: "https://blog.photofeeler.com/wp-content/uploads/2018/01/sample-linkedin-headshot-good.jpg",
        role: "Manager",
        email:"Fatima88@gmail.com",
        telephone:"+212703060577",
        company: "Tech Solutions SARL",
        experiences: [
            {
                Company:"Z12",
                position: "Support IT",
                duration: "Jan 2022 - Dec 2022",
                description: "Maintenance des systèmes et assistance aux utilisateurs."
            },
            {
                Company:"Z12",
                position: "Technicien réseau",
                duration: "Jan 2023 - Present",
                description: "Gestion des infrastructures réseau et sécurité informatique."
            }
        ]
    },
    {
        name: "Aicha",
        image: "https://media.gettyimages.com/id/1437816897/fr/photo/portrait-de-femme-daffaires-de-gestionnaire-ou-de-ressources-humaines-pour-la-r%C3%A9ussite.jpg?s=612x612&w=gi&k=20&c=tfcvEVTcJcfXTtA0rB-NbjurEVpp7N3QN9heh7Q0RuU=",
        role: "sécurité",
        email:"aich06@gmail.com",
        telephone:"+212703067426",
        company: "Tech Solutions SARL",
        experiences: [
            {
                Company:"Z12",
                position: "Support IT",
                duration: "Jan 2022 - Dec 2022",
                
                description: "Maintenance des systèmes et assistance aux utilisateurs."
            },
            {
                Company:"Z12",
                position: "Technicien réseau",
                duration: "Jan 2023 - Present",
                description: "Gestion des infrastructures réseau et sécurité informatique."
            }
        ]
    }
];
let UnassignedWorkerData = JSON.parse(localStorage.getItem("MyWorkerData"));
if (!UnassignedWorkerData) {
    UnassignedWorkerData = [...DefaultWorkerData];
    localStorage.setItem("MyWorkerData", JSON.stringify(UnassignedWorkerData));
}
function saveToLocalStorage() {
    localStorage.setItem("MyWorkerData", JSON.stringify(UnassignedWorkerData));
}

function renderWorkers() {
    UnassignedWorker.innerHTML = "";
    UnassignedWorkerData.forEach((e, index) => {
        const div = document.createElement('div');
        div.classList.add('worker-card');
        div.dataset.index = index;
        div.innerHTML = `
            
            <img src="${e.image}">
            <ul>
                <li>${e.name}</li>
                <li>${e.role}</li>
            </ul>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        UnassignedWorker.appendChild(div);
    });
}

renderWorkers();

function afficherDetail(worker) {
    if(!worker) return;
    else{
descWorker.style.position = "absolute";
descWorker.style.top = "4px";
descWorker.style.right = "41em";
descWorker.style.zIndex = "44444";
descWorker.style.color = "black";
descWorker.style.backgroundColor = "rgb(124, 133, 141)";
descWorker.style.borderRadius = "12px";
descWorker.style.padding = "20px";
descWorker.style.fontFamily = "orbitron";
descWorker.innerHTML = `
        <img src="images/icons8-close-24.png" class="deleteicon cursor-pointer">
        <div class="flex gap-2">
        <img src="${worker.image}" class="imgDescrp" onerror="this.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'">
        <ul>
            <li><strong class="orbitron">${worker.name}</strong> </li>
            <li><strong class="orbitron">${worker.role}</strong> </li>
            </ul>
        </div> 
        <br>   
        <ul>    
            <li><strong class="orbitron">Email:</strong> ${worker.email || 'unfound'}</li>
            <li><strong class="orbitron">Telephone:</strong> ${worker.telephone || 'unfound'}</li>
        </ul>
        <strong class="orbitron"><h3>Experiences:</h3></strong>
        <ul >
            ${worker.experiences && worker.experiences.length > 0 ? 
              worker.experiences.map(exp => `<li class="orbitron"><strong>${exp.position || 'Poste'}</strong> 
                (${exp.duration || ''}) 
                <br> ${exp.description || ''}
                </li>
                `).join("") 
              : "<li>Pas d'expérience</li>"}
        </ul>
    `;
              }
    
}

UnassignedWorker.addEventListener('click', (e) => {
    const card = e.target.closest('.worker-card');
    if (!card) return;
    
   
    if (e.target.classList.contains('delete')) {
        const index = card.dataset.index;
        UnassignedWorkerData.splice(index, 1); 
        
        saveToLocalStorage(); 
        
        renderWorkers(); 
        descWorker.innerHTML = "";
        return;
    }

    const index = card.dataset.index;
    afficherDetail(UnassignedWorkerData[index]);
});

descWorker.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteicon')) {
        descWorker.innerHTML = "";
        descWorker.style = "";
    }
});


addworkerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    

    worker.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form class="addForm flex flex-col gap-4 p-8 w-[700px] rounded-2xl bg-white relative h-[90vh] overflow-y-auto  text-black-200 ">
            <img src="images/icons8-close-24.png" id="closeBtn" class="absolute right-3 top-3 cursor-pointer">
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Name</label>
                <input type="text" id="name" class="p-2 rounded-lg border border-gray-700">
            </div>
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Photo URL</label>
                <input type="text" id="photo" placeholder="image URL" class="p-2 rounded-lg border border-gray-700">
                <img id="preview" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" width="100" class="mt-2 rounded shadow">
            </div>
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Role</label>
                <select id="role" class="p-2 rounded-lg border border-gray-700  text-black">
                    <option value="Réceptionniste">Réceptionniste</option>
                    <option value="Technicien IT">Technicien IT</option>
                    <option value="sécurité">sécurité</option>
                    <option value="Manager">Manager</option>
                    <option value="Nettoyage">Nettoyage</option>
                </select>
            </div>

            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Email</label>
                <input type="email" id="email" placeholder="exemple@mail.com" class="p-2 rounded-lg border border-gray-700">
            </div>
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Téléphone</label>
                <input type="text" id="phone" class="p-2 rounded-lg border b text-black">
            </div>

            <label class="font-semibold text-black text-xl mt-2">Experiences</label>
            <div id="experiences" class="flex flex-col gap-3">
                <div class="experience-item flex flex-col p-3 rounded-lg border border-black-300 bg-gray-50">
                     <label class="font-semibold text-gray-700">Company</label>
                     <input type="text" class="exp-company p-1 border rounded mb-2 text-black">
                     
                     <label class="font-semibold text-gray-700">Post</label>
                     <input type="text" class="exp-position p-1 border rounded mb-2 text-black">
                     
                     <div class="flex gap-2 text-black">
                        <div class="w-1/2">
                            <label class="font-semibold text-gray-700">From</label>
                            <input type="date" class="exp-from w-full p-1 border rounded text-black">
                        </div>
                        <div class="w-1/2">
                            <label class="font-semibold text-gray-700">To</label>
                            <input type="date" class="exp-to w-full p-1 border rounded text-black">
                        </div>
                     </div>
                     <label class="description font-semibold text-gray-700">Description</label>
                     <input type="text" class="Description p-5 border rounded mb-2 text-black">
                </div>
            </div>

            <button type="button" id="addExperienceBtn" class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow-md mt-2 ">
                + Add Experience
            </button>

            <div class="flex justify-between mt-6 border-t pt-4">
                <button id="saveBtn" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow">Save</button>
                <button type="button" id="cancelBtn" class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow">Cancel</button>
            </div>
        </form>
    </div>
    `;

    const photoInput = document.getElementById('photo');
    const preview = document.getElementById('preview');
    photoInput.addEventListener('input', (e) => {
        preview.src = e.target.value || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
    });

    const experiencesContainer = document.getElementById('experiences');
    const addExpBtn = document.getElementById('addExperienceBtn');

    addExpBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.classList.add('experience-item', 'flex', 'flex-col', 'p-3', 'rounded-lg', 'border', 'border-gray-300', 'bg-gray-50');
        div.innerHTML = `
          <label class="font-semibold text-gray-700">Company</label>
                     <input type="text" class="exp-company p-1 border rounded mb-2 text-black">
                     
                     <label class="font-semibold text-gray-700">Post</label>
                     <input type="text" class="exp-position p-1 border rounded mb-2 text-black">
                     
                     <div class="flex gap-2 text-black">
                        <div class="w-1/2">
                            <label class="font-semibold text-gray-700">From</label>
                            <input type="date" class="exp-from w-full p-1 border rounded text-black">
                        </div>
                        <div class="w-1/2">
                            <label cclass="font-semibold text-gray-700">To</label>
                            <input type="date" class="exp-to w-full p-1 border rounded text-black">
                        </div>
                     </div>
                    
                       <label class="  font-semibold text-gray-700">Description</label>
                       <input type="text" class="description p-5 border rounded mb-2 text-black">
                     
                      
             <button type="button" class="text-red-500 text-xs mt-2 self-end delete-exp hover:underline">Supprimer</button>7
                     
        `;
        
       
        div.querySelector('.delete-exp').addEventListener('click', () => div.remove());
        
        experiencesContainer.appendChild(div);
    });
    const closeForm = () => worker.innerHTML = '';


    document.getElementById('closeBtn').addEventListener('click', closeForm);
    document.getElementById('cancelBtn').addEventListener('click', closeForm);
    document.getElementById('saveBtn').addEventListener('click', (ev) => {
        ev.preventDefault();

        
        const nameVal = document.getElementById('name').value;
        const roleVal = document.getElementById('role').value;
        const photoVal = preview.src;
        const emailVal = document.getElementById('email').value;
        const phoneVal = document.getElementById('phone').value;

    
        const experienceItems = document.querySelectorAll('.experience-item');
        const collectedExperiences = [];
        experienceItems.forEach(item => {
            const company = item.querySelector('.exp-company').value;
            const position = item.querySelector('.exp-position').value;
            const fromDate = item.querySelector('.exp-from').value;
            const toDate = item.querySelector('.exp-to').value;
            const descriptionV=item.querySelector('.description').value

          
            if(company || position) {
                collectedExperiences.push({
                    company: company,
                    position: position,
                    duration: `${fromDate} - ${toDate}`,
                    description: descriptionV
                });
            }
        });

        const newWorker = {
            name: nameVal,
            image: photoVal,
            role: roleVal,
            email:emailVal,
            telephone: phoneVal, 
            company: "Tech Solutions",
            experiences: collectedExperiences,
        };
        UnassignedWorkerData.push(newWorker);
        
        saveToLocalStorage(); 

        renderWorkers(); 
        closeForm();
    });
});

function getparRole(workers, role1) {
    return workers.filter(w => w.role.includes(role1));
}

function clearTab(elemt){
   elemt.splice(1,1);
}

const workeractive=[];
function addWorkerToZone(role, element) {
    const parent = element.parentElement;
    const zone_container=parent.querySelector('.zone_container')
    const dev=parent.querySelector('.zone');
    const tab = getparRole(UnassignedWorkerData, role);
    
    /*  <p><strong>${worker.role}</strong></p>*/
    // Affichage
    tab.forEach(worker => {

        const div = document.createElement('div');
        div.classList.add('workersvaliables');
        div.innerHTML = `
             
            <img src="${worker.image}" id="img1">
            <div>
               <strong> <p >${worker.name}</p></strong>
           
            </div>
            <br>
            <img src="images/icons8-add-100.png" class="addicons">
        `;
        
        zone_container.appendChild(div);
    });
}




const zoneAddBtn = document.querySelectorAll('.zoneAddBtn');
zoneAddBtn.forEach(element => {
    element.addEventListener('click', () => {
        element.disabled = true;
        element.style.cursor = "not-allowed";
        const parent = element.parentElement;

        if (parent.classList.contains('conference')) {
             document.querySelectorAll('.zone_container').forEach(cont => {
            cont.innerHTML = "";
            cont.style = "";

           });
            addWorkerToZone("", element);
             
        } 
        else if (parent.classList.contains('Salle_archives')) {
             document.querySelectorAll('.zone_container').forEach(cont => {
            cont.innerHTML = "";
            cont.style = "";
        });
            addWorkerToZone("Manager", element);
            
        }
        else if (parent.classList.contains('sallesecurite')) {
             
            document.querySelectorAll('.zone_container').forEach(cont => {
            cont.innerHTML = "";
            cont.style = "";
        });

            addWorkerToZone("sécurité", element); 
            addWorkerToZone("Manager", element);
           
        }
        else if (parent.classList.contains('Réception')) {
            document.querySelectorAll('.zone_container').forEach(cont => {
            cont.innerHTML = "";
            cont.style = "";
            });
            addWorkerToZone("Réceptionniste", element);
            addWorkerToZone("Manager", element);
        }
        else if (parent.classList.contains('Salledesserveurs')) {
             document.querySelectorAll('.zone_container').forEach(cont => {
            cont.innerHTML = "";
            cont.style = "";
            });
            addWorkerToZone("Technicien IT", element);
            addWorkerToZone("Manager", element);
        }
   
    });
});



