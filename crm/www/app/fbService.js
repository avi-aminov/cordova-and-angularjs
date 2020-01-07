app.factory('fbService', function () {
    let = _connection = null;
    
    return {

        fbConfig: function(){
            return {
                apiKey: "AIzaSyBOJjAqZzWK6i7CNtyRtV63KqSRbHemphI",
                authDomain: "bizcrm-32c55.firebaseapp.com",
                databaseURL: "https://bizcrm-32c55.firebaseio.com",
                projectId: "bizcrm-32c55",
                storageBucket: "bizcrm-32c55.appspot.com",
                messagingSenderId: "888553106258",
                appId: "1:888553106258:web:b2cf170227a3b886b5288b",
                measurementId: "G-TKM4SYRX4H"
            }
        },

        init: function(callback){
            if(!this._connection){
                this._connection = firebase.initializeApp(this.fbConfig());
                if (typeof callback === "function") callback('firebase connected');
            }else{
                if (typeof callback === "function") callback('firebase alerd connected');
            }
        },

        isInitRedy: function(){
            return this._connection;
        },

        auth: function(callback){
            if(this.isInitRedy()){
                firebase.auth().onAuthStateChanged(function(user) {
                    if (typeof callback === "function") callback(user);
                });
            }else{
                this.init(function(){
                    console.log("init from auth");
                });
            }
        },

        login: function(userEmail, userPass, callback){

            if(this.isInitRedy()){
                if(!this.auth()){
                    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
                        if (typeof callback === "function") callback(error);
                    });
                }else{
                    return this.auth(callback);
                }
            }else{

            }
        },

        logOut: function(callback){
            if(this._connection){
                firebase.auth().signOut().then(function() {
                    if (typeof callback === "function") callback({'msg': 'successful'});
                }).catch(function(error) {
                    if (typeof callback === "function") callback({'msg': error});
                });
            }
        },

    };
});