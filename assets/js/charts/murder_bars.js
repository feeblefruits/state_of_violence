// set the dimensions and margins of the graph
var murder_bar_margin = {top: 30, right: 30, bottom: 90, left: 60},
    murder_bar_width = 600 - murder_bar_margin.left - murder_bar_margin.right,
    murder_bar_height = 400 - murder_bar_margin.top - murder_bar_margin.bottom;

// append the svg object to the body of the page
var svg_bar = d3.select("#murder_bar_chart")
  .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 400")
  .append("g")
    .attr("transform",
          "translate(" + murder_bar_margin.left + "," + murder_bar_margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/feeblefruits/state_of_violence/body-development/assets/data/world_bank_murders_per_100000%20_bar_compare_v2.csv", function(data) {

  // sort data
  data.sort(function(b, a) {
    return a.Value - b.Value;
  });

  // X axis
  var x = d3.scaleBand()
    .range([ 0, murder_bar_width ])
    .domain(data.map(function(d) { return d.country_name; }))
    .padding(0.2);
  svg_bar.append("g")
    .attr("transform", "translate(0," + murder_bar_height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")

  svg_bar.append("text")
    .attr("x", (murder_bar_width / 2))             
    .attr("y", 0 - (murder_bar_margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "12px") 
    .text("Murder rate per 100,000 people of selected countries");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 80])
    .range([ murder_bar_height, 0]);
  svg_bar.append("g")
    .call(d3.axisLeft(y));

  function colorPicker(v) {
    if (v == 41.68) {
      return "#11a579";
    } else {
      return "#be0000";
    }
  }

  // Bars
  svg_bar.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.country_name); })
      .attr("y", function(d) { return y(d.average); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return murder_bar_height - y(d.average); })
      .attr("fill", function(d) { return colorPicker(d.average); })

})