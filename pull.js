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
        document.getElementById("prev_rowMachine").innerHTML = rowMachine.rowMachine_time;
    })
}

// Get Chart Data and Render
function getCharts() {

    // Bentover Rows
    var ref = firebase.database().ref("boRow")
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
                weights.push(data[i].boRow_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('boRow_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Bentover Row",
                                data: chart,
                                fill: false,
                                borderColor: 'blue'
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

    // Shrugs
    var ref = firebase.database().ref("Shrug")
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
                weights.push(data[i].Shrug_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('Shrug_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Shrug",
                                data: chart,
                                fill: false,
                                borderColor: 'blue'
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
    
    // Seated Rows
    var ref = firebase.database().ref("seatRow")
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
                weights.push(data[i].seatRow_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('seatRow_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Seated Rows",
                                data: chart,
                                fill: false,
                                borderColor: 'blue'
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
        
    // Lateral Pulldowns
    var ref = firebase.database().ref("latPD")
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
                weights.push(data[i].latPD_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('latPD_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Lateral Pulldowns",
                                data: chart,
                                fill: false,
                                borderColor: 'blue'
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

    // Face Pulls
    var ref = firebase.database().ref("facePull")
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
                weights.push(data[i].facePull_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('facePull_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Face Pulls",
                                data: chart,
                                fill: false,
                                borderColor: 'blue'
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