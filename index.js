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

//  ALl Function Calls
loadCategoryButton();
