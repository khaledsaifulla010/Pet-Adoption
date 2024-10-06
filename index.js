console.log("Added");

// Load all categories button //

const loadCategoryButton = async () => {
  try {
    const fetchedData = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const categoriesButtonData = await fetchedData.json();
    console.log(categoriesButtonData);
  } catch (error) {
    console.log(error);
  }
};

//  ALl Function Calls
loadCategoryButton();
