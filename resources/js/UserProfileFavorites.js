/*eslint-env browser */
/*global firebase */
var CookBook = CookBook || {};
CookBook.UserProfileFavorites= function(userID) {
    "use strict";
    var that = {},
        favReference,
        removeReference,
        DATABASE_INSTANCE = firebase.database(),
        favData1,
        favDataKey1,
        favRecepts1,
        favDataKey2,
        recipeView = new CookBook.RecipeView();

    function init(){
        //gets the specific generated recipe from the database
        removeReference = DATABASE_INSTANCE.ref().child("Users").child(userID).child("TEST");
        removeReference.set(null);
        favReference = DATABASE_INSTANCE.ref().child("Users").child(userID);
        return favReference.once("value").then(function(snapshot) {
            favData1 = snapshot.val();
            favDataKey1 = Object.keys(favData1);
            for (let i = 0; i < favDataKey1.length; i++){
                let k = favDataKey1[i];
                favRecepts1 = favData1[k];
                getData(favRecepts1, k);

            }

        });
    }
    //gets the specific generated recipe from the database part2 and passing them a visualisation function
    function getData(object , title){
        favDataKey2 = Object.keys(object);

        for (let i = 0; i < favDataKey2.length;i++){
            recipeView.showFavoriteTable(title);
        }

    }

    that.init = init;
    return that;

};