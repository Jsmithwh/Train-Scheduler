var config = {
    apiKey: "AIzaSyCrvLAXRoiTtxayusG6dM98wQEBjDmQoDk",
    authDomain: "train-scheduler-caffe.firebaseapp.com",
    databaseURL: "https://train-scheduler-caffe.firebaseio.com",
    projectId: "train-scheduler-caffe",
    storageBucket: "train-scheduler-caffe.appspot.com",
    messagingSenderId: "231394129200"
  };
  firebase.initializeApp(config);

  //borrowed from exercise 17- edited and moved things around a bit

  var database = firebase.database();

// 2. Button for adding train info
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empTrain = $("#train-name-input").val().trim();
  var empDest = $("#destination-input").val().trim();
//   var empTime = moment($("#train-time").val().trim(), "HH:mm");
//   console.log('Train Name', emptrain);
  var empFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empTrain,
    dest: empDest,
    // time: empTime,
    freq: empFreq
  };

  // Uploads train data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.dest);
  console.log(newEmp.time);
  console.log(newEmp.freq);

  alert("Here's your train, dude!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empTrain = childSnapshot.val().name;
  var empDest = childSnapshot.val().dest;
  var empTime = childSnapshot.val().time;
  var empFreq = childSnapshot.val().freq;

  // Employee Info
  console.log(empTrain);
  console.log(empDest);
  console.log(empTime);
  console.log(empFreq);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empTrain),
    $("<td>").text(empDest),
    $("<td>").text(empFreq)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
