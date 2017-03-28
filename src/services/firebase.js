var firebase = require('firebase');
firebase.auth().signInWithPopup(facebooProvider).then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
         // The signed-in user info.
        var user = result.user;
        var userId = 'coolcars:' + user.uid ;
        var newUsertRef = {
          _id: userId ,
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
          uid: user.uid,
          //roles    : opts.roles || [],
          //type     : 'user',
        };
        AuthService.signup(newUsertRef).then(function(res) {
          AuthService.login(user.displayName , user.uid).then(function(response,err) {
            if (!err) {
              toastr.success("signInWithsuccess" +" "+ response.name)
              AuthService.username  = response.name;
              self.Session.trigger('auth:updated')
            }
          });
        }).catch(function(err) {
          console.log(err)
        });
      }
    }).catch(function(error) {
      console.log(error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });