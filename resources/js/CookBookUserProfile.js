/*eslint-env browser */
/*global firebase */

var CookBook = CookBook || {};
CookBook.CookBookUserProfile = function(userID) {
    "use strict";
    
    var that = {},
        userData,
        DATABASE_INSTANCE = firebase.database(),
        userRef;

    /*initProfile soll nun die userID enthalten und auf Basis dieser erstmal einen hierarchisch korrekten array erstellen
        bestehend aus (Wurzel: Users, 1.Kind (alle UserID), 2.Kind innerhalb der UserId (Favoriten, Bewertung)
    */
    
    //after a user was registrated, creatUserData is called
    function initProfile(){

        userRef = DATABASE_INSTANCE.ref().child("Users");
        createUserData(userID);
    }

    //this function creates an entry in the database with the id of the user as the root
    function createUserData(id){
        var updates = {};
        
        userData={
            TEST : "test",
        };
        
        updates[id] = userData;
        userRef.update(updates);
    }

    that.initProfile = initProfile;
    return that;

};