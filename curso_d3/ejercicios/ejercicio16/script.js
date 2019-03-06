/**
 * 
 * Utiliza la metaclase ":hover" para dibujar un stroke 
 * 
 * Cuando se pasa por encima con el ratón, peso y velocidad se ven 
 * en un "p" arriba de la gráfica 
 * 
 * Cuando se pincha ( on("click", callback) ) en un coche se muestra un
 * mensaje con el mandato "alert" que tiene el número de cilindros del
 * coche
 * 
 */

var margin = {top: 20, right: 30, bottom: 30, left: 40};
var w = 960 - margin.left - margin.right; 
var h = 500 - margin.top - margin.bottom; 


var svg = d3.select(".chart")
    .append("svg")
    .attr("width", w + margin.left + margin.right) 
    .attr("height", h + margin.top + margin.bottom);

var mainG = svg.append('g') 
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("cars.csv").then(cars => {
	render(cars);
});
	       
var render = function(datos) {
    
    var x = d3.scaleLinear()
	.domain([0, d3.max(datos, function(d){return parseInt(d['weight (lb)']);})]) 
	.range([0, w]);

    var y = d3.scaleLinear()
	.domain([0, d3.max(datos, function(d){return parseInt(d['0-60 mph (s)']);})])  
	.range([h, 0]); 

    var r = d3.scaleLinear()  
	.domain([d3.min(datos, function(d){return parseInt(d['power (hp)']);}),
	         d3.max(datos, function(d){return parseInt(d['power (hp)']);})])  
	.range([2, 10]); 

    var c = d3.scaleOrdinal(d3.schemeCategory10)
	.domain(d3.set(datos, function(d){return d['cylinders'];}).values());

    var xAxis = d3.axisBottom(x);  // Eje x
    var yAxis = d3.axisLeft(y);  // Eje y

    mainG.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + h + ")")
	.call(xAxis);

    mainG.append("g")
	.attr("class", "y axis")
	.call(yAxis);

    mainG.selectAll('.car')  
	.data(datos) 
      .enter()
	.append('circle')
	.attr('class', 'car')
	.attr('cx', function(d) {return x( parseInt(d['weight (lb)'] ));}) 
	.attr('cy', function(d){return y( parseInt(d['0-60 mph (s)']) );})    
	.attr('r', function(d){return r(parseInt(d['power (hp)']));})
	.style("fill", function(d){return c(d['cylinders']);})
	.on('click', function(d){ alert('coche con '+ d['cylinders'] +' cilindros');})
	.on('mouseover', function(d){ 
		d3.select('.detalles')
		    .text('weight (lb): ' + d['weight (lb)'] + ' ----- 0-60 mph (s): ' + d['0-60 mph (s)']);})
	.append('title')
	.text(function(d){return d.name;});
		
};