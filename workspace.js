const worker=document.getElementById('worker');
const addworkerBtn=document.getElementById('addWorkerBtn');
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

        <select id="role"

                class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none text-black">

            <option value="Réceptionniste">Réceptionniste</option>

            <option value="Technicien IT">Technicien IT</option>

            <option value="Agent de sécurité">Agent de sécurité</option>

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
    
    `;
})


const saveBtn=document.getElementById('saveBtn');

const closeBtn=document.getElementById('closeBtn');



saveBtn.addEventListener('click',(e)=>{

    e.preventDefault();

const name=document.getElementById('name');

const role = document.getElementById('role');

const preview = document.getElementById('preview');

const div=document.createElement('div');

div.classList.add('worker-card');

div.innerHTML=`

    <img src="${preview.src}" alt="workerImage" >
    <div class="block text-ms">
        <ul>
        <li><p>${name.value}</p></li>
        <li><p>${role.value}</p></li>
        </ul>
    <div class="crudBtn">
        <button class="edit">Edit</button>
         <button class="delete">Delete</button>
   </div>

    </div>

`;
   UnassignedWorker.appendChild(div);

}); 

closeBtn.addEventListener('click',()=>{
    worker.textContent='';

});

});

const UnassignedWorker = document.getElementById('UnassignedWorker');
const WorkerData = [

     {

        name: "Ahmed",
        image:"images/WhatsApp Image 2025-11-13 à 22.38.16_e5b4bc95.jpg",
        role: "IT"

    },

    {
        name: "khalid",
        image:"https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg",
         role: "IT"
    },

    {
        name: "mohamed",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYKEE5-ghIh59XAJdXK-sd-IwWdF-TYzbcL2fwhlb76zD13MhowQtcfW5wZWaagcS3os&usqp=CAU",
        role: "IT",
    },
];
WorkerData.forEach(e=>{

    const div=document.createElement('div');

    div.classList.add('worker-card');

    div.innerHTML=`
        <img src="${e.image}">
        <ul>
         <li>${e.name}</li>
          <li>${e.role}</li>
        </ul>
         <div class="crudBtn">
                 <button class="edit">Edit</button>
                  <button class="delete">Delete</button>

        </div>

    `;
    UnassignedWorker.appendChild(div);
});