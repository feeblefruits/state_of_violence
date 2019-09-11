// set the dimensions and margins of the graph
var murder_matrix_margin = {top: 30, right: 40, bottom: 30, left: 160},
  murder_matrix_width = 1200 - murder_matrix_margin.left - murder_matrix_margin.right,
  murder_matrix_height = 500 - murder_matrix_margin.top - murder_matrix_margin.bottom;

// append the svg object to the body of the page
var svg_matrix = d3.select("#murder_matrix")
.append("svg")
  .attr("width", murder_matrix_width + murder_matrix_margin.left + murder_matrix_margin.right)
  .attr("height", murder_matrix_height + murder_matrix_margin.top + murder_matrix_margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + murder_matrix_margin.left + "," + murder_matrix_margin.top + ")");

// Labels of row and columns
var myYears = ['1995','1996','1997','1998','1999','2000','2001','2002',
               '2003','2004','2005','2006','2007','2008','2009','2010','2011',
               '2012','2013','2014','2015','2016']

var myCountries = ['Virgin Islands (U.S.)','Dominican Republic','Greenland',"Cote d'Ivoire",
                'Guatemala','Puerto Rico','Panama','Colombia','Lesotho','El Salvador','Russian Federation','Paraguay',
                'Kazakhstan','Jamaica','Venezuela, RB','Guyana','Ecuador','Trinidad and Tobago','Honduras',
                'Central African Republic','St. Kitts and Nevis','Seychelles','Curacao','St. Vincent and the Grenadines',
                'Botswana','Small states','Congo, Dem. Rep.','Suriname','Nicaragua','Mali','St. Lucia','Mauritania','South Sudan',
                'Mexico','Eswatini','Brazil','Bahamas, The','Belize','South Africa','Namibia']

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, murder_matrix_width ])
  .domain(myYears)
  .padding(0.01);
svg_matrix.append("g")
  .attr("transform", "translate(0," + murder_matrix_height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ murder_matrix_height, 0 ])
  .domain(myCountries)
  .padding(0.01);
svg_matrix.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["#fff", "#be0000"])
  .domain([1,100])

svg_matrix.append("text")
  .attr("x", (murder_matrix_width / 2))             
  .attr("y", 0 - (murder_matrix_margin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "12px") 
  .text("Murder rate per 100,000 people over time");

//Read the data
d3.csv("https://raw.githubusercontent.com/feeblefruits/state_of_violence/body-development/assets/data/country_murder_rates_matrix.csv", function(data) {

  svg_matrix.selectAll()
      .data(data, function(d) {return d.year+':'+d.country_name;})
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.year) })
      .attr("y", function(d) { return y(d.country_name) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.murder_rate)} )

})