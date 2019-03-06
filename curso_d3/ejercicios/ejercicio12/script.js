/**
 * Orienta el diagrama de barras en vertical
 */

var w = 2000; // Cambiar ancho por alto
var h = 500;
var barMargin = 1;

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


d3.csv("cars.csv").then(cars => {
	   render(cars);
       });
	       
var render = function(datos) {
    
    var weights = datos.map(function(d){
				return parseInt(d['weight (lb)']);});

    var barWidth = w / weights.length;


    var x = d3.scaleLinear()
	.domain([0, weights.length]) // Intercambiado con y
	.range([0, w]);

    var y = d3.scaleLinear()
	.domain([0, d3.max(weights)])
	.range([h, 0]); // OJO: Rango invertido

    svg.selectAll('.bar')
	.data(weights)
      .enter()
	.append('rect')
	.attr('class', 'bar')
	.attr('x', function(d,i) {return x(i);})
	.attr('y', function(d){return y(d);})  // punto superior de la barra
	.attr('width', barWidth - barMargin)
	.attr('height', function(d){return h - y(d);}); // altura de la barra
};