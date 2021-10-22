$( document ).ready(function() {
    //------------------------1. PREPARATION------------------------//
    //-----------------------------SVG------------------------------//
    var width = 700;
    var height = 500;
    const margin = 5;
    const padding = 5;
    const adj = 30;
    // we are appending SVG first
    const svg = d3.select("div#container").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-"
            + adj + " -"
            + adj + " "
            + (width + adj * 3) + " "
            + (height + adj * 3))
        .style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);

    //-----------------------------DATA-----------------------------//
    const timeConv = d3.timeParse("%d-%b-%Y");
    const dataset = d3.csv("data.csv");
    dataset.then(function (data) {
        var slices = data.columns.slice(1).map(function (id) {
            return {
                id: id,
                values: data.map(function (d) {
                    return {
                        date: timeConv(d.date),
                        measurement: +d[id]
                    };
                })
            };
        });
//----------------------------SCALES----------------------------//
        const xScale = d3.scaleTime().range([0, width]);
        const yScale = d3.scaleLinear().rangeRound([height, 0]);
        xScale.domain(d3.extent(data, function (d) {
            return timeConv(d.date)
        }));
        yScale.domain([(0), d3.max(slices, function (c) {
            return d3.max(c.values, function (d) {
                return d.measurement + 4;
            });
        })
        ]);

//-----------------------------AXES-----------------------------//
        const yaxis = d3.axisLeft()
            .ticks((slices[0].values).length)
            .scale(yScale);

        const xaxis = d3.axisBottom()
            .ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat('%b %d'))
            .scale(xScale);

//----------------------------LINES-----------------------------//
        const line = d3.line()
            .x(function (d) {
                return xScale(d.date);
            })
            .y(function (d) {
                return yScale(d.measurement);
            });

        let id = 0;
        const ids = function () {
            return "line-" + id++;
        }
//-------------------------2. DRAWING---------------------------//
//-----------------------------AXES-----------------------------//
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xaxis);

        svg.append("g")
            .attr("class", "axis")
            .call(yaxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", ".75em")
            .attr("y", 6)
            .style("text-anchor", "end")
            .text("Veränderungen");

//----------------------------LINES-----------------------------//
        const lines = svg.selectAll("lines")
            .data(slices)
            .enter()
            .append("g");

        lines.append("path")
            .attr("class", ids)
            .attr("d", function (d) {
                return line(d.values);
            });

        lines.append("text")
            .attr("class", "serie_label")
            .datum(function (d) {
                return {
                    id: d.id,
                    value: d.values[d.values.length - 1]
                };
            })
            .attr("transform", function (d) {
                return "translate(" + (xScale(d.value.date) + 10)
                    + "," + (yScale(d.value.measurement) + 5) + ")";
            })
            .attr("x", 5)
            .text(function (d) {
                return ("Serie ") + d.id;
            });

    });

    /** pie chart part **/
    var data = d3.range(5).map(Math.random).sort(d3.descending);

    var svg1 = d3.select("#svg1"),
        width = svg1.attr("width"),
        height = svg1.attr("height") - 40,
        radius = Math.min(width, height) / 2;
    var g = svg1.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var title = svg1.append('text')
        .attr('class', 'title')
        .attr('x', width / 2)
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text('Erreichbarkeit 24h');


    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    //Generate groups
    var arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

    // draw second pie chart
    var svg2 = d3.select("#svg2")
    var g2 = svg2.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var title1 = svg2.append('text')
        .attr('class', 'title')
        .attr('x', width / 2)
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text('Ö!nungszeiten unbekannt');

    // Create dummy data
    var data = {a: Math.floor(Math.random()*Math.random()*100), b: Math.floor(Math.random()*Math.random()*100), c:Math.floor(Math.random()*Math.random()*100), d:Math.floor(Math.random()*Math.random()*100), e:Math.floor(Math.random()*Math.random()*100)}

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)




    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    g2.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    g2.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d){ return d.data.key})
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)

});

/**
 * change theme function
 */
function changeTheme(checkbox){
    if (!checkbox.checked){
        document.body.className = document.body.className.replace("bg-white","bg-dark");
        var elementArray = document.getElementsByClassName("text-dark");
        while (elementArray.length) {
            elementArray[0].className = elementArray[0].className.replace("text-dark","text-white");
        }
    }
    else{
        document.body.className = document.body.className.replace("bg-dark","bg-white");
        var elementArray = document.getElementsByClassName("text-white");
        while (elementArray.length) {
            elementArray[0].className = elementArray[0].className.replace("text-white","text-dark");
        }

    }

}