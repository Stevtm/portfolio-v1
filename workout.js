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

// Load date in EST
var date = new Date();
var currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON().slice(0,10).replace(/-/g,'/');

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

// Write Leg Day Data to the Database
function leg_writeData() {
    // Write to "Date" Child
    firebase.database().ref(currentDate).set({
        // Warmup Calories
        warmupCals: document.getElementById("warmupCals").value,
        // Back Squats
        bSquat_sets: document.getElementById("bSquat_sets").value,
        bSquat_reps: document.getElementById("bSquat_reps").value,
        bSquat_weight: document.getElementById("bSquat_weight").value,
        // Front Squats
        fSquat_sets: document.getElementById("fSquat_sets").value,
        fSquat_reps: document.getElementById("fSquat_reps").value,
        fSquat_weight: document.getElementById("fSquat_weight").value,
        // Lunges
        Lunge_sets: document.getElementById("Lunge_sets").value,
        Lunge_reps: document.getElementById("Lunge_reps").value,
        Lunge_weight: document.getElementById("Lunge_weight").value,
        // Calf Raises
        calfRaise_sets: document.getElementById("calfRaise_sets").value,
        calfRaise_reps: document.getElementById("calfRaise_reps").value,
        calfRaise_weight: document.getElementById("calfRaise_weight").value,
        // Leg Extensions
        legExt_sets: document.getElementById("legExt_sets").value,
        legExt_reps: document.getElementById("legExt_reps").value,
        legExt_weight: document.getElementById("legExt_weight").value,
        // Hamstring Curls
        hCurl_sets: document.getElementById("hCurl_sets").value,
        hCurl_reps: document.getElementById("hCurl_reps").value,
        hCurl_weight: document.getElementById("hCurl_weight").value,
        // Cooldown Calories
        coolCals: document.getElementById("coolCals").value,
    });
    // Write to Specific Workout Folders:
        // Warmup Calories
    firebase.database().ref("warmupCals").push({
        date: currentDate,
        cals: document.getElementById("warmupCals").value
    })
        // Back Squats
    firebase.database().ref("bSquat").push({
        date: currentDate,
        bSquat_sets: document.getElementById("bSquat_sets").value,
        bSquat_reps: document.getElementById("bSquat_reps").value,
        bSquat_weight: document.getElementById("bSquat_weight").value,
    })
        // Front Squats
    firebase.database().ref("fSquat").push({
        date: currentDate,
        fSquat_sets: document.getElementById("fSquat_sets").value,
        fSquat_reps: document.getElementById("fSquat_reps").value,
        fSquat_weight: document.getElementById("fSquat_weight").value,
    })
        // Lunges
    firebase.database().ref("Lunge").push({
        date: currentDate,
        Lunge_sets: document.getElementById("Lunge_sets").value,
        Lunge_reps: document.getElementById("Lunge_reps").value,
        Lunge_weight: document.getElementById("Lunge_weight").value,
    })
        // Calf Raises
    firebase.database().ref("calfRaise").push({
        date: currentDate,
        calfRaise_sets: document.getElementById("calfRaise_sets").value,
        calfRaise_reps: document.getElementById("calfRaise_reps").value,
        calfRaise_weight: document.getElementById("calfRaise_weight").value,
    })
        // Leg Extensions
    firebase.database().ref("legExt").push({
        date: currentDate,
        legExt_sets: document.getElementById("legExt_sets").value,
        legExt_reps: document.getElementById("legExt_reps").value,
        legExt_weight: document.getElementById("legExt_weight").value,
    })
        // Hamstring Curls
    firebase.database().ref("hCurl").push({
        date: currentDate,
        hCurl_sets: document.getElementById("hCurl_sets").value,
        hCurl_reps: document.getElementById("hCurl_reps").value,
        hCurl_weight: document.getElementById("hCurl_weight").value,
    })
        // Cooldown Calories
    firebase.database().ref("coolCals").push({
        date: currentDate,
        cals: document.getElementById("coolCals").value
    })
}

