const worker=document.getElementById('worker');
const addworkerBtn=document.getElementById('addWorkerBtn');


const UnassignedWorker = document.getElementById('UnassignedWorker');
const descWorker = document.getElementById('descWorker');
const WorkerData = [

     {
        name: "Ahmed",
        image:"images/WhatsApp Image 2025-11-13 à 22.38.16_da362682.jpg",
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
        
        name: "khalid",
        image:"https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg",
        role: "Techniciens IT",
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
        name: "mohamed",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrJaxYg64cSX1flsMAcGFwZ071HCZq94kO2igLp4OBtRrmjoWDVM1Zd7tfcBYLFaejLe4&usqp=CAU",
        role: "Nettoyage",
        company: "Tech Solutions SARL", 

        experiences: [
            {
                Company:"Z12",
                post: "Support IT",
                duration: "Jan 2022 - Dec 2022",
                description: "Maintenance des systèmes et assistance aux utilisateurs."
            },
            {
                company: "Tech Solutions SARL",
                post: "Technicien réseau",
                duration: "Jan 2023 - Present",
                description: "Gestion des infrastructures réseau et sécurité informatique."
            }
        ]
    },
    {
        
        name: "Aicha",
        image: "https://media.gettyimages.com/id/1437816897/fr/photo/portrait-de-femme-daffaires-de-gestionnaire-ou-de-ressources-humaines-pour-la-r%C3%A9ussite.jpg?s=612x612&w=gi&k=20&c=tfcvEVTcJcfXTtA0rB-NbjurEVpp7N3QN9heh7Q0RuU=",
        role: "sécurité",
        company: "Tech Solutions SARL", 

        experiences: [
            {
                Company:"Z12",
                post: "Manager",
                duration: "Jan 2022 - Dec 2021",
                description: "Maintenance des systèmes et assistance aux utilisateurs."
            },
            {
                company: "Tech Solutions SARL",
                position: "Technicien réseau",
                duration: "Feb 2025 - Present",
                description: "Gestion des infrastructures réseau et sécurité informatique."
            }
        ]
    }
];

const UnassignedWorkerData=[];

WorkerData.forEach((e, index) => {

    const div = document.createElement('div');
    div.classList.add('worker-card');  
    div.dataset.index = index;

    div.innerHTML = `
        <img src="images/icons8-close-24.png" class="img2">
        <img src="${e.image}">
        <ul>
            <li>${e.name}</li>
            <li>${e.role}</li>
        </ul>
        <button class="edit">Edit</button>
    `;
   
    UnassignedWorker.appendChild(div);

    const worker2 = {
        name: e.name,
        role: e.role,
        image:e.image
    };
   UnassignedWorkerData.push(worker2);
});


function afficherDetail(worker) {
    descWorker.innerHTML = `
        <img src="images/icons8-close-24.png" class="deleteicon">
        <img src="${worker.image}" class="imgDescrp">
        <ul>
            <li><strong>Name:</strong> ${worker.name}</li>
            <li><strong>Role:</strong> ${worker.role}</li>
            <li><strong>Company:</strong> ${worker.company}</li>
        </ul>

        <strong><h3>Experiences:</h3></strong>
        <ul>
            ${worker.experiences
                .map(exp => `
                    <li>
                        <strong>${exp.position || exp.post}</strong>  
                        (${exp.duration})  
                        <br> ${exp.description}
                    </li>
                `)
                .join("")
            }
        </ul>
    `;
}
document.querySelectorAll('.worker-card').forEach(card => {
    card.addEventListener('click', () => {
        const index = card.dataset.index;  
        afficherDetail(WorkerData[index]); 
    });
});


descWorker.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteicon')) {
        descWorker.innerHTML = "";  
    }
});

