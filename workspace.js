const worker = document.getElementById('worker');
const addworkerBtn = document.getElementById('addWorkerBtn');
const UnassignedWorker = document.getElementById('UnassignedWorker');
const descWorker = document.getElementById('descWorker');

const WorkerData = [
    {
        name: "Ahmed",
        image: "images/WhatsApp Image 2025-11-13 à 22.38.16_da362682.jpg",
        role: "Réceptionniste",
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
        role: "Agent de sécurité",
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

let UnassignedWorkerData = [...WorkerData]; 

function renderWorkers() {
    UnassignedWorker.innerHTML = "";
    UnassignedWorkerData.forEach((e, index) => {
        const div = document.createElement('div');
        div.classList.add('worker-card');
        div.dataset.index = index;
        div.innerHTML = `
            <img src="images/icons8-close-24.png" class="img2">
            <img src="${e.image}" onerror="this.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'">
            <ul>
                <li>${e.name}</li>
                <li>${e.role}</li>
            </ul>
            <button class="edit">Edit</button>
        `;
        UnassignedWorker.appendChild(div);
    });
}

renderWorkers();

function afficherDetail(worker) {
    if(!worker) return;
    descWorker.innerHTML = `
        <img src="images/icons8-close-24.png" class="deleteicon">
        <img src="${worker.image}" class="imgDescrp">
        <ul>
            <li><strong>Name:</strong> ${worker.name}</li>
            <li><strong>Role:</strong> ${worker.role}</li>
            <li><strong>Company:</strong> ${worker.company || 'N/A'}</li>
        </ul>
        <strong><h3>Experiences:</h3></strong>
        <ul>
            ${worker.experiences && worker.experiences.length > 0 ? 
              worker.experiences.map(exp => `<li><strong>${exp.position || 'Poste'}</strong> (${exp.duration || ''}) <br> ${exp.description || ''}</li>`).join("") 
              : "<li>Pas d'expérience</li>"}
        </ul>
    `;
}

UnassignedWorker.addEventListener('click', (e) => {
    const card = e.target.closest('.worker-card');
    if (!card) return;
    
    if (e.target.classList.contains('img2')) {
        const index = card.dataset.index;
        UnassignedWorkerData.splice(index, 1); 
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
    }
});


addworkerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // 1. Injecter l-HTML dyal Formulaire
    worker.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form class="addForm flex flex-col gap-4 p-8 w-[700px] rounded-2xl bg-white relative h-[90vh] overflow-y-auto  text-black-200 ">
            <img src="images/icons8-close-24.png" id="closeBtn" class="absolute right-3 top-3 cursor-pointer">
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Name</label>
                <input type="text" id="name" class="p-2 rounded-lg border border-gray-300">
            </div>
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Photo URL</label>
                <input type="text" id="photo" placeholder="image URL" class="p-2 rounded-lg border border-gray-300">
                <img id="preview" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" width="100" class="mt-2 rounded shadow">
            </div>
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Role</label>
                <select id="role" class="p-2 rounded-lg border border-gray-300">
                    <option value="Réceptionniste">Réceptionniste</option>
                    <option value="Technicien IT">Technicien IT</option>
                    <option value="Agent de sécurité">Agent de sécurité</option>
                    <option value="Manager">Manager</option>
                    <option value="Nettoyage">Nettoyage</option>
                </select>
            </div>

            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Email</label>
                <input type="email" id="email" placeholder="exemple@mail.com" class="p-2 rounded-lg border border-gray-300">
            </div>
            
            <div class="flex flex-col">
                <label class="font-semibold text-gray-700">Téléphone</label>
                <input type="text" id="phone" class="p-2 rounded-lg border border-gray-300">
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
                            <label cclass="font-semibold text-gray-700">To</label>
                            <input type="date" class="exp-to w-full p-1 border rounded text-black">
                        </div>
                     </div>
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
             <button type="button" class="text-red-500 text-xs mt-2 self-end delete-exp hover:underline"></button>
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

          
            if(company || position) {
                collectedExperiences.push({
                    company: company,
                    position: position,
                    duration: `${fromDate} - ${toDate}`,
                    description: "..." 
                });
            }
        });

        
        const newWorker = {
            name: nameVal,
            image: photoVal,
            role: roleVal,
            phone: phoneVal, 
            company: "Tech Solutions",
            experiences: collectedExperiences
        };
        UnassignedWorkerData.push(newWorker);
        renderWorkers();
        
        closeForm();
    });
});

function getparRole(workers, role1) {
    return workers.filter(w => w.role.includes(role1));
}

function addWorkerToZone(roleString, element) {
    const parent = element.parentElement;
    
    const tab = getparRole(UnassignedWorkerData, roleString);
    
    // Affichage
    tab.forEach(worker => {
        const div = document.createElement('div');
        div.classList.add('workersvaliables', 'flex', 'items-center', 'gap-2', 'mt-1');
        div.innerHTML = `
            <img src="${worker.image}" class="w-8 h-8 rounded-full">
            <div class="text-xs">
                <p class="font-bold">${worker.name}</p>
                <p>${worker.role}</p>
            </div>
        `;
        parent.appendChild(div);
    });
}

const zoneAddBtn = document.querySelectorAll('.zoneAddBtn');

zoneAddBtn.forEach(element => {
    element.addEventListener('click', () => {
        const parent = element.parentElement;
        
        if (parent.classList.contains('conference')) {
            addWorkerToZone("", element); 
        } 
        else if (parent.classList.contains('Salle_archives')) {
            addWorkerToZone("Manager", element);
        }
        else if (parent.classList.contains('sallesecurite')) {
            addWorkerToZone("Agent de sécurité", element); 
        }
        else if (parent.classList.contains('Réception')) {
            addWorkerToZone("Réceptionniste", element);
        }
        else if (parent.classList.contains('Salledesserveurs')) {
            addWorkerToZone("Technicien IT", element);
        }
    });
});