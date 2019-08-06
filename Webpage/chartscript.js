//let myChart = document.getElementById('myChart').getContext('2d');

    // Global Options
    //Chart.defaults.global.defaultFontFamily = 'Lato';
    //Chart.defaults.global.defaultFontSize = 18;
    /*
    let moistureChart = new Chart('myChart', {
        type:'bar', //bar, horizontal bar, pie, line, dougnut, radar, polarArea
        data:{
           labels:['RoseGarden', 'Nitobe Garden', 'Macleod Bushes'],
           datasets:[{
                label:'Percentage of Water by Weight',
                data:[13,16,18],
                backgroundColor:[
                    'blue',
                    'red',
                    'green'
                ],
                borderWidth:1,
                borderColor:'#777',
                hoverBorderWidth:3,
                hoverBorderColor:'#333'
            }]
        },
        options:{}
    });
    */

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
        }
    })
}