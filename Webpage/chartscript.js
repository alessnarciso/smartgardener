window.onload = function() {

function weatherBalloon( cityID ) {
  var key = 'c0794ec51c65c91d851ce2adead7a547';
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID + '&APPID=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(w_data) {
    drawWeather(w_data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
  var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  
  document.getElementById('description').innerHTML = d.weather[0].description;
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;
}

    $.ajax({
        // Dummy GET endpoint
        url: "https://sjz0wzrz11.execute-api.us-west-2.amazonaws.com/prod/helloworld?&TableName=teststorage",
        method: 'GET',
        dataType: 'json',
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
        success: function (data) {
            // Parse JSON data
            moisture = []
            humidity = [];
            temperature = [];
            light = [];
            // Get last 12 items
            lastTwelveItems = data.Items.slice(-12, data.Items.length);
            for (var i = 0; i < lastTwelveItems.length; i++) {
                console.log(lastTwelveItems[i]);
                moisture.push(lastTwelveItems[i]["moisture"]);
                humidity.push(lastTwelveItems[i]["humidity"]);
                temperature.push(lastTwelveItems[i]["temperature"]);
                light.push(lastTwelveItems[i]["light"]);
            }
            /*
            for (var num in data) {
                numbers.push(Number(data[num]))
            }
            */
            var ctx = document.getElementById("myChart");
            var temptx = document.getElementById("tempChart");
            var lighttx = document.getElementById("lightChart");
            var humidtx = document.getElementById("humidChart");
            let moistureChart = new Chart(ctx, {
            type:'line', //bar, horizontal bar, pie, line, dougnut, radar, polarArea
            data:{
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs'],
                datasets:[{
                    label:'Moisture',
                    data: moisture,
                    backgroundColor:[
                        '#4AA0E2',
                    ],
                    borderWidth:1,
                    borderColor:'#777',
                    hoverBorderWidth:3,
                    hoverBorderColor:'#333',
                }]
            },
            options:{}
        });
        let temperatureChart = new Chart(temptx, {
            type:'line', //bar, horizontal bar, pie, line, dougnut, radar, polarArea
            data:{
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs'],
                datasets:[{
                    label:'Temperature',
                    data: temperature,
                    backgroundColor:[
                        '#F3CA58',
                    ],
                    borderWidth:1,
                    borderColor:'#777',
                    hoverBorderWidth:3,
                    hoverBorderColor:'#333',

                }]
            },
            options:{}
        });
        let humidityChart = new Chart(humidtx, {
            type:'line', //bar, horizontal bar, pie, line, dougnut, radar, polarArea
            data:{
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs'],
                datasets:[{
                    label:'Humidity',
                    data: humidity,
                    backgroundColor:[
                        '#7DE55D',
                    ],
                    borderWidth:1,
                    borderColor:'#777',
                    hoverBorderWidth:3,
                    hoverBorderColor:'#333',

                }]
            },
            options:{}
        });
        let lightChart = new Chart(lighttx, {
            type:'line', //bar, horizontal bar, pie, line, dougnut, radar, polarArea
            data:{
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs'],
                datasets:[{
                    label:'Light',
                    data:light,
                    backgroundColor:[
                        '#F65353',
                    ],
                    borderWidth:1,
                    borderColor:'#777',
                    hoverBorderWidth:3,
                    hoverBorderColor:'#333',

                }]
            },
            options:{}
        });
        }
    })
}
