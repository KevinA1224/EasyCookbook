/*eslint-env browser */
/*global firebase */

var CookBook = CookBook || {};
CookBook.CookBookData = function() {
    "use strict";
    
    var that = {},
        databaseInstance,
        testRecipe,
        keys,
        recipes = [],
        k,
        ingrPot,
        ingrGarbage,
        select,
        refIngredients,
        refIngredientsTest,
        refRecipes,
        recipeGenerator;

    function initData() {

        databaseInstance = firebase.database();

        //a reference for the ingredient and recipe array
        refIngredients = databaseInstance.ref().child("Zutaten");
        refRecipes = databaseInstance.ref().child("Rezepte");

        ingrPot = document.querySelector(".cooking-pot");
        ingrGarbage = document.querySelector(".garbage");

        getIngredientsArray();
        getInputText();

    }

    // output of text from input field
    function getInputText() {

        //if data (JSON) from database available, then execute gotData, else execute errData
        refRecipes.on("value", gotData, errData);

    }

    //read data from the database
    function gotData(data) {

        testRecipe = data.val();

        //childs of JSON are practically presented as array
        keys = Object.keys(testRecipe);

        //recipes are being shown as JSON and with SplitObject they are being turned into arrays 
        for(let i = 0; i < keys.length; i++) {
            k = keys[i];
            recipes = testRecipe[k];

            //the generator gets the recipes and recipenames(k)
            recipeGenerator = new CookBook.RecipeGenerator(recipes, k);
            recipeGenerator.initIngredient();
        }
    }

    //output if the data from the database is unavailable
    function errData(err){
        let ingrView = CookBook.IngredientView();
        ingrView.ingredientsFromDBNotAvailable(err);
    }

    //practically download array with ingredients, if the value exists, execute gotArray
    function getIngredientsArray() {
        refIngredients.on("value", gotArray);
    }

    function gotArray(data) {
        //gets array
        refIngredientsTest = data.val();

        //takes array and sets up the ingredient-container
        select = new CookBook.SelectIngredients(ingrPot, ingrGarbage, refIngredientsTest);
        select.setupIngredientContainer();

    }

    that.initData = initData;
    return that;
};