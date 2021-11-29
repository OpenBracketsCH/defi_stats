function loading(){
    let base_url = "https://defistatsbackend.azurewebsites.net/";
    // ------------------------------------------------------- //
    // Set All Defis Data
    // ------------------------------------------------------ //

    var response = '';
    $.ajax({ type: "GET",
        url: base_url + "api",
        async : false,
        success : function(data)
        {
            // response = JSON.parse(data);
            response = data
            $("#show_defi").text(response["all"]);
            $("#show_hours").text(response["hours"]);
            $("#show_dispo").text(response["dispo"]);
            $("#region_data").text(response["bar_data"]["data"][0]);
            $("#pie_opening").html('<strong class="text-lg d-block">' + response["pie_data"]["open_24"] + '</strong>');
            $("#pie_open_only").html('<strong class="text-lg d-block">' + response["pie_data"]["open_only"] + '</strong>');
            $("#pie_unknown").html('<strong class="text-lg d-block">' + response["pie_data"]["unknown"] + '</strong>');
        }
    });

    Chart.defaults.global.defaultFontColor = "#75787c";

    // ------------------------------------------------------- //
    // Line Chart
    // ------------------------------------------------------ //
    var legendState = true;
    if (window.outerWidth < 576) {
        legendState = false;
    }

    const LINECHART = document.getElementById("lineChart");
    const max_val = Math.max.apply(null, response["line_data"]["data"]) + 100;
    const min_val = Math.min.apply(null, response["line_data"]["data"]) - 100;
    var homeLineChart = new Chart(LINECHART, {
        type: "line",
        options: {
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            max: max_val,
                            min: min_val,
                        },
                        display: true,
                        gridLines: {
                            display: false,
                        },
                    },
                ],
            },
            legend: {
                display: legendState,
            },
        },
        data: {
            labels: response["line_data"]["label"],
            datasets: [
                {
                    label: "Datenveränderung",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#3f8d1d",
                    pointBorderColor: "#3f8d1d",
                    pointHoverBackgroundColor: "#3f8d1d",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    borderWidth: 2,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 0,
                    data: response["line_data"]["data"],
                    spanGaps: false,
                }
            ],
        },
    });

    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    const BARCHARTEXMPLE1 = document.getElementById("barChartExample1");
    let color_arr = []
    for (var idx=0; idx < response["bar_data"]["label"].length; idx++){
        color_arr.push("#0959AB");
    }
    var barChartExample = new Chart(BARCHARTEXMPLE1, {
        type: "bar",
        options: {
            scales: {
                xAxes: [
                    {
                        display: false,
                        gridLines: {
                            color: "#eee",
                        },
                    },
                ],
                yAxes: [
                    {
                        display: false,
                        gridLines: {
                            color: "#eee",
                        },
                    },
                ],
            },
        },
        data: {
            labels: response["bar_data"]["label"],
            datasets: [
                {
                    label: "Anzahl nach Kantonen",
                    backgroundColor: color_arr,
                    hoverBackgroundColor: color_arr,
                    borderColor: color_arr,
                    borderWidth: 1,
                    data: response["bar_data"]["data"],
                }
            ],
        },
    });

    // ------------------------------------------------------- //
    // Pie Chart 1
    // ------------------------------------------------------ //
    const PIECHARTHOME1 = document.getElementById("pieChartHome1");
    var myPieChart = new Chart(PIECHARTHOME1, {
        type: "doughnut",
        options: {
            cutoutPercentage: 70,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["Alle Defis", "24h verfügbar"],
            datasets: [
                {
                    data: [response["pie_data"]["all"], response["pie_data"]["open_24"]],
                    borderWidth: [0, 0],
                    backgroundColor: ["#0959AB", "#3f8d1d"],
                    hoverBackgroundColor: ["#0959AB", "#3f8d1d"],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Pie Chart 2
    // ------------------------------------------------------ //
    const PIECHARTHOME2 = document.getElementById("pieChartHome2");
    var myPieChart = new Chart(PIECHARTHOME2, {
        type: "doughnut",
        options: {
            cutoutPercentage: 70,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["Alle Defis", "Öffnungszeiten bekannt"],
            datasets: [
                {
                    data: [response["pie_data"]["all"], response["pie_data"]["open_only"]],
                    borderWidth: [0, 0],
                    backgroundColor: ["#0959AB", "#ffa500"],
                    hoverBackgroundColor: ["#0959AB", "#ffa500"],
                },
            ],
        },
    });

    var pieChartExample = {
        responsive: true,
    };

    // ------------------------------------------------------- //
    // Pie Chart 3
    // ------------------------------------------------------ //
    const PIECHARTHOME3 = document.getElementById("pieChartHome3");
    var myPieChart = new Chart(PIECHARTHOME3, {
        type: "doughnut",
        options: {
            cutoutPercentage: 70,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["Alle Defis", "Öffnungszeiten unbekannt"],
            datasets: [
                {
                    data: [response["pie_data"]["all"], response["pie_data"]["unknown"]],
                    borderWidth: [0, 0],
                    backgroundColor: ["#0959AB", "#990000"],
                    hoverBackgroundColor: ["#0959AB", "#990000"],
                },
            ],
        },
    });

    var pieChartExample = {
        responsive: true,
    };
}

$( document ).ready(function() {
    loading();
    // running function every hour
    setInterval(loading, 1000*60*60);
});


