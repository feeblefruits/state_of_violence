// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_bar = d3.select("#murder_bar_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/feeblefruits/state_of_violence/body-development/assets/data/world_bank_murders_per_100000%20_bar_compare_v2.csv", function(data) {

  // sort data
  data.sort(function(b, a) {
    return a.Value - b.Value;
  });

  // X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.country_name; }))
    .padding(0.2);
  svg_bar.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 80])
    .range([ height, 0]);
  svg_bar.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg_bar.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.country_name); })
      .attr("y", function(d) { return y(d.average); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.average); })
      .attr("fill", "#be0000")

})