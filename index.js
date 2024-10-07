console.log("Added");

// Load all categories button //

const loadCategoryButton = async () => {
  try {
    const fetchedData = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const categoriesButtonData = await fetchedData.json();
    displayAllCategoriesButton(categoriesButtonData.categories);
  } catch (error) {
    console.log(error);
  }
};

// Display all Categories button for Display all categories videos (2)
const displayAllCategoriesButton = (categoriesButtonData) => {
  const categoriesContainer = document.getElementById("categoriesContainer");
  console.log(categoriesButtonData);

  categoriesButtonData.forEach((singleCategoryButton) => {
    console.log(singleCategoryButton);

    const categoriesButtonContainer = document.createElement("div");

    const categoryButton = document.createElement("button");
    categoryButton.id = `btn-${singleCategoryButton.category}`;
    categoryButton.className =
      "btn font-black lg:text-2xl h-16 lg:w-48 text-xl category-btn  border-2";
    categoryButton.innerHTML = `<img class="w-10 lg:w-12" src="${singleCategoryButton.category_icon}" />
    ${singleCategoryButton.category}`;

    categoryButton.addEventListener("click", () => {
      loadCategoryWisePet(singleCategoryButton.category);
    });

    categoriesButtonContainer.append(categoryButton);
    categoriesContainer.append(categoriesButtonContainer);
  });
};

// Load all pets

const loadAllPets = async () => {
  try {
    const fetchedData = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );

    const allPetsData = await fetchedData.json();
    displayAllPets(allPetsData.pets);
  } catch (error) {
    console.log(error);
  }
};

// Display all pets

const displayAllPets = (allPetsData) => {
  console.log(allPetsData);

  const petsAllContainer = document.getElementById("all-pets");

  petsAllContainer.innerHTML = "";

  if (allPetsData.length === 0) {
    petsAllContainer.innerHTML = `
    <div class=" lg:w-[600px] w-[400px] lg:ml-[400px] ml-[130px] mt-24 mb-12 flex flex-col gap-5 justify-center items-center">
      <img src="./assets/error-image.webp" />

      <h2 class="text-3xl font-black text-center">
        No Information Available
      </h2>
    </div>;
    `;
    return;
  }

  allPetsData.forEach((singlePet) => {
    console.log(singlePet);

    const singlePetCard = document.createElement("div");
    singlePetCard.classList =
      "card lg:w-[310px] w-[380px]  h-[500px] lg:ml-6 ml-4 border-2 ";

    singlePetCard.innerHTML = `
    
    <figure>
    <img class="object-cover w-full" src = ${singlePet.image} />
  </figure>
  <div class="p-4">
    <h2 class="card-title text-3xl ">${singlePet.pet_name}</h2>

    
    <div class="flex items-center gap-2  mt-3">
    <img class="w-7" src="./assets/square-dot.png"> 
    <h1 class="text-xl text-slate-600">Breed: ${
      singlePet.breed?.length > 0 ? singlePet.breed : "Not available"
    }</h1>
    </div>


    <div class="flex items-center gap-2  mt-1">
    <img class="w-5 ml-1" src="./assets/birth-icon.png"> 
    <h1 class="text-xl text-slate-600">Birth: ${
      singlePet.date_of_birth?.length > 0
        ? singlePet.date_of_birth
        : "Not available"
    }</h1>
    </div>
    <div class="flex items-center gap-2  mt-1">
    <img class="w-7 " src="./assets/gender-icon.png"> 
    <h1 class="text-xl text-slate-600">Gender: ${
      singlePet.gender?.length > 0 ? singlePet.gender : "Not available"
    }</h1>
    </div>
    <div class="flex items-center gap-2  mt-1">
    <img class="w-5 ml-1 " src="./assets/dolar-icon.png"> 
    <h1 class="text-xl text-slate-600">Price: ${
      singlePet.price ? singlePet.price + "$" : "Not available"
    }</h1>
    </div>
    <div class="divider"></div>



    <div class="flex items-center justify-between">

    <button class="like-btn"><img src="./assets/like-icon.png" /></button>
    <button class="p-2 text-cyan-700 rounded-lg border-2 border-[#5daed5] font-black" onclick="adoptModals()">Adopt</button>
    <button onclick="loadSinglePetDetails(${
      singlePet.petId
    })" class="p-2 text-cyan-700 rounded-lg border-2 border-[#5daed5] font-black">Details</button>

    </div>
  </div>

    `;

    // For like button

    const likeButton = singlePetCard.querySelector(".like-btn");
    likeButton.addEventListener("click", () => {
      const petImageContainer = document.getElementById("pet-image");

      const imageElement = document.createElement("img");
      imageElement.src = singlePet.image;
      imageElement.classList = " w-[200px] h-[200px] p-4  object-cover mb-4";

      petImageContainer.append(imageElement);
    });

    petsAllContainer.append(singlePetCard);
  });
};

