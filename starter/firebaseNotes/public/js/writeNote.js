let googleUser;
const noteButton=document.querySelector("#noteButton");

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};


const handleNoteSubmit = () =>{
            const noteTitle=document.querySelector("#noteTitle");
            const noteText=document.querySelector("#noteText");
            const noteLabel=document.querySelector("#noteLabel");
            const note={
                title: noteTitle.value,
                label: noteLabel.value,
                note: noteText.value
            }
            const messageRef=firebase.database().ref(`users/${googleUser.uid}`);
            messageRef.push(note).then(()=>{
                noteTitle.value="",
                noteLabel.value="",
                noteText.value=""
            })
    }

noteButton.addEventListener('click', (e)=>{
    console.log("button clicked!");
    handleNoteSubmit();
});

