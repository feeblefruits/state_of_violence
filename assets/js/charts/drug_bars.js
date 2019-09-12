// set the dimensions and margins of the graph
var drug_margin = {top: 30, right: 30, bottom: 90, left: 80},
    drug_width = 800 - drug_margin.left - drug_margin.right,
    drug_height = 400 - drug_margin.top - drug_margin.bottom;

// append the svg object to the body of the page
var svg_drug_bar = d3.select("#drug_bar_chart")
  .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 500")
  .append("g")
    .attr("transform",
          "translate(" + drug_margin.left + "," + drug_margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/feeblefruits/state_of_violence/body-development/assets/data/share_with_drug_use_disorders.csv", function(data) {

  // sort data
  data.sort(function(b, a) {
    return a.Value - b.Value;
  });

  // X axis
  var x = d3.scaleBand()
    .range([ 0, drug_width ])
    .domain(data.map(function(d) { return d.country_name; }))
    .padding(0.2);
  svg_drug_bar.append("g")
    .attr("transform", "translate(0," + drug_height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")

  svg_drug_bar.append("text")
    .attr("x", (drug_width / 2))             
    .attr("y", 0 - (drug_margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "12px") 
    .text("Share of population with drug disorders");

  svg_drug_bar.append("text")
    .attr("x", (1))             
    .attr("y", (drug_height + 100))
    .attr("text-anchor", "left")  
    .style("font-size", "9px")
    .text("Source: Institute for Health Metrics and Evaluation from 2018 (latest available)");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 5])
    .range([ drug_height, 0]);
  svg_drug_bar.append("g")
    .call(d3.axisLeft(y));

  function colorPicker(v) {
    if (v == 0.9214990234) {
      return "#11a579";
    } else {
      return "#be0000";
    }
  }

  // Bars
  svg_drug_bar.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.country_name); })
      .attr("y", function(d) { return y(d.drug_use_disorder_percentage); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return drug_height - y(d.drug_use_disorder_percentage); })
      .attr("fill", function(d) { return colorPicker(d.drug_use_disorder_percentage); })


})