// Write Back Day Data to the Database
function back_writeData() {
    // Write to "Date" Child
    firebase.database().ref(currentDate).set({
        // Warmup Calories
        warmupCals: document.getElementById("warmupCals").value,
        // Deadlifts
        dLift_sets: document.getElementById("dLift_sets").value,
        dLift_reps: document.getElementById("dLift_reps").value,
        dLift_weight: document.getElementById("dLift_weight").value,
        // Back Extensions
        backExt_sets: document.getElementById("backExt_sets").value,
        backExt_reps: document.getElementById("backExt_reps").value,
        backExt_weight: document.getElementById("backExt_weight").value,
        // Plank
        Plank_sets: document.getElementById("Plank_sets").value,
        Plank_time: document.getElementById("Plank_time").value,
        // Side Plank
        sidePlank_sets: document.getElementById("sidePlank_sets").value,
        sidePlank_time: document.getElementById("sidePlank_time").value,
        // Scissor Kick
        sKick_sets: document.getElementById("sKick_sets").value,
        sKick_reps: document.getElementById("sKick_reps").value,
        // Mason Twists
        mTwist_sets: document.getElementById("mTwist_sets").value,
        mTwist_reps: document.getElementById("mTwist_reps").value,
        mTwist_weight: document.getElementById("mTwist_weight").value,
        // Cooldown Calories
        coolCals: document.getElementById("coolCals").value,
    });
    // Write to Specific Workout Folders:
        // Warmup Calories
    firebase.database().ref("warmupCals").push({
        date: currentDate,
        cals: document.getElementById("warmupCals").value
    })
        // Deadlifts
    firebase.database().ref("dLift").push({
        date: currentDate,
        dLift_sets: document.getElementById("dLift_sets").value,
        dLift_reps: document.getElementById("dLift_reps").value,
        dLift_weight: document.getElementById("dLift_weight").value,
    })
        // Back Extensions
    firebase.database().ref("backExt").push({
        date: currentDate,
        backExt_sets: document.getElementById("backExt_sets").value,
        backExt_reps: document.getElementById("backExt_reps").value,
        backExt_weight: document.getElementById("backExt_weight").value,
    })
        // Planks
    firebase.database().ref("Plank").push({
        date: currentDate,
        Plank_sets: document.getElementById("Plank_sets").value,
        Plank_time: document.getElementById("Plank_time").value,
    })
        // Side Plank
    firebase.database().ref("sidePlank").push({
        date: currentDate,
        sidePlank_sets: document.getElementById("sidePlank_sets").value,
        sidePlank_time: document.getElementById("sidePlank_time").value,
    })
        // Scissor Kick
    firebase.database().ref("sKick").push({
        date: currentDate,
        sKick_sets: document.getElementById("sKick_sets").value,
        sKick_reps: document.getElementById("sKick_reps").value,
    })
        // Mason Twist
    firebase.database().ref("mTwist").push({
        date: currentDate,
        mTwist_sets: document.getElementById("mTwist_sets").value,
        mTwist_reps: document.getElementById("mTwist_reps").value,
        mTwist_weight: document.getElementById("mTwist_weight").value,
    })
        // Cooldown Calories
    firebase.database().ref("coolCals").push({
        date: currentDate,
        cals: document.getElementById("coolCals").value
    })
}

// Write Other Workout Data to the Database
function other_writeData() {
    // Write to "Date" Child
    firebase.database().ref(currentDate).set({
        // Type of Other Workout
        other_type: document.getElementById("other_type").value,
        // Location of Other Workout
        other_location: document.getElementById("other_location").value,
    })
    // Write to Specific Workout Folders:
    var Type = document.getElementById("other_type").value;
    firebase.database().ref(Type).push({
        date: currentDate,
        location: document.getElementById("other_location").value
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
    // Back Squats
    firebase.database().ref("bSquat").limitToLast(1).on('child_added', function(childSnapshot){
        bSquat = childSnapshot.val();
        document.getElementById("prev_bSquat").innerHTML = bSquat.bSquat_weight;
    })
    // Front Squats
    firebase.database().ref("fSquat").limitToLast(1).on('child_added', function(childSnapshot){
        fSquat = childSnapshot.val();
        document.getElementById("prev_fSquat").innerHTML = fSquat.fSquat_weight;
    })
    // Lunges
    firebase.database().ref("Lunge").limitToLast(1).on('child_added', function(childSnapshot){
        Lunge = childSnapshot.val();
        document.getElementById("prev_Lunge").innerHTML = Lunge.Lunge_weight;
    })
    // Calf Raises
    firebase.database().ref("calfRaise").limitToLast(1).on('child_added', function(childSnapshot){
        calfRaise = childSnapshot.val();
        document.getElementById("prev_calfRaise").innerHTML = calfRaise.calfRaise_weight;
    })
    // Leg Extensions
    firebase.database().ref("legExt").limitToLast(1).on('child_added', function(childSnapshot){
        legExt = childSnapshot.val();
        document.getElementById("prev_legExt").innerHTML = legExt.legExt_weight;
    })
    // Hamstring Curls
    firebase.database().ref("hCurl").limitToLast(1).on('child_added', function(childSnapshot){
        hCurl = childSnapshot.val();
        document.getElementById("prev_hCurl").innerHTML = hCurl.hCurl_weight;
    })
    // Deadlifts
    firebase.database().ref("dLift").limitToLast(1).on('child_added', function(childSnapshot){
        dLift = childSnapshot.val();
        document.getElementById("prev_dLift").innerHTML = dLift.dLift_weight;
    })
    // Back Extensions
    firebase.database().ref("backExt").limitToLast(1).on('child_added', function(childSnapshot){
        backExt = childSnapshot.val();
        document.getElementById("prev_backExt").innerHTML = backExt.backExt_weight;
    })
    // Plank
    firebase.database().ref("Plank").limitToLast(1).on('child_added', function(childSnapshot){
        Plank = childSnapshot.val();
        document.getElementById("prev_Plank").innerHTML = Plank.Plank_time;
    })
    // Side Plank
    firebase.database().ref("sidePlank").limitToLast(1).on('child_added', function(childSnapshot){
        sidePlank = childSnapshot.val();
        document.getElementById("prev_sidePlank").innerHTML = sidePlank.sidePlank_time;
    })
    // Scissor Kicks
    firebase.database().ref("sKick").limitToLast(1).on('child_added', function(childSnapshot){
        sKick = childSnapshot.val();
        document.getElementById("prev_sKick").innerHTML = sKick.sKick_reps;
    })
    // Mason Twists
    firebase.database().ref("mTwist").limitToLast(1).on('child_added', function(childSnapshot){
        mTwist = childSnapshot.val();
        document.getElementById("prev_mTwist").innerHTML = mTwist.mTwist_weight;
    })
}
