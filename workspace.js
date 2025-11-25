const worker = document.getElementById('worker');
const addworkerBtn = document.getElementById('addWorkerBtn');
const UnassignedWorker = document.getElementById('UnassignedWorker');
const descWorker = document.getElementById('descWorker');

let currentActiveBtn = null;
let currentActiveRole = null;
let cuurentmax=null;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const DefaultWorkerData = [...data];
        
        // const tab=DefaultWorkerData.filter("")
        localStorage.setItem("MyWorkerData", JSON.stringify(DefaultWorkerData));
        let UnassignedWorkerData = JSON.parse(localStorage.getItem("MyWorkerData"));
        

////////////////////////////////>    function saveToLocalStorage  

        function saveToLocalStorage() {
            localStorage.setItem("MyWorkerData", JSON.stringify(UnassignedWorkerData));
        }
        function CountNumberOfWorkers(zone){
            const container = zone.querySelector('.zone_active'); 
            const count=container.children.length;
            return count;    
        }   
        
        

//////////////////////////////////>function updateZoneColor() 

function updateZoneColor() {
            const zones = document.querySelectorAll('.zones');
            zones.forEach(element => {
                const container = element.querySelector('.zone_active'); 
                let count = 0;
                if (container) {
                    count = container.children.length;
                }
                if (count === 0  && (element.classList.contains('Salle_archives')||element.classList.contains('Salledesserveurs')||element.classList.contains('Réception')||element.classList.contains('sallesecurite'))) {
                    element.style.backgroundColor = "rgba(220, 38, 38, 0.3)"; 
                    element.style.border = "2px dashed red";
                } else {
                    element.style.backgroundColor = "transparent";
                    element.style.border = "none";
                  

                }
            });  
        }
     
/////////////////////////////////>fonction  renderWorkers()
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
                    
                    <button class="delete">Delete</button>
                `;
                UnassignedWorker.appendChild(div);
            });
        }

        renderWorkers();
        updateZoneColor();


////////////////////////////////////////////// updateCurrentZone()     
        function updateCurrentZone() {
            if (currentActiveBtn && currentActiveRole !== null) {
                addWorkerToZone(currentActiveRole, currentActiveBtn,cuurentmax, UnassignedWorkerData);
            }
        }
 ////////////////////////////////////////////////////>afficherDetail(worker)
        function afficherDetail(worker) {
            if (!worker) return;
            
           descWorker.classList.add('afficherDetail');
           descWorker.style.width="30rem"
            // descWorker.classList.add('worker-detail');
            
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
                    <li><strong class="orbitron">Email:</strong> ${worker.email}</li>
                    <li><strong class="orbitron">Telephone:</strong> ${worker.telephone}</li>
                </ul>
                <strong class="orbitron"><h3>Experiences:</h3></strong>
                <div  class="Experiences">
                </div>
            `;


        ///afficher experiences
             function afficherExperience(){
                const ul=document.createElement('ul');
                    if(worker.experiences && worker.experiences.length>0)
                        for(let exp of worker.experiences ){
                    ul.innerHTML+=`
                        <li class="orbitron">
                    <strong>${exp.position}</strong>
                        (${exp.duration})
                        <br>
                    ${exp.description}
                    </li>
                    `
            descWorker.querySelector('.Experiences').appendChild(ul)   
        }}

        afficherExperience();
    }

     UnassignedWorker.addEventListener('click', (e) => {
            const card = e.target.closest('.worker-card');
            const index = card.dataset.index;
            afficherDetail(UnassignedWorkerData[index]);   
        });     
        
       

//////////////////////////////>deleteCardFromUnassignedWorker()+

        function deleteCardFromUnassignedWorker(){
           UnassignedWorker.addEventListener('click', (e) => {
            const card = e.target.closest('.worker-card');
            if (!card) return;

            if (e.target.classList.contains('delete')) {
                const index = card.dataset.index;
                UnassignedWorkerData.splice(index, 1);

                saveToLocalStorage();
                renderWorkers();
                descWorker.innerHTML ="";
                descWorker.style ="";
                updateCurrentZone();
                return;
            }
           

            
        });
        }
        deleteCardFromUnassignedWorker()
       
        descWorker.addEventListener('click', (e) => {
            if (e.target.classList.contains('deleteicon')) {
                descWorker.innerHTML = "";
                descWorker.style = "";
            }
        });

      
