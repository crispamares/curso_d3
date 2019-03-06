d3.csv("cars.csv").then(data => {
    
    d3.select('body')
	.append('p')
	.text(data.length);
    
});
