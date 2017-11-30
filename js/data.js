$(function() {
    var params = {
        "api_key": "26f124d5649548e98278ada8ebaee201",
        "StationCodes": "All",
        // Request parameters
        "Lat": "",
        "Lon": "",
        // "StationCode": "",
        "Radius": "10",
    };
    var data = [];
    $.when(
      $.get("https://api.wmata.com/TrainPositions/TrainPositions?contentType={contentType}&" + $.param(params), function(positions) {
        data.positions = positions.TrainPositions;
      }),
      $.get("https://api.wmata.com/Incidents.svc/json/Incidents?" + $.param(params), function(incidents) {
        data.incidents = incidents.Incidents;
      }),
      $.get("https://api.wmata.com/Rail.svc/json/jLines?" + $.param(params),function(lines) {
        data.lines = lines.Lines;
      }),
      $.get("https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?" + $.param(params), function(prediction) {
        data.prediction = prediction.Trains;
      }),
      $.get("https://api.wmata.com/Rail.svc/json/jStationTimes?" + $.param(params), function(stationTimes) {
        data.stationTimes = stationTimes.StationTimes;
      })
    ).then(function() {
      function onReady(callback) {
          var intervalID = window.setInterval(checkReady, 1000);
          function checkReady() {
              if (window.userPos !== undefined ) {
                window.clearInterval(intervalID);
                callback.call(this);
                params.Lat = window.userPos.lat;
                params.Lon = window.userPoslon;

                $.get("https://api.wmata.com/Rail.svc/json/jStationEntrances?" + $.param(params), function(enterances) {

                  data.enterances = enterances.Entrances;
                  // console.log(data.enterances);

                  // data.codes = [];
                  // $.each(data.enterances, function(i, el){
                  //   console.log(data.enterances[i].StationCode1);
                  // });




                });
                // $.each(data.lines, function(index){
                //   console.log(data.lines[index]);
                //   $("body").append("<a class='linkup' href='" + data.lines[index].DisplayName.toLowerCase() +".html'><div class='trainline " + data.lines[index].LineCode  + "'>" 
                //     + "<div><h1>" + data.lines[index].DisplayName + "</h1></div>" 
                //     + "<div>" + "<p class='time'> <p>" + "</div>" + 
                //     "</div></a>");
                // });


                $("body").append("<a href='orange1.html'><img src='img/TrainLines.png' /></a>");
              }
          }
      }

      function show(id, value) {
          document.getElementById(id).style.display = value ? 'block' : 'none';
      }

      onReady(function () {
          // show('page', true);
          show('loading', false);
      });
    });
});