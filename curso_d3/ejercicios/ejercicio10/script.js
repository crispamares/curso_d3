
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
    
    var weights = datos.map(
	function(d){
	    return parseInt(d['weight (lb)']);
	}
    );

    /**
     * Adaptado al alto del SVG
     * 
     * El redondeo evita problemas de aliasing
     */
    var barWidth = Math.floor( (h / weights.length) - barMargin );

    var rects = svg.selectAll('.bar').data(weights);
      
    rects.enter()
      .append('rect')
	.attr('class', 'bar')
	.attr('y', function(d,i) {return i*(barWidth+barMargin);})
	.attr('width', function(d){return d * 0.05;})
	.attr('height', barWidth);
};
