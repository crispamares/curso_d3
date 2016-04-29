
var datos = [1,10,20,30,40,50];

d3.select('body')
    .selectAll("p")  // Selección vacía
    .data(datos)
    .enter()          // Método mágico por ahora
    .append("p")     // Añade el elemento p por cada dato
    .text("Tengo texto");
