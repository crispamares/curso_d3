/**
 * Utiliza la escala lineal para ajustar los tamaños de las barras
 * al tamaño del svg
 */

var w = 500;
var h = 2000;
var barMargin = 1;

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

d3.csv("cars.csv", function (cars) {
	   render(cars);
       });
	       
var render = function(datos) {
    
    var weights = datos.map(function(d){
				return parseInt(d['weight (lb)']);});

    var barWidth = h / weights.length; // Más simple

    var x = d3.scale.linear()
	.domain([0, d3.max(weights)])
	.range([0, w]);

    var y = d3.scale.linear()
	.domain([0, weights.length])
	.range([0, h]);// rangeRound saca números enteros

    svg.selectAll('.bar')
	.data(weights)
      .enter()
	.append('rect')
	.attr('class', 'bar')
	.attr('y', function(d,i) {return y(i);})
	.attr('width', function(d){return x(d);})
	.attr('height', barWidth - barMargin ); // Menguamos el márgen
};