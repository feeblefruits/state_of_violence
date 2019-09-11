// set the dimensions and margins of the graph
var margin = {top: 30, right: 40, bottom: 30, left: 160},
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_matrix = d3.select("#murder_matrix")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

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
  .range([ 0, width ])
  .domain(myYears)
  .padding(0.01);
svg_matrix.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myCountries)
  .padding(0.01);
svg_matrix.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["#fff", "#be0000"])
  .domain([1,100])

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