addworkerBtn.addEventListener('click',(e)=>{
       e.preventDefault();
    worker.innerHTML="";
    worker.innerHTML=`
<form action="" class=" addForm flex flex-col gap-4 p-8 w-[600px]  rounded-2xl  bg-white">
    <img src="images/icons8-close-24.png"
         alt="close"
         id="closeBtn"
         class="absolute right-3 top-3 cursor-pointer">
    <div class="flex flex-col">
        <label for="name" class="font-semibold text-gray-700">Name</label>
        <input type="text" id="name"
               class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">
    </div>
    <div class="flex flex-col">
        <label for="photo" class="font-semibold text-gray-700">Photo</label>
        <input type="text" id="photo" placeholder="image URL"   class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">
        <img id="preview" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" width="180" class="mt-2 rounded-lg shadow-md ">
    </div>
    <div class="flex flex-col">
        <label class="font-semibold text-gray-700">Role</label>
        <select id="role" class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400  text-black">
            <option value="Réceptionniste">Réceptionniste</option>
            <option value="Technicien IT">Technicien IT</option>
            <option value="Agent de sécurité">Agent de sécurité</option>
            <option value="Manager">Manager</option>
            <option value="Nettoyage">Nettoyage</option>
        </select>
    </div>
    <div class="flex flex-col">
        <label class="font-semibold text-gray-700">Email</label>
        <input type="email" placeholder="exemple@mail.com"
               class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">
    </div>
    <div class="flex flex-col">
        <label class="font-semibold text-gray-700">Téléphone</label>
        <input type="text"
               class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">
    </div>
    <label class="font-semibold text-gray-700">Experience</label>
 <div id="experiences">
    <div class="flex flex-col p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 bg-gray-100">
     <label class="font-semibold text-gray-700">Company</label>
     <input type="text" class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black " ></input>
     <label class="font-semibold text-gray-700">Role</label>
     <input type="text" class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black " ></input>
     <label class="font-semibold text-gray-700">From</label>
    <input type="date"   class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">
     <label class="font-semibold text-gray-700">To</label>
    <input type="date"   class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">  
    </div>
  </div>
    <button type="button" class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow-md transition"  id="addExperienceBtn"> Add Experiences </button
    <div class="flex justify-between mt-4">
        <button id="saveBtn"
                class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition">
            Save
        </button>
        <button id="cancelBtn"
                class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition">
            Cancel
        </button>
    </div>
</form>
    `; 
   
const input = document.getElementById('photo');
const preview = document.getElementById('preview');

 input.addEventListener('input',(e)=>{
  const url=e.target.value;
   if (url) {
    preview.src = url;
   }else{
    preview.src ="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
   }
 });
const  addExperienceBtn=document.getElementById('addExperienceBtn');
const  experiences=document.getElementById('experiences');
addExperienceBtn.addEventListener('click',()=>{
    experiences.innerHTML+=`
    <div class="experiences flex flex-col p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 bg-gray-100">
     <label class=" font-semibold text-gray-700">Company</label>
     <input type="text" class="company p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black " ></input>
     <label class=" font-semibold text-gray-700">Role</label>
     <input type="text" class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black " ></input>
     <label class="font-semibold text-gray-700">From</label>
    <input type="date"   class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">
     <label class="font-semibold text-gray-700">To</label>
    <input type="date"   class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">  
    </div>  
    `;
})
const saveBtn=document.getElementById('saveBtn');
const closeBtn=document.getElementById('closeBtn');


saveBtn.addEventListener('click',(e)=>{
    e.preventDefault();
const name=document.getElementById('name');
const role = document.getElementById('role');
const preview = document.getElementById('preview');
const experiences = document.getElementById('experiences');
const div=document.createElement('div');
div.classList.add('worker-card');
div.innerHTML=`

    <img src="${preview.src}" alt="workerImage" >
    <div class="block text-ms  flex">
        <ul>
        <li><p>${name.value}</p></li>
        <li><p>${role.value}</p></li>
        </ul>
        <button class="edit">Edit</button>
    </div>

`;
   UnassignedWorker.appendChild(div);
   const worker0={
    name:name.value,
    image:preview.src,
    role:role.value,
    experiences:{
        company:experiences.firstChild.value,
        position:experiences.lastChild.value,
    }

   }
UnassignedWorkerData.push(worker0);

}); 

closeBtn.addEventListener('click',()=>{
    worker.textContent='';

});

});
    

//fonction return les travailleur par role
function getparRole(workers, role1) {
    return workers.filter(w => w.role.includes(role1));
}

const it = getparRole(UnassignedWorkerData, "Techniciens IT");
const Réceptionniste = getparRole(UnassignedWorkerData, "Réceptionniste");
const Agent_de_sécurité = getparRole(UnassignedWorkerData, "sécurité");
const Manager = getparRole(UnassignedWorkerData, "Manager");
const Nettoyage = getparRole(UnassignedWorkerData, "Nettoyage");


const zoneAddBtn = document.querySelectorAll('.zoneAddBtn');

 function addWorker(tab,Element){
       Element.addEventListener('click', () => {
       const parent = Element.parentElement;
          tab.forEach(worker => {
            const div = document.createElement('div');
            div.classList.add('workersvaliables');
            div.innerHTML = `
               <img id="img1" src="${worker.image}" >
               <div>
               <ul>
               <li>${worker.name}</li>
               <li><strong>${worker.role}</strong></li>
               </ul>
                </div>
            `;

            parent.appendChild(div);
          });
        
        });
    }

fetch('data.json')
  .then(Response => Response.json())
  .then(data => {

    zoneAddBtn.forEach(Element => {
    const parent = Element.parentElement;
      if (parent.classList.contains('conference')) {
        addEventListener('click',addWorker(it,Element))
        addWorker(it,Element);
        addWorker(Réceptionniste,Element);
        addWorker(Agent_de_sécurité,Element);
        addWorker(Manager,Element);
        addWorker(Nettoyage,Element);

      }
     else if (parent.classList.contains('Salle_archives')) {
         addWorker(Manager,Element);
     }
     else if (parent.classList.contains('sallesecurite')){
        addWorker(Agent_de_sécurité,Element);
     }
     else if (parent.classList.contains('Réception')){
        addWorker(Réceptionniste,Element);
     }
     else if (parent.classList.contains('Salledupersonnel')){
        addWorker(it,Element);
        addWorker(Réceptionniste,Element);
        addWorker(Agent_de_sécurité,Element);
        addWorker(Manager,Element);
        addWorker(Nettoyage,Element);
     }else if(parent.classList.contains('Salledesserveurs')){
        addWorker(it,Element);
     }
      
    });

  });


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('img2')) {
        const workerDiv = e.target.closest('.worker-card ');
        if (workerDiv) {
            workerDiv.remove();
        }
    }
});


// const UnassignedWorker=document.getElementById('UnassignedWorker');
//   const descWorker=document.getElementById('descWorker');
//  cards.forEach(element=>{

//   if()
//       element.addEventListener('click',()=>{
//          descWorker.innerHTML="";
//          descWorker.innerHTML=`
//      <div class="block text-ms  flex">
//         <ul>
//          <li><p>Nam:${element.name}</p></li>
//           <li><p>Role:${element.role}</p></li>
//           </ul>       
//     </div>
//   `;
//       })
//   })

 