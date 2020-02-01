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

// Get Previous Workout Data from the Database
function getData() {
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

// Get Chart Data and Render
function getCharts() {

    // Deadlifts
    var ref = firebase.database().ref("dLift")
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
                weights.push(data[i].dLift_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('dLift_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Deadlifts",
                                data: chart,
                                fill: false,
                                borderColor: 'black'
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

    // Back Extensions
    var ref = firebase.database().ref("backExt")
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
                weights.push(data[i].backExt_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('backExt_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Back Extensison",
                                data: chart,
                                fill: false,
                                borderColor: 'black'
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

    // Plank
    var ref = firebase.database().ref("Plank")
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
                weights.push(data[i].Plank_time);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('Plank_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Plank",
                                data: chart,
                                fill: false,
                                borderColor: 'black'
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
                                    labelString: 'Time (s)'
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

    // Side Plank
    var ref = firebase.database().ref("sidePlank")
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
                weights.push(data[i].sidePlank_time);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('sidePlank_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Side Plank",
                                data: chart,
                                fill: false,
                                borderColor: 'black'
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
                                    labelString: 'Time (s)'
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

    // Mason Twists
    var ref = firebase.database().ref("mTwist")
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
                weights.push(data[i].mTwist_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            buffer = sorted / 2;
            y_max = sorted + buffer;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('mTwist_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Mason Twists",
                                data: chart,
                                fill: false,
                                borderColor: 'black'
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