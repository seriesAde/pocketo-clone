let add_item_btn = document.getElementById("add_item_btn");
let add_direction_btn = document.getElementById("add_direction_btn");
let recipe_btn = document.getElementById("recipe_btn");

// Add New Ingredient Input
function addItem() {
    let ingredient_list = document.getElementById("ingredient_list");
    let new_input = document.createElement("input");
    new_input.classList.add("ingredient_item", "border", "border-gray-300", "py-2", "px-1", "outline-none", "w-full", "mb-1");
    ingredient_list.append(new_input);
}

add_item_btn.addEventListener("click", (e) => {
    e.preventDefault();
    addItem();
});

// Add New Direction Input
function addDirection() {
    let direction_list = document.getElementById("direction_list");
    let new_input = document.createElement("input");
    new_input.classList.add("direction_item", "border", "border-gray-300", "py-2", "px-1", "outline-none", "w-full", "mb-1");
    direction_list.append(new_input);
}

add_direction_btn.addEventListener("click", (e) => {
    e.preventDefault();
    addDirection();
});

// Get all Categories from the API
async function getCategories() {
    try {
        const categoryContainer = document.getElementById("category");
        const resp = await fetch("http://localhost:5000/categories");
        const result = await resp.json();
        let content = "";
        result.forEach((category) => {
            content += `
            <option value="${category.name}">${category.name}</option>
        `;
        });
        categoryContainer.innerHTML += content;
    } catch (err) {
        console.log(err);
    }
}

getCategories();

// Create a recipe
async function createRecipe() {
    let title = document.getElementById("title");
    let image = document.getElementById("image");
    let description = document.getElementById("description");
    let cook_time = document.getElementById("cook_time");
    let category = document.getElementById("category");
    let ingredient_item = document.querySelectorAll(".ingredient_item");
    let direction_item = document.querySelectorAll(".direction_item");
    let ingredient_arr = [];
    let direction_arr = [];
    // Ingredient Arr
    ingredient_item.forEach((item) => {
        ingredient_arr.push(item.value);
    });

    // Direction Arr
    direction_item.forEach((item) => {
        direction_arr.push(item.value);
    });

    let recipe_obj = {
        title: title.value,
        image: image.value,
        category: category.value,
        description: description.value,
        cook_duration: cook_time.value,
        ingredients: ingredient_arr,
        directions: direction_arr,
    };

    try {
        const resp = await fetch("http://localhost:5000/recipes", {
            method: "POST",
            body: JSON.stringify(recipe_obj),
        });
        const result = await resp.json();
        console.log(result);
        alert("Recipe created successfully");
    } catch (err) {
        console.log(err);
    }
}

recipe_btn.addEventListener("click", (e) => {
    e.preventDefault();
    createRecipe();
});