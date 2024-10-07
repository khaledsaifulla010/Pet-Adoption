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
    categoriesButtonContainer.innerHTML = `
<button id="btn-${singleCategoryButton}" onclick="loadCategoryVideos(${singleCategoryButton})" class="btn font-black lg:text-2xl h-16 lg:w-48 text-xl category-btn rounded-lg border-2"><img class="w-10 lg:w-12" src="${singleCategoryButton.category_icon}" />
 ${singleCategoryButton.category}</button>
`;
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
    <div class=" w-[500px] ml-[500px] mt-40 flex flex-col gap-5 justify-center items-center">
      <img src="./assets/error-image.webp" />

      <h2 class="text-3xl font-black text-center">
        No Content Here in This Category{" "}
      </h2>
    </div>;
    `;
    return;
  }

  allPetsData.forEach((singlePet) => {
    console.log(singlePet);

    const singlePetCard = document.createElement("div");
    singlePetCard.classList =
      "card lg:w-[310px] w-[380px] h-[400px] lg:ml-6 ml-4 border-2 ";

    singlePetCard.innerHTML = `
    
    <figure>
    <img src = ${singlePet.image} />
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
    
  </div>

    `;

    petsAllContainer.append(singlePetCard);
  });
};

//  ALl Function Calls
loadCategoryButton();
loadAllPets();
