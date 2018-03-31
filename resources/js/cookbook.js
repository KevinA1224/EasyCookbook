/*eslint-env browser */
/*global firebase */

var CookBook = (function() {
    "use strict";
    //variables
    var that = {},
        cookBookData,
        user,
        userID,
        userProfile,
        userProfileFavObj;

    function init() {
        
        // start connection with database
        var config = {
            apiKey: "AIzaSyC0sCP0B8wBNyWpZApe1SKeaC0VeMszDv0",
            authDomain: "cookbook-quickstart.firebaseapp.com",
            databaseURL: "https://cookbook-quickstart.firebaseio.com",
            projectId: "cookbook-quickstart",
            storageBucket: "cookbook-quickstart.appspot.com",
            messagingSenderId: "86763999265",
        },
            loginView,
            btnLoginLogoutHeader,
            firstLogin = true;
        
        firebase.initializeApp(config);
        loginView = CookBook.LoginView();
        btnLoginLogoutHeader = document.querySelector(".loginAndLogout");

        //elements of login
        const txtEmail = document.getElementById("txtEmail"),
              txtPassword = document.getElementById("txtPassword"),
              btnLogin= document.getElementById("btnLogin"),
              btnSignUp= document.getElementById("btnSignUp"),
              btnLogout= document.getElementById("btnLogout"),
              favButton = document.querySelector(".showFavo");

        //login button event
        btnLogin.addEventListener("click", function(){
            var promise;
            
            //get email and password
            const email = txtEmail.value,
                  pass = txtPassword.value,
                  auth = firebase.auth(),
                  //ESLint seems to see a mistake here although the escape character for this regular expression is necessary, this checks if the email contains @ and if there are no special characters (badly formatted email)
                  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if(re.test(email)){
                    promise = auth.signInWithEmailAndPassword(email,pass);

                    //if an error occurs show it on the login screen
                    promise.catch(e => loginView.showErrorOutput(e.message));

                    //shows main page and hides login page
                    loginView.hideLogin();
                    loginView.showIngredientPage();

                    //initializes favorite button functionality for current user
                    favButton.addEventListener("click", function (){
                        userProfileFavObj = new CookBook.UserProfileFavorites(firebase.auth().currentUser.uid);
                        userProfileFavObj.init();

                    });

                    loginView.showLogoutButton();

                    //affter succesful connection with the database, the data(ingredients ,recipies) from the database will be loaded, but only if this is the first login in the current session
                    if(firstLogin === true) {
                        cookBookData = new CookBook.CookBookData();
                        cookBookData.initData();

                        firstLogin = false;
                    }
                } else {
                    loginView.showErrorOutput("No valid email or password");
                }
   
        });

        btnSignUp.addEventListener("click", function(){
            //get email and password
            const email = txtEmail.value,
                  pass = txtPassword.value,
                  auth = firebase.auth(),
                  promise = auth.createUserWithEmailAndPassword(email,pass);
            
            //login
            promise.catch(e => loginView.showErrorOutput(e.message));
            auth.onAuthStateChanged(firebaseUser => {
                //if someone logs in
                if (firebaseUser) {
                    user = auth.currentUser;
                    userID = user.uid;

                    userProfile = new CookBook.CookBookUserProfile(userID);
                    userProfile.initProfile();

                }

            });
            
            //Shows a message after succesful login
            loginView.showErrorOutput("Successfully registred");

        });

        //logs the current user out and reloads the html document to avoid problems with the database
        btnLogout.addEventListener("click", function(){
            firebase.auth().signOut();
            loginView.removeLogoutButton();
            location.reload();

        });

        btnLoginLogoutHeader.addEventListener("click", onLoginLogoutBtnClicked);
        
        //shows the login page again when pressed and hides the main page
        function onLoginLogoutBtnClicked() {
            loginView.hideIngredientPage();
            loginView.showLogin();
            favButton.classList.add("hidden");
        }
        
        }

    that.init = init;
    return that;
}());