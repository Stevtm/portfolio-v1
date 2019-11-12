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

var currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

// Load Previous Push Day Information from the Database
window.onload = getData();

// Write Push Day Data to the Database
function push_writeData() {
    // Write to "Date" Child
    firebase.database().ref(currentDate).set({
        // Warmup Calories
        warmupCals: document.getElementById("warmupCals").value,
        // Incline DB Bench Press
        iBench_sets: document.getElementById("iBench_sets").value,
        iBench_reps: document.getElementById("iBench_reps").value,
        iBench_weight: document.getElementById("iBench_weight").value,
        // Machine Fly
        Fly_sets: document.getElementById("Fly_sets").value,
        Fly_reps: document.getElementById("Fly_reps").value,
        Fly_weight: document.getElementById("Fly_weight").value,
        // French Curls
        fCurl_sets: document.getElementById("fCurl_sets").value,
        fCurl_reps: document.getElementById("fCurl_reps").value,
        fCurl_weight: document.getElementById("fCurl_weight").value,
        // Lateral Raises
        latRaise_sets: document.getElementById("latRaise_sets").value,
        latRaise_reps: document.getElementById("latRaise_reps").value,
        latRaise_weight: document.getElementById("latRaise_weight").value,
        // Front Raises
        frontRaise_sets: document.getElementById("frontRaise_sets").value,
        frontRaise_reps: document.getElementById("frontRaise_reps").value,
        frontRaise_weight: document.getElementById("frontRaise_weight").value,
        // Overhead Press
        OHP_sets: document.getElementById("OHP_sets").value,
        OHP_reps: document.getElementById("OHP_reps").value,
        OHP_weight: document.getElementById("OHP_weight").value,
        // Cooldown Calories
        coolCals: document.getElementById("coolCals").value,
    });
    // Write to Specific Workout Folders:
        // Warmup Calories
    firebase.database().ref("warmupCals").push({
        date: currentDate,
        cals: document.getElementById("warmupCals").value
    })
        // Incline Bench Press
    firebase.database().ref("iBench").push({
        date: currentDate,
        iBench_sets: document.getElementById("iBench_sets").value,
        iBench_reps: document.getElementById("iBench_reps").value,
        iBench_weight: document.getElementById("iBench_weight").value,
    })
        // Machine Fly
    firebase.database().ref("Fly").push({
        date: currentDate,
        Fly_sets: document.getElementById("Fly_sets").value,
        Fly_reps: document.getElementById("Fly_reps").value,
        Fly_weight: document.getElementById("Fly_weight").value,
    })
        // French Curls
    firebase.database().ref("fCurl").push({
        date: currentDate,
        fCurl_sets: document.getElementById("fCurl_sets").value,
        fCurl_reps: document.getElementById("fCurl_reps").value,
        fCurl_weight: document.getElementById("fCurl_weight").value,
    })
        // Lateral Raises
    firebase.database().ref("latRaise").push({
        date: currentDate,
        latRaise_sets: document.getElementById("latRaise_sets").value,
        latRaise_reps: document.getElementById("latRaise_reps").value,
        latRaise_weight: document.getElementById("latRaise_weight").value,
    })
        // Front Raises
    firebase.database().ref("frontRaise").push({
        date: currentDate,
        frontRaise_sets: document.getElementById("frontRaise_sets").value,
        frontRaise_reps: document.getElementById("frontRaise_reps").value,
        frontRaise_weight: document.getElementById("frontRaise_weight").value,
    })
        // Overhead Press
    firebase.database().ref("OHP").push({
        date: currentDate,
        OHP_sets: document.getElementById("OHP_sets").value,
        OHP_reps: document.getElementById("OHP_reps").value,
        OHP_weight: document.getElementById("OHP_weight").value,
    })
        // Cooldown Calories
    firebase.database().ref("coolCals").push({
        date: currentDate,
        cals: document.getElementById("coolCals").value
    })
}

