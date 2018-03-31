/*eslint-env browser */

var CookBook = CookBook || {};
CookBook.LoginView = function () {
    "use strict";

    //sets up elements in the variable declaration for the case that the login/logout button ist pressed on the login screen
    var that = {},
        container = document.querySelector(".login-container"),

        cookRecipe = document.querySelector(".cook-recipe"),
        ingredientsBox = document.querySelector(".ingredients-box"),
        createRecipeButton = document.querySelector(".create-recipe"),
        currentIngredients = document.querySelector(".current-ingredients"),
        recipeView = document.querySelector(".recipe-container"),
        searchView = document.querySelector(".ingredient-search-field"),
        loginOutput = document.querySelector(".loginOutputText"),

        favButton = document.querySelector(".showFavo"),
        logoutButton = document.getElementById("btnLogout");

    function hideLogin() {
        container.classList.add("hidden");
    }
    
    function showIngredientPage() {
        cookRecipe.classList.remove("hidden");
        ingredientsBox.classList.remove("hidden");
        createRecipeButton.classList.remove("hidden");
        favButton.classList.remove("hidden");
        searchView.classList.remove("hidden");
    }
    
    function showLogin() {
        container.classList.remove("hidden");
    }
    
    function hideIngredientPage() {
        cookRecipe.classList.add("hidden");
        ingredientsBox.classList.add("hidden");
        createRecipeButton.classList.add("hidden");
        currentIngredients.classList.add("hidden");
        recipeView.classList.add("hidden");
        searchView.classList.add("hidden");
    }
    
    function showLogoutButton() {
        logoutButton.classList.remove("hidden");
    }
    
    function removeLogoutButton() {
        logoutButton.classList.add("hidden");
    }
    
    function showErrorOutput(Text) {
        loginOutput.innerHTML = Text;
    }
    
    that.hideLogin = hideLogin;
    that.showLogin = showLogin;
    that.showIngredientPage = showIngredientPage;
    that.hideIngredientPage = hideIngredientPage;
    that.removeLogoutButton = removeLogoutButton;
    that.showLogoutButton = showLogoutButton;
    that.showErrorOutput = showErrorOutput;
    return that;
};