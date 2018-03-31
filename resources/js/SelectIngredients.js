/* eslint-env browser */
/* global DropZone */

var CookBook = CookBook || {};
CookBook.SelectIngredients = function (element, element2, ingrArray) {
    "use strict";

    var that = {},
        potDrop,
        garbageDrop,
        ingredientView,
        ingredientsList,
        currentContentList,
        li,
        img,
        span,
        currentPotContent,
        currentGarbageContent,
        li2,
        span2,
        searchField,
        searchButton,
        searchIngredient,
        initialClick = true,
        cloneNode;
    
    //creates drop zone for elements so that ingredients can be dragged on them
    
    function setupIngredientContainer() {
        ingredientView = new CookBook.IngredientView;

        potDrop = new DropZone(element, ["ingredient"]);
        potDrop.addEventListener("ingredientDropped", onPotDropped);

        garbageDrop = new DropZone(element2, ["ingredient"]);
        garbageDrop.addEventListener("ingredientDropped", onGarbageDropped);

        //put ingredientArray ("ingrArray") from the database here
            for(let i = 0; i < ingrArray.length; i++){
                createIngredientsList(ingrArray[i]);
            }
        searchField = document.querySelector(".search-field");
        searchButton = document.querySelector(".search-button");
        searchIngredient = document.querySelector(".searched-ingredient");
        searchButton.addEventListener("click", searchButtonClick);
        
        currentPotContent = document.querySelector(".potContent");
        currentGarbageContent = document.querySelector(".garbageContent");
    }
    
    //Creates a list with the dropped ingredient in the pot
    function onPotDropped(event) {
        //marks the ingredient as a pot-ingredient
        var potIngredient = true;
        ingredientView.showCurrentIngredients();
        
        createCurrentIngredientsList(currentPotContent, potIngredient, event.data);
    }
    
    //Creates a list with the dropped ingredient in the garbage
    function onGarbageDropped(event){
        //marks the ingredient as a garbage-ingredient
        var potIngredient = false;
        ingredientView.showCurrentIngredients();
        
        createCurrentIngredientsList(currentGarbageContent, potIngredient, event.data);
    }
    
    //Creates new list elements for the ingredients
    function createIngredientsList(ingredients) {
        ingredientsList = document.querySelector(".ingredientsList");
        li = document.createElement("li");
        img = document.createElement("img");
        span = document.createElement("span");
         
        ingredientView.initIngredients(ingredientsList, li, img, span, ingredients);
        ingredientDrag(li);
    }
    
    function ingredientDrag(ingrEl) {
        ingrEl.addEventListener("dragstart", ingredientDragStart);
    }
    
    //contains the name of the ingredient when ingredient is dropped
    function ingredientDragStart(e) {
        e.dataTransfer.setData("text", e.target.querySelector(".ingredient-text").innerHTML);
        e.effectAllowed ="copy";
    }
    
    //shows ingredients that are currently in the pot or garbage
    function createCurrentIngredientsList(container, potIngr, eventData) {
        li2 = document.createElement("li");
        span2 = document.createElement("span");
        ingredientView.initCurrentIngredients(container,li2, span2, potIngr, eventData);
        
        //adds an event-listener when an element in the pot or garbage is being clicked
        currentContentList = document.querySelectorAll(".current-content");
        for (let i = 0; i < currentContentList.length; i++){
          currentContentList[i].addEventListener("click", onCurrentIngredientClicked);
      }
    }
    
    //click on an ingredient, to remove it from the pot or garbage
    function onCurrentIngredientClicked(event) {
        var ul = event.target.parentElement.parentElement;
        
        ul.removeChild(event.target.parentElement);
        
        //hides the view for currentIngredients when none are in the pot or garbage
        ingredientView.hideCurrentContentList(currentPotContent, currentGarbageContent);
    }
    
    function searchButtonClick() {
        //if the button isn't clicked for the first time, remove the previous ingredient
        if (initialClick === false) {
            ingredientView.removeCopiedIngredient(searchIngredient, cloneNode);
        }
        for (let i = 0; i < ingredientsList.childElementCount; i++){
            if (ingredientsList.childNodes[i].childNodes[1].innerHTML === searchField.value) {
                cloneNode = ingredientsList.childNodes[i].cloneNode(true);
                ingredientView.addCopiedIngredient(searchIngredient, cloneNode);
                initialClick = false;
            }
        }
        ingredientDrag(cloneNode);
    }

    that.setupIngredientContainer = setupIngredientContainer;
    return that;
};