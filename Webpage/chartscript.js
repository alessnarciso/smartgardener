window.onload = function() {
    $.ajax({
        // Dummy GET endpoint
        url: "https://elec391group3.free.beeceptor.com/",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Parse JSON data
            numbers = [];
            for (var num in data) {
                numbers.push(Number(data[num]))
            }
            console.log(numbers)
            var ctx = document.getElementById("myChart");
            var temptx = document.getElementById("tempChart");
            var lighttx = document.getElementById("lightChart");
            var humidtx = document.getElementById("humidChart");
            /*
            var lineChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                  label: "2015",
                  data: numbers
                }]
              }
            })
            */
            let moistureChart = new Chart(ctx, {
            type:'line', //bar, horizontal bar, pie, line, dougnut, radar, polarArea
            data:{
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs','13 hrs','14 hrs','15 hrs','16 hrs','17 hrs','18 hrs','19 hrs','20 hrs','21 hrs','22 hrs','23 hrs','24 hrs'],
                datasets:[{
                    label:'Water by Weight',
                    data:[
                        99,
                        80,
                        76,
                        64,
                        53,
                        83,
                        46,
                        23,
                        5,
                        14,
                        20,
                        16,
                        54,
                        79
                    ],
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
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs','13 hrs','14 hrs','15 hrs','16 hrs','17 hrs','18 hrs','19 hrs','20 hrs','21 hrs','22 hrs','23 hrs','24 hrs'],
                datasets:[{
                    label:'Water by Weight',
                    data:[
                        99,
                        80,
                        76,
                        64,
                        53,
                        83,
                        46,
                        23,
                        5,
                        14,
                        20,
                        16,
                        54,
                        79
                    ],
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
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs','13 hrs','14 hrs','15 hrs','16 hrs','17 hrs','18 hrs','19 hrs','20 hrs','21 hrs','22 hrs','23 hrs','24 hrs'],
                datasets:[{
                    label:'Water by Weight',
                    data:[
                        99,
                        80,
                        76,
                        64,
                        53,
                        83,
                        46,
                        23,
                        5,
                        14,
                        20,
                        16,
                        54,
                        79
                    ],
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
                labels:['1 hrs','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs','9 hrs','10 hrs','11 hrs','12 hrs','13 hrs','14 hrs','15 hrs','16 hrs','17 hrs','18 hrs','19 hrs','20 hrs','21 hrs','22 hrs','23 hrs','24 hrs'],
                datasets:[{
                    label:'Water by Weight',
                    data:[
                        99,
                        80,
                        76,
                        64,
                        53,
                        83,
                        46,
                        23,
                        5,
                        14,
                        20,
                        16,
                        54,
                        79
                    ],
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