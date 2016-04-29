var datos = [1,10,20,30,40,50];

d3.select('body')
    .selectAll("p")
    .data(datos)
    .enter()
    .append("p")
    .text(function(d, i){return "Párrafo " + String(i);})
    .style("font-size", function(d){return String(d)+"px";});		
