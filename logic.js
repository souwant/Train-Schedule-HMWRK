var config = {
    apiKey: "AIzaSyBQQYe-X5yX1epzWvMViTXxXzBaedv823s",
      authDomain: "bcsproject-6c4da.firebaseapp.com",
      databaseURL: "https://bcsproject-6c4da.firebaseio.com",
      projectId: "bcsproject-6c4da",
      storageBucket: "bcsproject-6c4da.appspot.com",
      messagingSenderId: "383437203749"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
   
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTraintime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    
    var newTrain = {
      name: trainName,
      des: destination,
      time: firstTraintime,
      freq: frequency
    };
  
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.des);
    console.log(newTrain.time);
    console.log(newTrain.freq);
  
  
    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
 
  database.ref().on("child_added", function(data) {
    console.log(data.val());
  
   
    var trainName = data.val().name;
    var destination = data.val().des;
    var firstTraintime = data.val().time;
    var frequency = data.val().freq;
  

    console.log(trainName);
    console.log(destination);
    console.log(firstTraintime);
    console.log(frequency);
  
    
    var firstTimeConverted = moment(firstTraintime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
   
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
  
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
   
    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
  
   
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(tMinutesTillTrain)
  
    );
  
    $("#train-table > tbody").append(newRow);
  });
  