////////////////////////////////////////// function addworkerForm() 

        function addworkerForm() {
            addworkerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                worker.innerHTML = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <form class="addForm flex flex-col gap-4 p-8 w-[700px] rounded-2xl bg-white relative h-[90vh] overflow-y-auto text-black-200 ">
                        <img src="images/icons8-close-24.png" id="closeBtn" class="absolute right-3 top-3 cursor-pointer">
                        
                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Name</label>
                            <input type="text" id="name" class="p-2 rounded-lg border text-black">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Photo URL</label>
                            <input type="text" id="photo" placeholder="image URL" class="p-2 rounded-lg border text-black">
                            <img id="preview" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" width="100" class="mt-2 rounded shadow">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="font-semibold text-gray-700">Role</label>
                            <select id="role" class="p-2 rounded-lg border  border text-black">
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
                const role=document.getElementById('experiencesContainer');
                addExpBtn.addEventListener('click', () => {
                    const div = document.createElement('div');
                    div.classList.add('experience-item', 'flex', 'flex-col', 'p-3', 'rounded-lg', 'border', 'border-gray-300', 'bg-gray-50');
                    div.innerHTML = `
                        <label class="company font-semibold text-gray-700">Company</label>
                        <input type="text" class="exp-company p-1 border rounded mb-2 text-black">
                        
                        <label class="post font-semibold text-gray-700">Post</label>
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

function validationForm(){
    let isValid = true;
    const inputName = document.getElementById('name');
    const regexName = /^[A-Za-z]+$/;
    const errorName = "Name invalide!!";
    const inputphoto=document.getElementById('photo').value;
    const inputEmail = document.getElementById('email');
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errorEmail = "Email invalide!!";

    const inputPhone = document.getElementById('phone');
    const regexPhone = /^\+212\d{8}$/;
    const errorPhone = "Phone invalide!!";
    test(inputName, regexName, errorName);
    test(inputEmail, regexEmail, errorEmail);
    test(inputPhone, regexPhone, errorPhone);

    function test(inputElement, regex, messageError){
        if(regex.test(inputElement.value)){
            inputElement.style.border = "4px solid green";
        } else {
            isValid = false;
            inputElement.style.border = "4px solid red";
        }
    }
    return isValid;
}     
       

  ////////////////> function claseBtn() 

                function closeBtn(){
                    const closeForm = () => worker.innerHTML = '';
                    document.getElementById('closeBtn').addEventListener('click', closeForm);
                    document.getElementById('cancelBtn').addEventListener('click', closeForm);
                }
                closeBtn();

/////////////SAVE FORME
                document.getElementById('saveBtn').addEventListener('click', (ev) => {
                    ev.preventDefault();
                      if (validationForm()) {
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
                }
                else{
                    validationForm();
                }

                ev.innerHTML=``
                });
            });
        }
        addworkerForm();
        function getparRole(workers, role1) {
            if (!role1 || role1 === "") return workers;
            const tab= workers.filter(w => w.role.includes(role1));
            return tab;
        }
        

    
       var count=0;
        function addWorkerToZone(role, btnElement,max, Data) {
            const parent = btnElement.parentElement;
            const zoneContainer = parent.querySelector('.zone_container');
            
            const tab = getparRole(UnassignedWorkerData, role);
         
            zoneContainer.innerHTML =`  <img src="images/icons8-close-24.png" class="close1"
             style="absolute; width:20px; height:24px;  top: 0px; left :0px; border-radius:50%;">
             `;


            tab.forEach(worker => {
                const div = document.createElement('div');
                div.classList.add('workersvaliables');
                div.innerHTML = `
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${worker.image}"  style="width:40px; height:40px; object-fit:cover; border-radius:50%;">
                        <div>
                            <strong>${worker.name}</strong>
                            <p>${worker.role}</p>
                        </div>
                    </div>
                    <img src="images/icons8-add-100.png" class="addicons" style="cursor:pointer;">
                `;
               cuurentmax++;
                zoneContainer.appendChild(div);
            
                const addIcon = div.querySelector('.addicons');

                addIcon.addEventListener('click', () => {
                    assignWorkerToActiveZone(worker, parent,max, div);

                    const indexToDelete = UnassignedWorkerData.findIndex(w => w.name === worker.name);
                    if (indexToDelete !== -1) {
                        UnassignedWorkerData.splice(indexToDelete, 1);
                        saveToLocalStorage();
                        renderWorkers();
                        updateZoneColor()
                        div.remove();
                    }
                });

                
            });
        }


  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close1')) {
        const parent = e.target.parentElement;
        parent.innerHTML = '';
    }
});

////////////////////////////////>assignWorkerToActiveZone(workerData, zoneParent, workerDiv)
    
    
        function assignWorkerToActiveZone(workerData, zoneParent,max, workerDiv) {
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
               <div class="active-worker max-w-25 max-h-10 relative" style="position: relative;">
              <img  src="images/icons8-delete-48.png"   class="deleteActiveWr" style="position:absolute; top:0px; right:0px; width:24px; height:24px; cursor:pointer;">
            <img src="${workerData.image}" style="width:65px; height:60px; border-radius:50%; border:4px solid green;margin-top:5px">
             <span style="font-size:12px; font-weight:bold;">${workerData.name}</span>
            </div>
            `;
          const obj={
            name:workerData.name,
            image:workerData.image
          }
           cuurentmax++;
            activeDiv.classList.add('activeDiv');
            activeZone.classList.add('zone_activeStyle');
            activeZone.appendChild(activeDiv);
            updateZoneColor();
        }

        const zoneAddBtn = document.querySelectorAll('.zoneAddBtn');
   /////////////////function filterZone() 
        function filterZone() {
            zoneAddBtn.forEach(element => {
                element.addEventListener('click', () => {
                    zoneAddBtn.forEach(btn => {
                        btn.disabled = false;
                        btn.style.cursor = "pointer";//type souris
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
                        max=9;
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



function UpdateAfeterAddingUnsigned() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('deleteActiveWr')) {
                
                const activeCard = e.target.closest('.active-worker-card');
                if (!activeCard) return;

                const restoredWorker = {
                    name: activeCard.dataset.name,
                    role: activeCard.dataset.role,
                    image: activeCard.dataset.image,
                    email: activeCard.dataset.email,
                    telephone: activeCard.dataset.telephone,
                    experiences: JSON.parse(activeCard.dataset.experiences || "[]")
                };
                UnassignedWorkerData.push(restoredWorker);
                saveToLocalStorage();
                renderWorkers();       
                updateCurrentZone();   
                activeCard.remove();
                updateZoneColor();
            }
        });
    }

    UpdateAfeterAddingUnsigned();

});
 

///////fonction 
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteActiveWr')) {
       e.target.parentElement.remove();
       updateCurrentZone();
       updateZoneColor();
    }
});





