/*eslint-env browser */
/*global firebase */
var CookBook = CookBook || {};
CookBook.CookBookUserProfileData = function(userID, recipeIngredients, titles) {
    "use strict";

    var that = {},
        DATABASE_INSTANCE = firebase.database(),
        userRef;

    //if a user presses the favorite button, the recipe is saved into the users id
    function saveIntoFavorite(){
        
        var postData = {
            RECIPE_INGREDIENTS: recipeIngredients,
        },
            updates = {};
        
        userRef = DATABASE_INSTANCE.ref().child("Users").child(userID);
        
        updates[titles] = postData;
        userRef.update(updates);
    }

    that.saveIntoFavorite = saveIntoFavorite;
    return that;

};