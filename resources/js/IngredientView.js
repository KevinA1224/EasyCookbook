/* eslint-env browser */

var CookBook = CookBook || {};
CookBook.IngredientView = function () {
    "use strict";

    var that = {},
        currentIngredientsBox,
        BASE_URL = "https://firebasestorage.googleapis.com/v0/b/cookbook-quickstart.appspot.com/o/{{recipe}}.jpg?alt=media",
        src,
        DRAG_IN_INDX = 0,
        recipeButton = document.querySelector(".create-recipe");
    
    const requiredAmount = 2;
    
    //shows currentIngredients in the pot or garbage
    function showCurrentIngredients() {
        currentIngredientsBox = document.querySelector(".current-ingredients");
        currentIngredientsBox.classList.remove("hidden");
    }
    
    //sets up the ingredient list
    function initIngredients(ul, li, img, span, ingredientText) {
        ul.appendChild(li);
        li.appendChild(img);
        li.appendChild(span);
        
        li.setAttribute("draggable", "true");
        span.classList.add("ingredient-text");
        
        //gets picture for the ingredient from database
        span.innerHTML = ingredientText;
        src = BASE_URL.replace("{{recipe}}", ingredientText);
        img.setAttribute("src", src);
        img.setAttribute("draggable", "false");
    }
    
    //sets up the ingredients list for ingredients currently in the pot or garbage
    function initCurrentIngredients(ul, li, span, potIngr, eventData) {
        ul.appendChild(li);
        li.appendChild(span);
        li.classList.add("current-content");
        
        span.classList.add("current-ingredient-name");
        
        //checks if an ingredient is inside the pot or the garbage
        if (potIngr === true) {
            span.classList.add("pot");
        } else {
            span.classList.add("bin");
        }

        //enables the recipeButton when 2 or more ingredients are currently inside the ingredients list
        span.innerHTML = eventData;
        DRAG_IN_INDX++;
        if(DRAG_IN_INDX >= requiredAmount){
            recipeButton.classList.remove("disabled");

        }
    }
    
    //if no ingredients are in the pot or garbage the list for the current ingredients disappears
    function hideCurrentContentList(potContent, garContent) {
        if (potContent.childElementCount === 0 && garContent.childElementCount ===0) {
            currentIngredientsBox.classList.add("hidden");
        }
    }
    
    //removes copied ingredient so that it can be replaced
    function removeCopiedIngredient(searchIngr, cloneNode) {
        searchIngr.removeChild(cloneNode);
    }
    
    function addCopiedIngredient(searchIngr, cloneNode) {
        searchIngr.appendChild(cloneNode);
    }
    
    //shows a message when the ingredients cannot be accessed form the database
    function ingredientsFromDBNotAvailable (error) {
        var ingrBox = document.querySelector(".ingredients-box"),
        errText = document.createElement("div");
        ingrBox.appendChild(errText);
        errText.innerHTML = error;
    }

    that.initIngredients = initIngredients;
    that.showCurrentIngredients = showCurrentIngredients;
    that.initCurrentIngredients = initCurrentIngredients;
    that.hideCurrentContentList = hideCurrentContentList;
    that.removeCopiedIngredient = removeCopiedIngredient;
    that.addCopiedIngredient = addCopiedIngredient;
    that.ingredientsFromDBNotAvailable = ingredientsFromDBNotAvailable;
    return that;
};