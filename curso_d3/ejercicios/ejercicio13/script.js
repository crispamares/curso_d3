/**
 * Utiliza el layout histogram para crear un histograma de pesos con 20 barras
 * 
 * Añade un tooltip en cada barra con su valor
 */

var w = 800; // Reducir el ancho
var h = 500;
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

    var x = d3.scale.linear()
	.domain([0, d3.max(weights)]) // Escala para sacar el histograma
	.range([0, w]);

    // Generar el histograma con 20 bandas
    var datosHistograma = d3.layout.histogram() // CLOUSURE: devuelve una función que se ejecuta inmediatamente
	.frequency(true)    // Si es falso calcula la probabilidad
	.bins(x.ticks(20))  // x.ticks devuelve un array con 20 puntos del dominio equiespaciados y "humanos". 
	(weights);

    var y = d3.scale.linear()
	.domain([0, d3.max(datosHistograma, function(d){return d.y;})])  // Máximo de las Y computadas
	.range([h, 0]); 

    console.log(datosHistograma); // Mira la salida [[{x, y, dx}]]

    svg.selectAll('.bar')
	.data(datosHistograma) // bind de los datos del histograma
      .enter()
	.append('rect')
	.attr('class', 'bar')
	.attr('x', function(d,i) {return x(d.x);}) // La x computada por el layout
	.attr('y', function(d){return y(d.y);})    // La y computada por el layout
	.attr('width', function(d){return x(d.dx) - barMargin;}) // Ancho computado por el layout
	.attr('height', function(d){return h - y(d.y);}) // La y computada por el layout
	.append('title')
	.text(function(d){return d.y;});
		
};