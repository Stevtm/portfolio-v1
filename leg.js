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

// Load Previous Day Information from the Database
window.onload = getData();

// Load Charts 
window.onload = getCharts();

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

// Get Previous Workout Data from the Database
function getData() {
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
}

// Get Chart Data and Render
function getCharts() {

    // Back Squats
    var ref = firebase.database().ref("bSquat")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].bSquat_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('bSquat_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Back Squat",
                                data: chart,
                                fill: false,
                                borderColor: 'green'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })
    
    // Front Squats
    var ref = firebase.database().ref("fSquat")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].fSquat_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('fSquat_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Front Squat",
                                data: chart,
                                fill: false,
                                borderColor: 'green'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // Lunges
    var ref = firebase.database().ref("Lunge")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].Lunge_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('Lunge_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Lunges",
                                data: chart,
                                fill: false,
                                borderColor: 'green'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // Calf Raises
    var ref = firebase.database().ref("calfRaise")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].calfRaise_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('calfRaise_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Calf Raises",
                                data: chart,
                                fill: false,
                                borderColor: 'green'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // Leg Extensions
    var ref = firebase.database().ref("legExt")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].legExt_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('legExt_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Leg Extensions",
                                data: chart,
                                fill: false,
                                borderColor: 'green'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // Hamstring Curls
    var ref = firebase.database().ref("hCurl")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].hCurl_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('hCurl_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Hamstring Curls",
                                data: chart,
                                fill: false,
                                borderColor: 'green'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

}