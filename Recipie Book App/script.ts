interface Recipe {
    id: string;
    name: string;
    ingredients: string;
    instructions: string;
}

const recipeList = document.getElementById("recipe-list") as HTMLDivElement;
let recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes") || "[]");

// Render Recipes
document.addEventListener("DOMContentLoaded", renderRecipes);

function renderRecipes(): void {
    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
        const div = document.createElement("div");
        div.className = "recipe-card p-4";
        div.innerHTML = `
            <h3 class="text-lg font-bold text-orange-600">${recipe.name}</h3>
            <p class="text-sm text-gray-600 mt-1"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p class="text-sm text-gray-600 mt-1"><strong>Instructions:</strong> ${recipe.instructions}</p>
            <div class="mt-3 flex justify-end">
                <button class="btn btn-secondary" onclick="editRecipe('${recipe.id}')">✏️ Edit</button>
                <button class="btn btn-primary ml-2" onclick="deleteRecipe('${recipe.id}')">❌ Delete</button>
            </div>
        `;
        recipeList.appendChild(div);
    });
}

// Open & Close Modal
function openRecipeModal(id: string = ""): void {
    const modal = document.getElementById("recipe-modal") as HTMLDivElement;
    modal.classList.remove("hidden");

    const recipeId = document.getElementById("recipe-id") as HTMLInputElement;
    const recipeName = document.getElementById("recipe-name") as HTMLInputElement;
    const recipeIngredients = document.getElementById("recipe-ingredients") as HTMLTextAreaElement;
    const recipeInstructions = document.getElementById("recipe-instructions") as HTMLTextAreaElement;

    if (id) {
        const recipe = recipes.find((r) => r.id === id);
        if (recipe) {
            recipeId.value = recipe.id;
            recipeName.value = recipe.name;
            recipeIngredients.value = recipe.ingredients;
            recipeInstructions.value = recipe.instructions;
        }
    } else {
        recipeId.value = "";
        recipeName.value = "";
        recipeIngredients.value = "";
        recipeInstructions.value = "";
    }
}

function closeRecipeModal(): void {
    const modal = document.getElementById("recipe-modal") as HTMLDivElement;
    modal.classList.add("hidden");
}

// Save Recipe
function saveRecipe(): void {
    const recipeId = (document.getElementById("recipe-id") as HTMLInputElement).value;
    const recipeName = (document.getElementById("recipe-name") as HTMLInputElement).value.trim();
    const recipeIngredients = (document.getElementById("recipe-ingredients") as HTMLTextAreaElement).value.trim();
    const recipeInstructions = (document.getElementById("recipe-instructions") as HTMLTextAreaElement).value.trim();

    if (!recipeName || !recipeIngredients || !recipeInstructions) {
        alert("Please fill in all fields!");
        return;
    }

    if (recipeId) {
        const index = recipes.findIndex((r) => r.id === recipeId);
        recipes[index] = { id: recipeId, name: recipeName, ingredients: recipeIngredients, instructions: recipeInstructions };
    } else {
        const newRecipe: Recipe = {
            id: Date.now().toString(),
            name: recipeName,
            ingredients: recipeIngredients,
            instructions: recipeInstructions
        };
        recipes.push(newRecipe);
    }

    localStorage.setItem("recipes", JSON.stringify(recipes));
    closeRecipeModal();
    renderRecipes();
}

// Delete Recipe
function deleteRecipe(id: string): void {
    recipes = recipes.filter((r) => r.id !== id);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes();
}