// Category Wise Pet //

const loadCategoryWisePet = async (categoryName) => {
  try {
    const fetchedData = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
    );

    const categoryWiseData = await fetchedData.json();
    const activeBtn = document.getElementById(`btn-${categoryName}`);
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to the clicked button
    activeBtn.classList.add("active");

    console.log(activeBtn);
    console.log(categoryWiseData);
    displayAllPets(categoryWiseData.data);
  } catch (error) {
    console.log(error);
  }
};

const adoptModals = (singlePet) => {
  const adoptModalContainer = document.getElementById("modal-content");

  document.getElementById("showModal").click();
};

// Load Details Data

const loadSinglePetDetails = async (petId) => {
  console.log(petId);

  const fetchedData = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const singlePetDetail = await fetchedData.json();
  displaySinglePetDetails(singlePetDetail.petData);
};

//  Display Details Data

const displaySinglePetDetails = (singlePetDetail) => {
  console.log(singlePetDetail);

  const singlePetDetailContainer = document.getElementById("modal-resources");

  singlePetDetailContainer.innerHTML = `
  
  <img class="w-full object-cover" src=${singlePetDetail.image} />
  <h2 class="card-title text-3xl mt-4">${singlePetDetail.pet_name}</h2>
  <div class="flex items-start justify-between">

  <div>
   <div class="flex items-center gap-2  mt-3">
    <img class="w-7" src="./assets/square-dot.png"> 
    <h1 class="text-xl text-slate-600">Breed: ${
      singlePetDetail.breed?.length > 0
        ? singlePetDetail.breed
        : "Not available"
    }</h1>
    </div>
   <div class="flex items-center gap-2  mt-3">
    <img class="w-7" src="./assets/gender-icon.png"> 
    <h1 class="text-xl text-slate-600">Gender: ${
      singlePetDetail.gender?.length > 0
        ? singlePetDetail.gender
        : "Not available"
    }</h1>
    </div>
   <div class="flex items-center gap-2  mt-3">
    <img class="w-7" src="./assets/gender-icon.png"> 
    <h1 class="text-xl text-slate-600">Vaccinated Status: ${
      singlePetDetail.vaccinated_status?.length > 0
        ? singlePetDetail.vaccinated_status
        : "Not available"
    }</h1>
    </div>
  
  </div>

  <div>
  <div class="flex items-center gap-2  mt-3">
    <img class="w-5" src="./assets/birth-icon.png"> 
    <h1 class="text-xl text-slate-600">Birth: ${
      singlePetDetail.date_of_birth?.length > 0
        ? singlePetDetail.date_of_birth
        : "Not available"
    }</h1>
    </div>


     <div class="flex items-center gap-2  mt-1">
    <img class="w-5 ml-1 " src="./assets/dolar-icon.png"> 
    <h1 class="text-xl text-slate-600">Price: ${
      singlePetDetail.price ? singlePetDetail.price + "$" : "Not available"
    }</h1>
    </div>
   
  </div>
  
  </div>
 <div class="divider"></div>

 <h1 class="text-2xl font-black">Details Information</h1>

 <p class="text-justify text-slate-500 mt-3">${
   singlePetDetail.pet_details ? singlePetDetail.pet_details : "Not available"
 }</p>

  `;
  document.getElementById("customModal").showModal();
};

// Sort By Price

document.getElementById("sortPriceBtn").addEventListener("click", () => {
  loadAndSortPetsByPrice();
});

const loadAndSortPetsByPrice = async () => {
  try {
    const fetchedData = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const allPetsData = await fetchedData.json();
    allPetsData.pets.sort((a, b) => {
      const priceA = a.price ? parseFloat(a.price) : 0;
      const priceB = b.price ? parseFloat(b.price) : 0;
      return priceA - priceB;
    });

    displayAllPets(allPetsData.pets);
  } catch (error) {
    console.log(error);
  }
};

//  ALl Function Calls
loadCategoryButton();
loadAllPets();
