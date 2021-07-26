let googleUser = null

//when the window has fully loaded run this function
window.onload = () => {
    //welcome the user
    
    //when the authorization state of the page changes
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            //if user has logged in 
            console.log("logged in as", user.displayName)
            googleUser = user
            const welcome = document.querySelector("#welcome")
            welcome.innerHTML = `Welcome ${user.displayName}!`
        } else {
            //user has not logged in
            console.log("not logged in")
        }
    })

    const createNoteButton = document.querySelector("#createNoteButton")
    
    //get values from the form
    createNoteButton.addEventListener("click", () => {
        console.log("clicked")
        const noteTitle = document.querySelector("#noteTitle").value
        const noteText = document.querySelector("#noteText").value
        const noteCreated = Date()
        console.log(noteTitle, noteText, noteCreated)

        //write these values to the database
        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle, 
            text: noteText,
            created: noteCreated
        }).then(() => {
            console.log("database write succesful")
            document.querySelector("#noteTitle").value = ""
            document.querySelector("#noteText").value = ""
        })
        .catch(error => {
            console.log("error writing a new note", error)
        })
    })
}