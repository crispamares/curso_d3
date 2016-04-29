d3.csv("cars.csv", function(data) {
    
    d3.select('body')
	.append('p')
	.text(data.length);
    
});