// Write Pull Day Data to the Database
function pull_writeData() {
    // Write to "Date" Child
    firebase.database().ref(currentDate).set({
        // Warmup Calories
        warmupCals: document.getElementById("warmupCals").value,
        // Bentover Rows
        boRow_sets: document.getElementById("boRow_sets").value,
        boRow_reps: document.getElementById("boRow_reps").value,
        boRow_weight: document.getElementById("boRow_weight").value,
        // Shrugs
        Shrug_sets: document.getElementById("Shrug_sets").value,
        Shrug_reps: document.getElementById("Shrug_reps").value,
        Shrug_weight: document.getElementById("Shrug_weight").value,
        // Seated Rows
        seatRow_sets: document.getElementById("seatRow_sets").value,
        seatRow_reps: document.getElementById("seatRow_reps").value,
        seatRow_weight: document.getElementById("seatRow_weight").value,
        // Lateral Pulldowns
        latPD_sets: document.getElementById("latPD_sets").value,
        latPD_reps: document.getElementById("latPD_reps").value,
        latPD_weight: document.getElementById("latPD_weight").value,
        // Face Pulls
        facePull_sets: document.getElementById("facePull_sets").value,
        facePull_reps: document.getElementById("facePull_reps").value,
        facePull_weight: document.getElementById("facePull_weight").value,
        // Rowing Machine
        rowMachine_time: document.getElementById("rowMachine_time").value,
        rowMachine_cals: document.getElementById("rowMachine_cals").value,
        // Cooldown Calories
        coolCals: document.getElementById("coolCals").value,
    });
    // Write to Specific Workout Folders:
        // Warmup Calories
    firebase.database().ref("warmupCals").push({
        date: currentDate,
        cals: document.getElementById("warmupCals").value
    })
        // Bentover Rows
    firebase.database().ref("boRow").push({
        date: currentDate,
        boRow_sets: document.getElementById("boRow_sets").value,
        boRow_reps: document.getElementById("boRow_reps").value,
        boRow_weight: document.getElementById("boRow_weight").value,
    })
        // Shrugs
    firebase.database().ref("Shrug").push({
        date: currentDate,
        Shrug_sets: document.getElementById("Shrug_sets").value,
        Shrug_reps: document.getElementById("Shrug_reps").value,
        Shrug_weight: document.getElementById("Shrug_weight").value,
    })
        // Seated Rows
    firebase.database().ref("seatRow").push({
        date: currentDate,
        seatRow_sets: document.getElementById("seatRow_sets").value,
        seatRow_reps: document.getElementById("seatRow_reps").value,
        seatRow_weight: document.getElementById("seatRow_weight").value,
    })
        // Lateral Pulldowns
    firebase.database().ref("latPD").push({
        date: currentDate,
        latPD_sets: document.getElementById("latPD_sets").value,
        latPD_reps: document.getElementById("latPD_reps").value,
        latPD_weight: document.getElementById("latPD_weight").value,
    })
        // Face Pulls
    firebase.database().ref("facePull").push({
        date: currentDate,
        facePull_sets: document.getElementById("facePull_sets").value,
        facePull_reps: document.getElementById("facePull_reps").value,
        facePull_weight: document.getElementById("facePull_weight").value,
    })
        // Row Machine
    firebase.database().ref("rowMachine").push({
        date: currentDate,
        rowMachine_time: document.getElementById("rowMachine_time").value,
        rowMachine_cals: document.getElementById("rowMachine_cals").value,
    })
        // Cooldown Calories
    firebase.database().ref("coolCals").push({
        date: currentDate,
        cals: document.getElementById("coolCals").value
    })
}

// Get Previous Workout Data from the Database
function getData() {
    // Incline DB Bench Press
    firebase.database().ref("iBench").limitToLast(1).on('child_added', function(childSnapshot){
        iBench = childSnapshot.val();
        document.getElementById("prev_iBench").innerHTML = iBench.iBench_weight;
    })
    // Machine Fly
    firebase.database().ref("Fly").limitToLast(1).on('child_added', function(childSnapshot){
        Fly = childSnapshot.val();
        document.getElementById("prev_Fly").innerHTML = Fly.Fly_weight;
    })
    // French Curls
    firebase.database().ref("fCurl").limitToLast(1).on('child_added', function(childSnapshot){
        fCurl = childSnapshot.val();
        document.getElementById("prev_fCurl").innerHTML = fCurl.fCurl_weight;
    })
    // Lateral Raises
    firebase.database().ref("latRaise").limitToLast(1).on('child_added', function(childSnapshot){
        latRaise = childSnapshot.val();
        document.getElementById("prev_latRaise").innerHTML = latRaise.latRaise_weight;
    })
    // Front Raises
    firebase.database().ref("frontRaise").limitToLast(1).on('child_added', function(childSnapshot){
        frontRaise = childSnapshot.val();
        document.getElementById("prev_frontRaise").innerHTML = frontRaise.frontRaise_weight;
    })
    // Overhead Press
    firebase.database().ref("OHP").limitToLast(1).on('child_added', function(childSnapshot){
        OHP = childSnapshot.val();
        document.getElementById("prev_OHP").innerHTML = OHP.OHP_weight;
    })
    // Bentover Rows
    firebase.database().ref("boRow").limitToLast(1).on('child_added', function(childSnapshot){
        boRow = childSnapshot.val();
        document.getElementById("prev_boRow").innerHTML = boRow.boRow_weight;
    })
    // Shrugs
    firebase.database().ref("Shrug").limitToLast(1).on('child_added', function(childSnapshot){
        Shrug = childSnapshot.val();
        document.getElementById("prev_Shrug").innerHTML = Shrug.Shrug_weight;
    })
    // Seated Rows
    firebase.database().ref("seatRow").limitToLast(1).on('child_added', function(childSnapshot){
        seatRow = childSnapshot.val();
        document.getElementById("prev_seatRow").innerHTML = seatRow.seatRow_weight;
    })
    // Lateral Pulldowns
    firebase.database().ref("latPD").limitToLast(1).on('child_added', function(childSnapshot){
        latPD = childSnapshot.val();
        document.getElementById("prev_latPD").innerHTML = latPD.latPD_weight;
    })
    // Face Pulls
    firebase.database().ref("facePull").limitToLast(1).on('child_added', function(childSnapshot){
        facePull = childSnapshot.val();
        document.getElementById("prev_facePull").innerHTML = facePull.facePull_weight;
    })
    // Rowing Machine
    firebase.database().ref("rowMachine").limitToLast(1).on('child_added', function(childSnapshot){
        rowMachine = childSnapshot.val();
        document.getElementById("prev_rowMachine").innerHTML = rowMachine.rowMachine_cals;
    })
}