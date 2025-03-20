var recipeList = document.getElementById("recipe-list");
var recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
// Render Recipes
document.addEventListener("DOMContentLoaded", renderRecipes);
function renderRecipes() {
    recipeList.innerHTML = "";
    recipes.forEach(function (recipe) {
        var div = document.createElement("div");
        div.className = "recipe-card p-4";
        div.innerHTML = "\n            <h3 class=\"text-lg font-bold text-orange-600\">".concat(recipe.name, "</h3>\n            <p class=\"text-sm text-gray-600 mt-1\"><strong>Ingredients:</strong> ").concat(recipe.ingredients, "</p>\n            <p class=\"text-sm text-gray-600 mt-1\"><strong>Instructions:</strong> ").concat(recipe.instructions, "</p>\n            <div class=\"mt-3 flex justify-end\">\n                <button class=\"btn btn-secondary\" onclick=\"editRecipe('").concat(recipe.id, "')\">\u270F\uFE0F Edit</button>\n                <button class=\"btn btn-primary ml-2\" onclick=\"deleteRecipe('").concat(recipe.id, "')\">\u274C Delete</button>\n            </div>\n        ");
        recipeList.appendChild(div);
    });
}
// Open & Close Modal
function openRecipeModal(id) {
    if (id === void 0) { id = ""; }
    var modal = document.getElementById("recipe-modal");
    modal.classList.remove("hidden");
    var recipeId = document.getElementById("recipe-id");
    var recipeName = document.getElementById("recipe-name");
    var recipeIngredients = document.getElementById("recipe-ingredients");
    var recipeInstructions = document.getElementById("recipe-instructions");
    if (id) {
        var recipe = recipes.find(function (r) { return r.id === id; });
        if (recipe) {
            recipeId.value = recipe.id;
            recipeName.value = recipe.name;
            recipeIngredients.value = recipe.ingredients;
            recipeInstructions.value = recipe.instructions;
        }
    }
    else {
        recipeId.value = "";
        recipeName.value = "";
        recipeIngredients.value = "";
        recipeInstructions.value = "";
    }
}
function closeRecipeModal() {
    var modal = document.getElementById("recipe-modal");
    modal.classList.add("hidden");
}
// Save Recipe
function saveRecipe() {
    var recipeId = document.getElementById("recipe-id").value;
    var recipeName = document.getElementById("recipe-name").value.trim();
    var recipeIngredients = document.getElementById("recipe-ingredients").value.trim();
    var recipeInstructions = document.getElementById("recipe-instructions").value.trim();
    if (!recipeName || !recipeIngredients || !recipeInstructions) {
        alert("Please fill in all fields!");
        return;
    }
    if (recipeId) {
        var index = recipes.findIndex(function (r) { return r.id === recipeId; });
        recipes[index] = { id: recipeId, name: recipeName, ingredients: recipeIngredients, instructions: recipeInstructions };
    }
    else {
        var newRecipe = {
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
function deleteRecipe(id) {
    recipes = recipes.filter(function (r) { return r.id !== id; });
    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes();
}
