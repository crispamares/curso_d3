/**
 * Añade dos ejes con svg.axis, a la coordenada x y a la y
 * 
 * Utiliza la convención de márgenes para situar los ejes 
 * fuera de la gráfica
 */

var margin = {top: 20, right: 30, bottom: 30, left: 40};
var w = 960 - margin.left - margin.right;  // ancho de la gráfica
var h = 500 - margin.top - margin.bottom;  // altura de la gráfica

var barMargin = 1;

// El SVG ocupa el tamaño de la gráfica más los márgenes
var svg = d3.select(".chart")
    .append("svg")
    .attr("width", w + margin.left + margin.right) 
    .attr("height", h + margin.top + margin.bottom);

var mainG = svg.append('g') // Es un contenedor. Parecido div en HTML
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("cars.csv").then(cars => {
	render(cars);
});
	       
var render = function(datos) {
    
    var weights = datos.map(function(d){
				return parseInt(d['weight (lb)']);});

    var x = d3.scaleLinear()
	.domain([0, d3.max(weights)]) 
	.range([0, w]);


	var datosHistograma = d3.histogram()
	.domain(x.domain())
	.thresholds(x.ticks(20))
	(weights);

    var y = d3.scaleLinear()
	.domain([0, d3.max(datosHistograma, function(d){return d.length;})])
	.range([h, 0]); 
    
    var xAxis = d3.axisBottom(x);  // Eje x
    var yAxis = d3.axisLeft(y);  // Eje y

    mainG.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + h + ")")
	.call(xAxis);

    mainG.append("g")
	.attr("class", "y axis")
	.call(yAxis);


    mainG.selectAll('.bar')  // Ya no es el svg el objeto padre
	.data(datosHistograma) 
      .enter()
	.append('rect')
	.attr('class', 'bar')
	.attr('x', function(d,i) {return x(d.x0);}) // La x computada por el layout
	.attr('y', function(d){return y(d.length);})    // La y computada por el layout
	.attr('width', function(d){return x(d.x1 - d.x0) - barMargin;}) // Ancho computado por el layout
	.attr('height', function(d){return h - y(d.length);}) // La y computada por el layout
	.append('title')
	.text(function(d){return d.length;});
		
};