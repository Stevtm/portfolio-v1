// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyDiZZCW3zp4kkJATlkF8wwRe5qN_afay-U",
    authDomain: "workout-data-tracking-794a4.firebaseapp.com",
    databaseURL: "https://workout-data-tracking-794a4.firebaseio.com",
    projectId: "workout-data-tracking-794a4",
    storageBucket: "workout-data-tracking-794a4.appspot.com",
    messagingSenderId: "341687081539",
    appId: "1:341687081539:web:ec96d921d47e1d788cd2f6"
};
firebase.initializeApp(firebaseConfig);

// Load Previous Workout Information from the Database
window.onload = getData();

function getData() {
    // Push Day
    firebase.database().ref("iBench").limitToLast(1).on('child_added', function(childSnapshot){
        iBench = childSnapshot.val();
        document.getElementById("prev_push").innerHTML = iBench.date;
    })
    // Pull Day
    firebase.database().ref("latPD").limitToLast(1).on('child_added', function(childSnapshot){
        latPD = childSnapshot.val();
        document.getElementById("prev_pull").innerHTML = latPD.date;
    })
    // Leg Day
    firebase.database().ref("bSquat").limitToLast(1).on('child_added', function(childSnapshot){
        bSquat = childSnapshot.val();
        document.getElementById("prev_leg").innerHTML = bSquat.date;
    })
    // Back Day
    firebase.database().ref("dLift").limitToLast(1).on('child_added', function(childSnapshot){
        dLift = childSnapshot.val();
        document.getElementById("prev_back").innerHTML = dLift.date;
    })
}