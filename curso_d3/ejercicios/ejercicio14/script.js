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


d3.csv("cars.csv", function (cars) {
	   render(cars);
       });
	       
var render = function(datos) {
    
    var weights = datos.map(function(d){
				return parseInt(d['weight (lb)']);});

    var x = d3.scale.linear()
	.domain([0, d3.max(weights)]) 
	.range([0, w]);


    var datosHistograma = d3.layout.histogram() 
	.frequency(true)    // Prueba a cambiarlo
	.bins(x.ticks(20))  // Prueba a poner sólo .bins(20)
	(weights);

    var y = d3.scale.linear()
	.domain([0, d3.max(datosHistograma, function(d){return d.y;})])  
	.range([h, 0]); 

    
    var xAxis = d3.svg.axis()  // Eje x
	.scale(x)
	.orient("bottom");

    var yAxis = d3.svg.axis()  // Eje y
	.scale(y)
	.orient("left");

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
	.attr('x', function(d,i) {return x(d.x);}) 
	.attr('y', function(d){return y(d.y);})    
	.attr('width', function(d){return x(d.dx) - barMargin;}) 
	.attr('height', function(d){return h - y(d.y);}) 
	.append('title')
	.text(function(d){return d.y;});
		
};