/*eslint-env browser */
/*global firebase */

var CookBook = CookBook || {};
CookBook.RecipeGenerator = function(recipes, title) {
    "use strict";
    //variables
    var that = {},
        enteredPotIngredients,
        enteredGarbageIngredients,
        view,
        potIngrLength,
        binIngrLength,
        rLength,
        generateButton,
        favButton,
        userProfileObj;

    function initIngredient() {
            favButton = document.querySelector(".favorite-button");
            generateButton = document.querySelector(".create-recipe");
            generateButton.addEventListener("click", testIngredientThreshold);
            view = new CookBook.RecipeView();
        
    }

    function testIngredientThreshold() {
        const ingredientThreshold = 2;
        
        enteredPotIngredients = document.getElementsByClassName("pot");
        enteredGarbageIngredients = document.getElementsByClassName("bin");
        
        //button should only function when 2 ingredients are inside the pot
        if (enteredPotIngredients.length >= ingredientThreshold) {
            checkIngredientInDB(recipes, enteredPotIngredients, enteredGarbageIngredients);

        }

    }
    
    //checks if there is a recipe for the input ingredients with the isSubset function, if a recipe is available, it should be visible and the favorite button should work
    function checkIngredientInDB(recipes, potIngredients, binIngredients) {
        rLength = recipes.length;
        potIngrLength = potIngredients.length;
        binIngrLength = binIngredients.length;

            if (isSubset(recipes, potIngredients, binIngredients, rLength, potIngrLength, binIngrLength)){
            
                favButton.addEventListener("click",userFavorization);

                if(title !== undefined) {
                    view.showTitleInTable(title);
                }

                for(let i = 0; i < rLength; i++ ) {
                        view.showRecipe(recipes[i], title);
                     }
            }
    }

    // arr1 from cookbookdata is being compared to arr2 which has the current ingredients, if more than two ingredients are inside the recipe, isSubset returns true, if an ingredient from the garbage bin is inside the recipe it musn't show up at all
     
    function isSubset(arr1, arr2, arr3, length1, length2, length3){
    let i,
        j,
        k,
        l,
        counter = 0,
        isSubsetBool;
        const counterThreshold = 2;
        
        //compares ingredients from pot and cookbookdata
        for (i=0; i < length2; i++) {
            for (j = 0; j < length1; j++) {
                if (arr2[i].innerHTML === arr1[j]) {
                    counter++;
                    break;
                }    
            }

            if (j === length1) {
                isSubsetBool = false;
            }
            if (counter === counterThreshold){
                isSubsetBool = true;
            }
              
        }
        
        //compares ingredients from garbage and cookbookdata
        for (k = 0; k < length3; k++) {
            for (l = 0; l < length1; l++) {
                if (arr3[k].innerHTML === arr1[l]) {
                    isSubsetBool = false;
                }
            }
        }
        
        return isSubsetBool;

    }

    //save the favorite options of the current user
    function userFavorization(){
            userProfileObj = new CookBook.CookBookUserProfileData(firebase.auth().currentUser.uid, recipes , title);

            userProfileObj.saveIntoFavorite();
            favButton.classList.add("hidden");
    }

    that.initIngredient=initIngredient;
    return that;

};