var datos = [10,20,30,40,50];

var width = 800;
var height = 600;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height); 

var circles = svg.selectAll("circle").data(datos);

circles.enter()
    .append("circle")
  .merge(circles)
    .attr("cx", function(d, i) { return (i * 100) + 20; } )
    .attr("cy", height/2)
    .attr("r", function(d) {return d;})
    .style("stroke", "steelblue")  // Igual ponerlo en CSS
    .style("fill", "none")
    .attr("stroke-width", function(d){return d / 10;});
