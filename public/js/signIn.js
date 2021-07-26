console.log("signIn.js loaded")

const signInButton = document.querySelector(".button");

//event listener for sign in button
signInButton.addEventListener("click", () => {
    console.log("clicked!")
    //authentication
    const provider = new firebase.auth.GoogleAuthProvider()
    //popup google authentication
    firebase.auth().signInWithPopup(provider).then(result => {
        //log the user that is logged in
        const user = result.user
        console.log("login success", user)
        window.location = "writeNote.html"
    })
   //error handling
   .catch(error => {
       console.log("login failed", error)
   })
})
