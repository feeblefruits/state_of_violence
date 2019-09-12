// set the dimensions and margins of the graph
var rape_matrix_margin = {top: 30, right: 40, bottom: 30, left: 160},
  rape_matrix_width = 800 - rape_matrix_margin.left - rape_matrix_margin.right,
  rape_matrix_height = 500 - rape_matrix_margin.top - rape_matrix_margin.bottom;

// append the svg object to the body of the page
var svg_matrix = d3.select("#rape_matrix")
.append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 800 500")
.append("g")
  .attr("transform",
        "translate(" + rape_matrix_margin.left + "," + rape_matrix_margin.top + ")");

// Labels of row and columns
var myYears = ['2009/2010','2014/2015','2011/2012','2017/2018',
              '2013/2014','2016/2017','2018/2019','2015/2016','2010/2011',
              '2012/2013']

var myCountries = ['Inanda','Kagiso','Kraaifontein','Mankweng','Lusikisiki',
                 'Jouberton','Diepsloot','Thabong','Harare','Moroka','Thohoyandou','Tsakane',
                 'Seshego','Ntuzuma','Mfuleni','Delft','Ngqeleni','Mthatha','Empangeni','Umlazi',
                 'Boitekong','Mamelodi East','Temba','Ivory Park','Orange Farms','Bloemspruit',
                 'Dobsonville','Nyanga','Calcutta','Plessislaer']

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, rape_matrix_width ])
  .domain(myYears)
  .padding(0.01);
svg_matrix.append("g")
  .attr("transform", "translate(0," + rape_matrix_height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ rape_matrix_height, 0 ])
  .domain(myCountries)
  .padding(0.01);
svg_matrix.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["#fff", "#be0000"])
  .domain([1,100])

svg_matrix.append("text")
  .attr("x", (rape_matrix_width / 2))             
  .attr("y", 0 - (rape_matrix_margin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "12px") 
  .text("Reported rates per police station 2009/10 - 2018/19");

//Read the data
d3.csv("https://raw.githubusercontent.com/feeblefruits/state_of_violence/body-development/assets/data/rape_matrix_total.csv", function(data) {

  svg_matrix.selectAll()
      .data(data, function(d) {return d.year+':'+d.station;})
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.year) })
      .attr("y", function(d) { return y(d.station) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.rape_rate)} )

})