window.onload = function() {

function weatherBalloon() {
  var key = 'c0794ec51c65c91d851ce2adead7a547';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=6173331&APPID=' + key)  
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
    // Used to bypass CORS
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const key = 'c0794ec51c65c91d851ce2adead7a547';
    const weatherurl = 'https://api.openweathermap.org/data/2.5/weather?id=6173331&APPID=' + key;
    const weatherfetchurl = proxyurl + weatherurl;
    // Retrieve OpenWeather API
    $.ajax({
            url: weatherfetchurl,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            },
            success: function (data) {
                document.getElementsByClassName("current_weather")[0].innerHTML = data.weather[0].main;
                document.getElementsByClassName("current_humidity")[0].innerHTML = data.main.humidity.toString();
                document.getElementsByClassName("current_temperature")[0].innerHTML = data.main.temp.toString();
                document.getElementsByClassName("current_pressure")[0].innerHTML = data.main.pressure.toString();
            }
        }
    )

    const dataurl = "https://sjz0wzrz11.execute-api.us-west-2.amazonaws.com/prod/helloworld?&TableName=teststorage";
    const datafetchurl = proxyurl + dataurl;
    $.ajax({
        url: datafetchurl,
        method: 'GET',
        dataType: 'json',
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
        success: function (data) {
            // Chart.js Data
            var moisture = []
            var humidity = [];
            var temperature = [];
            var light = [];

            // Dashboard Data
            var last_temperature = document.getElementsByClassName("last_temperature");
            var last_light = document.getElementsByClassName("last_light");
            var current_weather = document.getElementsByClassName("current_weather");
            var current_temperature = document.getElementsByClassName("current_temperature");
            var current_humidity = document.getElementsByClassName("current_humidity");
            var current_pressure = document.getElementsByClassName("current_pressure");

            // Get last 12 items
            lastTwelveItems = data.Items.slice(-12, data.Items.length);
            for (var i = 0; i < lastTwelveItems.length; i++) {
                moisture.push(lastTwelveItems[i]["moisture"]);
                humidity.push(lastTwelveItems[i]["humidity"]);
                temperature.push(lastTwelveItems[i]["temperature"]);
                light.push(lastTwelveItems[i]["light"]);
            }

            // Push Dashboard Data
            document.getElementsByClassName("last_moisture")[0].innerHTML = moisture.slice(-1)[0];
            document.getElementsByClassName("last_humidity")[0].innerHTML = humidity.slice(-1)[0];
            document.getElementsByClassName("last_temperature")[0].innerHTML = temperature.slice(-1)[0];
            document.getElementsByClassName("last_light")[0].innerHTML = light.slice(-1)[0];

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
            options:{
                responsive: true,
                scales: {
                    xAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }],
                    yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Moisture %',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }]
                }
            }
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
            options:{
                responsive: true,
                scales: {
                    xAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }],
                    yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperature (°C)',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }]
                }
            }
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
            options:{
                responsive: true,
                scales: {
                    xAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }],
                    yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Humidity %',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }]
                }
            }
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
            options:{
                responsive: true,
                scales: {
                    xAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }],
                    yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Light %',
                        },
                        ticks: {
                            fontSize: 15
                        }
                    }]
                }
            }
        });
        }
    })
}
