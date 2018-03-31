/*eslint-env browser */

var CookBook = CookBook || {};
CookBook.RecipeView = function () {

    "use strict";

    var that = {},
        favButton,

        favClose,
        favAlert,
        tableBody,
        tableTitle,
        tableTitleInput,
        tableTitleInput2,
        tableTitleStarsOuter,
        tableTitleStarsInner,
        tableTitleNumberRating,
        recipeTable = document.getElementsByClassName("tableRecipeShower")[0],
        recipeShower = document.getElementsByClassName("recipeShower"),
        recipeCloser,
        recipeTableTr,
        recipeTableHeader,
        recipeTableTrElement,
        recipeTableTrElement2,
        recipeTableTrElement3,
        recipeTableContent;

    //Visualise the elements from the array on the website
    function showRecipe(element){

    recipeShower[0].classList.remove("hidden");
    recipeCloser = document.getElementsByClassName("closebtnRecipe");
    recipeCloser[0].addEventListener("click", hideRecipeShower);

        if(document.getElementById("td"+ element)=== null) {
            recipeTableTrElement2 = document.createElement("tr");
            recipeTableContent = document.createElement("td");
            recipeTableContent.innerText = element;
            recipeTableContent.id = "td" + element;

            recipeTable.appendChild(recipeTableTrElement2);
            recipeTableTrElement.appendChild(recipeTableContent);

        }
    }

    //creates the titles for the favorite table
    function showTitleInTable(title) {
        favButton = document.querySelector(".favorite-button");
        recipeShower[0].appendChild(favButton);
        favButton.classList.remove("hidden");

        if (document.getElementById("tr" + title) === null) {
            recipeTableTrElement = document.createElement("tr");
            recipeTableHeader = document.createElement("td");
            recipeTableHeader.innerText = title;

            recipeTableTrElement.id = "tr"+title;

            recipeTable.appendChild(recipeTableTrElement);
            recipeTableTrElement.appendChild(recipeTableHeader);

        }
    }

    //sets up the layout for the table in favorites
    function showPreperation(preperation, title){
        if(document.getElementById(preperation) === null) {
            recipeTableTr = document.getElementById("tr" + title);
            recipeTableTrElement3 = document.createElement("td");
            recipeTableTrElement3.id = preperation;
            recipeTableTrElement3.innerText = preperation;

            recipeTableTr.appendChild(recipeTableTrElement3);
        }
    }

    //creates for all titles that were marked as favorite a note in the recipeView
    function showFavoriteTable(title) {
        
        const numStars = 5;

        favAlert = document.getElementsByClassName("alert");
        favClose = document.getElementsByClassName("closebtn");
        favAlert[0].classList.remove("hidden");
        favClose[0].addEventListener("click", hideFavorites);

        tableBody = document.querySelector(".tableBody");
        tableTitle = document.createElement("tr");
        tableTitle.className = title;

        if (document.getElementsByClassName("" + title).length === 0) {

            tableBody.appendChild(tableTitle);

            tableTitleInput = document.createElement("td");
            tableTitleInput2 = document.createTextNode(title);
            tableTitleInput.appendChild(tableTitleInput2);

            tableTitle.appendChild(tableTitleInput);
            tableTitleStarsOuter = document.createElement("div");
            tableTitleStarsOuter.className = "stars-outer";
            tableTitleStarsInner = document.createElement("div");
            tableTitleStarsInner.className = "stars-inner";
            tableTitleNumberRating = document.createElement("span");
            tableTitleNumberRating.className = "number-rating";
            tableTitleStarsOuter.appendChild(tableTitleStarsInner);
            tableTitle.appendChild(tableTitleStarsOuter);
            tableTitle.appendChild(tableTitleNumberRating);

            tableTitleStarsOuter.addEventListener("mouseover", e=> {
                let box = tableTitleStarsOuter.getBoundingClientRect(),
                    starIndex = Math.floor((e.pageX - box.left) / box.width * numStars);

                setRatingWidth(starIndex);
            });

        }
    }

    function setRatingWidth(index){
        const maxNumRating = 5,
              maxPercent = 100,
              percentage = 3;
        var rating = (((index+1/maxNumRating) * maxPercent)/percentage) + "%";
        tableTitleStarsInner.style.width = rating;
    }

    function hideRecipeShower(){
        recipeShower = document.getElementsByClassName("recipeShower");
        recipeShower[0].classList.add("hidden");
    }

    function hideFavorites(){
        favAlert = document.getElementsByClassName("alert");
        favAlert[0].classList.add("hidden");
    }

    that.showTitleInTable = showTitleInTable;
    that.showFavoriteTable = showFavoriteTable;
    that.showPreparation = showPreperation;
    that.showRecipe = showRecipe;
    return that;
};