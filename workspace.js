const worker = document.getElementById('worker');
const addworkerBtn = document.getElementById('addWorkerBtn');
const UnassignedWorker = document.getElementById('UnassignedWorker');
const descWorker = document.getElementById('descWorker');

let currentActiveBtn = null;
let currentActiveRole = null;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const DefaultWorkerData = [...data];
                    localStorage.setItem("MyWorkerData", JSON.stringify(DefaultWorkerData));

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

        function updateCurrentZone() {
            if (currentActiveBtn && currentActiveRole !== null) {
                addWorkerToZone(currentActiveRole, currentActiveBtn, UnassignedWorkerData);
            }
        }

        function afficherDetail(worker) {
            if (!worker) return;
            
            descWorker.style.position = "absolute";
            descWorker.style.top = "0.2em";
            descWorker.style.right = "41em";
            descWorker.style.zIndex = "44444";
            descWorker.style.color = "black";
            descWorker.style.backgroundColor = "rgb(124, 133, 141)";
            descWorker.style.borderRadius = "0.9em";
            descWorker.style.padding = "1.2em";
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

        UnassignedWorker.addEventListener('click', (e) => {
            const card = e.target.closest('.worker-card');
            if (!card) return;

            if (e.target.classList.contains('delete')) {
                const index = card.dataset.index;
                UnassignedWorkerData.splice(index, 1);

                saveToLocalStorage();
                renderWorkers();
                descWorker.innerHTML = "";
                descWorker.style = "";
                
                updateCurrentZone();
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
        function addworkerForm() {
            addworkerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                worker.innerHTML = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <form class="addForm flex flex-col gap-4 p-8 w-[700px] rounded-2xl bg-white relative h-[90vh] overflow-y-auto text-black-200 ">
                        <img src="images/icons8-close-24.png" id="closeBtn" class="absolute right-3 top-3 cursor-pointer">
                        
                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Name</label>
                            <input type="text" id="name" class="p-2 rounded-lg border text-black-200">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Photo URL</label>
                            <input type="text" id="photo" placeholder="image URL" class="p-2 rounded-lg border text-black-200">
                            <img id="preview" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" width="100" class="mt-2 rounded shadow">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Role</label>
                            <select id="role" class="p-2 rounded-lg border border-gray-700 text-black-200">
                                <option value="Réceptionniste">Réceptionniste</option>
                                <option value="Technicien IT">Technicien IT</option>
                                <option value="sécurité">sécurité</option>
                                <option value="Manager">Manager</option>
                                <option value="Nettoyage">Nettoyage</option>
                            </select>
                        </div>

                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Email</label>
                            <input type="email" id="email" placeholder="exemple@mail.com" class="p-2 rounded-lg border text-black">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Téléphone</label>
                            <input type="text" id="phone" class="p-2 rounded-lg border b text-black">
                        </div>

                        <label class="font-semibold text-black text-xl mt-2">Experiences</label>
                        <div id="experiences" class="flex flex-col gap-3">
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
                                <label class="font-semibold text-gray-700">To</label>
                                <input type="date" class="exp-to w-full p-1 border rounded text-black">
                            </div>
                        </div>
                        
                        <label class="font-semibold text-gray-700">Description</label>
                        <input type="text" class="description p-5 border rounded mb-2 text-black">
                        
                        <button type="button" class="text-red-500 text-xs mt-2 self-end delete-exp hover:underline">Supprimer</button>
                    `;
                    div.querySelector('.delete-exp').addEventListener('click', () => div.remove());
                    experiencesContainer.appendChild(div);
                });

                const closeForm = () => worker.innerHTML = '';
                document.getElementById('closeBtn').addEventListener('click', closeForm);
                document.getElementById('cancelBtn').addEventListener('click', closeForm);
                
                document.getElementById('saveBtn').addEventListener('click', (ev) => {
                    ev.preventDefault();

                    const namev = document.getElementById('name').value;
                    const rolev = document.getElementById('role').value;
                    const photov = preview.src;
                    const emailv = document.getElementById('email').value;
                    const phonev = document.getElementById('phone').value;

                    const experienceItems = document.querySelectorAll('.experience-item');
                    const collectedExperiences = [];
                    experienceItems.forEach(item => {
                        const company = item.querySelector('.exp-company').value;
                        const position = item.querySelector('.exp-position').value;
                        const fromDate = item.querySelector('.exp-from').value;
                        const toDate = item.querySelector('.exp-to').value;
                        const descriptionV = item.querySelector('.description').value;

                        if (company || position) {
                            collectedExperiences.push({
                                company: company,
                                position: position,
                                duration: `${fromDate} - ${toDate}`,
                                description: descriptionV
                            });
                        }
                    });

                    const newWorker = {
                        name: namev,
                        image: photov,
                        role: rolev,
                        email: emailv,
                        telephone: phonev,
                        experiences: collectedExperiences,
                    };
                    UnassignedWorkerData.push(newWorker);
                    saveToLocalStorage();
                    renderWorkers();
                    closeForm(); 
                    updateCurrentZone();
                });
            });
        }
        addworkerForm();

        function getparRole(workers, role1) {
            if (!role1 || role1 === "") return workers;
            return workers.filter(w => w.role.includes(role1));
        }
        

        function addWorkerToZone(role, btnElement, Data) {
            const parent = btnElement.parentElement;
            const zoneContainer = parent.querySelector('.zone_container');

            // Filter workers
            const tab = getparRole(UnassignedWorkerData, role);
            zoneContainer.innerHTML = "";

            tab.forEach(worker => {
                const div = document.createElement('div');
                div.classList.add('workersvaliables');
                div.innerHTML = `
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${worker.image}" style="width:40px; height:40px; object-fit:cover; border-radius:50%;">
                        <div>
                            <strong>${worker.name}</strong>
                            <p>${worker.role}</p>
                        </div>
                    </div>
                    <img src="images/icons8-add-100.png" class="addicons" style="cursor:pointer;">
                `;

                const addIcon = div.querySelector('.addicons');

                addIcon.addEventListener('click', () => {
                    assignWorkerToActiveZone(worker, parent, div);

                    const indexToDelete = UnassignedWorkerData.findIndex(w => w.name === worker.name);
                    if (indexToDelete !== -1) {
                        UnassignedWorkerData.splice(indexToDelete, 1);
                    
                        saveToLocalStorage();
                        renderWorkers();
        
                        div.remove();
                    }
                });

                zoneContainer.appendChild(div);
            });
        }
        function assignWorkerToActiveZone(workerData, zoneParent, workerDiv) {
            let activeZone = zoneParent.querySelector('.zone_active');
            if (!activeZone) {
                activeZone = document.createElement('div');
                activeZone.classList.add('zone_active');
                activeZone.style.marginTop = "0.6em";
                activeZone.style.borderTop = "2px dashed #333";
                activeZone.style.paddingTop = "0.6em";
                zoneParent.appendChild(activeZone);
            }

            const activeDiv = document.createElement('div');
            activeDiv.classList.add('active-worker-card');
            activeDiv.innerHTML = `
                <img src="${workerData.image}" style="width:65px; height:60px; border-radius:50%; border:4px solid green;">
                <span style="font-size:12px; font-weight:bold;">${workerData.name}</span>
            `;
            activeDiv.classList.add('activeDiv');
            activeZone.classList.add('zone_activeStyle');
            activeZone.appendChild(activeDiv);
        }

        const zoneAddBtn = document.querySelectorAll('.zoneAddBtn');

        function filterZone() {
            zoneAddBtn.forEach(element => {
                element.addEventListener('click', () => {
                    zoneAddBtn.forEach(btn => {
                        btn.disabled = false;
                        btn.style.cursor = "pointer";
                        btn.style.opacity = "1";
                        const p = btn.parentElement;
                        const c = p.querySelector('.zone_container');
                        if (c) c.innerHTML = "";
                    });

                    element.disabled = true;
                    element.style.cursor = "not-allowed";
                    element.style.opacity = "0.5";

                    currentActiveBtn = element;

                    const parent = element.parentElement;
                    let roleToFilter = "";

                    if (parent.classList.contains('conference')) {
                        roleToFilter = "";
                    } else if (parent.classList.contains('Salle_archives')) {
                        roleToFilter = "Manager";
                    } else if (parent.classList.contains('sallesecurite')) {
                        roleToFilter = "sécurité";
                    } else if (parent.classList.contains('Réception')) {
                        roleToFilter = "Réceptionniste";
                    } else if (parent.classList.contains('Salledesserveurs')) {
                        roleToFilter = "Technicien IT";
                    } else if (parent.classList.contains('Salledupersonnel')) {
                        roleToFilter = "";
                    }
                    currentActiveRole = roleToFilter;

                    addWorkerToZone(roleToFilter, element, UnassignedWorkerData);
                });
            });
        }
        
        filterZone();
    });