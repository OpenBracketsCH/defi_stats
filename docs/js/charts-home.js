"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let base_url = "https://defistatsbackend.azurewebsites.net/"
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
                            max: 60,
                            min: 10,
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
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            datasets: [
                {
                    label: "Page Visitors",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#864DD9",
                    pointBorderColor: "#864DD9",
                    pointHoverBackgroundColor: "#864DD9",
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
                    data: [20, 27, 20, 35, 30, 40, 33, 25, 39],
                    spanGaps: false,
                },
                {
                    label: "Page Views",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#EF8C99",
                    pointBorderColor: "#EF8C99",
                    pointHoverBackgroundColor: "#EF8C99",
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
                    pointHitRadius: 10,
                    data: [25, 17, 28, 25, 33, 27, 30, 33, 27],
                    spanGaps: false,
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    const BARCHARTEXMPLE1 = document.getElementById("barChartExample1");
    let color_arr = []
    for (var idx=0; idx < response["bar_data"]["label"].length; idx++){
        color_arr.push("rgba(134, 77, 217, 0.57)");
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
                    label: "count",
                    backgroundColor: color_arr,
                    hoverBackgroundColor: color_arr,
                    borderColor: color_arr,
                    borderWidth: 1,
                    data: response["bar_data"]["data"],
                },
                // {
                //     label: "Data Set 2",
                //     backgroundColor: [
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //     ],
                //     hoverBackgroundColor: [
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //     ],
                //     borderColor: [
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //         "rgba(75, 75, 75, 0.7)",
                //     ],
                //     borderWidth: 1,
                //     data: [35, 40, 60, 47, 88, 27, 30],
                // },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Line Chart 1
    // ------------------------------------------------------ //
    // const LINECHART1 = document.getElementById("lineChart1");
    // var myLineChart1 = new Chart(LINECHART1, {
    //     type: "line",
    //     options: {
    //         scales: {
    //             xAxes: [
    //                 {
    //                     display: true,
    //                     gridLines: {
    //                         display: false,
    //                     },
    //                 },
    //             ],
    //             yAxes: [
    //                 {
    //                     ticks: {
    //                         max: 40,
    //                         min: 10,
    //                         stepSize: 0.1,
    //                     },
    //                     display: false,
    //                     gridLines: {
    //                         display: false,
    //                     },
    //                 },
    //             ],
    //         },
    //         legend: {
    //             display: true,
    //         },
    //     },
    //     data: {
    //         labels: [
    //             "A",
    //             "B",
    //             "C",
    //             "D",
    //             "E",
    //             "F",
    //             "G",
    //             "H",
    //             "I",
    //             "J",
    //             "K",
    //             "L",
    //             "M",
    //             "L",
    //             "M",
    //             "N",
    //             "O",
    //             "P",
    //             "Q",
    //             "R",
    //             "S",
    //             "T",
    //         ],
    //         datasets: [
    //             {
    //                 label: "Team Drills",
    //                 fill: true,
    //                 lineTension: 0.3,
    //                 backgroundColor: "transparent",
    //                 borderColor: "#EF8C99",
    //                 pointBorderColor: "#EF8C99",
    //                 pointHoverBackgroundColor: "#EF8C99",
    //                 borderCapStyle: "butt",
    //                 borderDash: [],
    //                 borderDashOffset: 0.0,
    //                 borderJoinStyle: "miter",
    //                 borderWidth: 2,
    //                 pointBackgroundColor: "#EF8C99",
    //                 pointBorderWidth: 2,
    //                 pointHoverRadius: 4,
    //                 pointHoverBorderColor: "#fff",
    //                 pointHoverBorderWidth: 0,
    //                 pointRadius: 1,
    //                 pointHitRadius: 0,
    //                 data: [20, 21, 25, 22, 24, 18, 20, 23, 19, 22, 25, 19, 24, 27, 22, 17, 20, 17, 20, 26, 22],
    //                 spanGaps: false,
    //             },
    //             {
    //                 label: "Team Drills",
    //                 fill: true,
    //                 lineTension: 0.3,
    //                 backgroundColor: "transparent",
    //                 borderColor: "rgba(238, 139, 152, 0.24)",
    //                 pointBorderColor: "rgba(238, 139, 152, 0.24)",
    //                 pointHoverBackgroundColor: "rgba(238, 139, 152, 0.24)",
    //                 borderCapStyle: "butt",
    //                 borderDash: [],
    //                 borderDashOffset: 0.0,
    //                 borderJoinStyle: "miter",
    //                 borderWidth: 2,
    //                 pointBackgroundColor: "rgba(238, 139, 152, 0.24)",
    //                 pointBorderWidth: 2,
    //                 pointHoverRadius: 4,
    //                 pointHoverBorderColor: "#fff",
    //                 pointHoverBorderWidth: 0,
    //                 pointRadius: 1,
    //                 pointHitRadius: 0,
    //                 data: [24, 20, 23, 19, 22, 20, 25, 21, 23, 19, 21, 23, 19, 24, 19, 22, 21, 24, 19, 21, 20],
    //                 spanGaps: false,
    //             },
    //         ],
    //     },
    // });

    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    // const BARCHARTEXaMPLE2 = document.getElementById("barChartExample2");
    // var barChartExample = new Chart(BARCHARTEXaMPLE2, {
    //     type: "bar",
    //     options: {
    //         scales: {
    //             xAxes: [
    //                 {
    //                     display: false,
    //                     gridLines: {
    //                         color: "#eee",
    //                     },
    //                 },
    //             ],
    //             yAxes: [
    //                 {
    //                     display: false,
    //                     gridLines: {
    //                         color: "#eee",
    //                     },
    //                 },
    //             ],
    //         },
    //     },
    //     data: {
    //         labels: ["January", "February", "March", "April", "May", "June", "July"],
    //         datasets: [
    //             {
    //                 label: "Data Set 1",
    //                 backgroundColor: [
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                 ],
    //                 hoverBackgroundColor: [
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                 ],
    //                 borderColor: [
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                     "rgba(75, 75, 75, 0.7)",
    //                 ],
    //                 borderWidth: 1,
    //                 data: [65, 59, 80, 81, 56, 55, 40],
    //             },
    //             {
    //                 label: "Data Set 2",
    //                 backgroundColor: [
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                 ],
    //                 hoverBackgroundColor: [
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                     "rgba(238, 139, 152, 0.7)",
    //                 ],
    //                 borderColor: [
    //                     "rgba(238, 139, 152, 1)",
    //                     "rgba(238, 139, 152, 1)",
    //                     "rgba(238, 139, 152, 1)",
    //                     "rgba(238, 139, 152, 1)",
    //                     "rgba(238, 139, 152, 1)",
    //                     "rgba(238, 139, 152, 1)",
    //                     "rgba(238, 139, 152, 1)",
    //                 ],
    //                 borderWidth: 1,
    //                 data: [35, 40, 60, 47, 88, 27, 30],
    //             },
    //         ],
    //     },
    // });

    // ------------------------------------------------------- //
    // Pie Chart 1
    // ------------------------------------------------------ //
    const PIECHARTHOME1 = document.getElementById("pieChartHome1");
    var myPieChart = new Chart(PIECHARTHOME1, {
        type: "doughnut",
        options: {
            cutoutPercentage: 90,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["Opening", "24/7"],
            datasets: [
                {
                    data: [response["pie_data"]["open_only"], response["pie_data"]["open_24"]],
                    borderWidth: [0, 0],
                    backgroundColor: ["#6933b9", "#8553d1"],
                    hoverBackgroundColor: ["#6933b9", "#8553d1"],
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
            cutoutPercentage: 90,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["Unknown", "Opening"],
            datasets: [
                {
                    data: [response["pie_data"]["unknown"], response["pie_data"]["open_only"] + response["pie_data"]["open_24"]],
                    borderWidth: [0, 0],
                    backgroundColor: ["#9528b9", "#b046d4"],
                    hoverBackgroundColor: ["#9528b9", "#b046d4"],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Pie Chart 3
    // ------------------------------------------------------ //
    // const PIECHARTHOME3 = document.getElementById("pieChartHome3");
    // var myPieChart = new Chart(PIECHARTHOME3, {
    //     type: "doughnut",
    //     options: {
    //         cutoutPercentage: 90,
    //         legend: {
    //             display: false,
    //         },
    //     },
    //     data: {
    //         labels: ["First", "Second", "Third", "Fourth"],
    //         datasets: [
    //             {
    //                 data: [120, 90, 77, 95],
    //                 borderWidth: [0, 0, 0, 0],
    //                 backgroundColor: ["#da4d60", "#e96577", "#f28695", "#ffb6c1"],
    //                 hoverBackgroundColor: ["#da4d60", "#e96577", "#f28695", "#ffb6c1"],
    //             },
    //         ],
    //     },
    // });

    // ------------------------------------------------------- //
    // Sales Bar Chart 1
    // ------------------------------------------------------ //
    // const SALESBARCHART1 = document.getElementById("salesBarChart1");
    // var barChartHome = new Chart(SALESBARCHART1, {
    //     type: "bar",
    //     options: {
    //         scales: {
    //             xAxes: [
    //                 {
    //                     display: false,
    //                     barPercentage: 0.2,
    //                 },
    //             ],
    //             yAxes: [
    //                 {
    //                     display: false,
    //                 },
    //             ],
    //         },
    //         legend: {
    //             display: false,
    //         },
    //     },
    //     data: {
    //         labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    //         datasets: [
    //             {
    //                 label: "Data Set 1",
    //                 backgroundColor: [
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                 ],
    //                 borderColor: [
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                     "#EF8C99",
    //                 ],
    //                 borderWidth: 0.2,
    //                 data: [35, 55, 65, 85, 40, 30, 18, 35, 20, 70],
    //             },
    //         ],
    //     },
    // });

    // ------------------------------------------------------- //
    // Sales Bar Chart 21
    // ------------------------------------------------------ //
    // const SALESBARCHART2 = document.getElementById("salesBarChart2");
    // var barChartHome = new Chart(SALESBARCHART2, {
    //     type: "bar",
    //     options: {
    //         scales: {
    //             xAxes: [
    //                 {
    //                     display: false,
    //                     barPercentage: 0.2,
    //                 },
    //             ],
    //             yAxes: [
    //                 {
    //                     display: false,
    //                 },
    //             ],
    //         },
    //         legend: {
    //             display: false,
    //         },
    //     },
    //     data: {
    //         labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    //         datasets: [
    //             {
    //                 label: "Data Set 1",
    //                 backgroundColor: [
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                 ],
    //                 borderColor: [
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                     "#CF53F9",
    //                 ],
    //                 borderWidth: 0.2,
    //                 data: [44, 75, 65, 34, 60, 45, 22, 35, 30, 63],
    //             },
    //         ],
    //     },
    // });

    // ------------------------------------------------------- //
    // Pie Chart
    // ------------------------------------------------------ //
    // const VISITPIECHART = document.getElementById("visitPieChart");
    // var pieChartExample = new Chart(VISITPIECHART, {
    //     type: "pie",
    //     options: {
    //         legend: {
    //             display: false,
    //         },
    //     },
    //     data: {
    //         labels: ["A", "B", "C", "D"],
    //         datasets: [
    //             {
    //                 data: [300, 50, 100, 80],
    //                 borderWidth: 0,
    //                 backgroundColor: ["#723ac3", "#864DD9", "#9762e6", "#a678eb"],
    //                 hoverBackgroundColor: ["#723ac3", "#864DD9", "#9762e6", "#a678eb"],
    //             },
    //         ],
    //     },
    // });

    var pieChartExample = {
        responsive: true,
    };
});
