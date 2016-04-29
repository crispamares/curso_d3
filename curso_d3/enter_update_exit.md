# Enter, Update y Exit

## Selección -> Data ##

	var datos = [1,10,20,30,40,50];
	
	var p = d3.select('body')
	    .selectAll("p")  // Selección vacía o no
	    .data(datos);

## Enter ##

* Normalmente es la rama que tiene los **append**
* Itera por los datos del array que no tienen un elemento del DOM 

		p.enter()
			.append("p")     // Añade el elemento p por cada dato
			.text("Tengo texto");  // Sólo en el momento de la creación


## Update ##

* Afecta a los elementos del DOM seleccionado
* Si se pone después del **enter** afecta **también** a los recién creados

		p.style("font-size", function(d){return d+"px";});


## Exit ##

* Normalmente es la rama que tiene los **remove**
* Afecta a los elementos del DOM que **no tienen** item en el array de datos

		p.exit()
			.remove();

## Ejemplo 1 ##

<iframe width="100%" height="800" src="http://jsbin.com/wasor/10/embed?output" frameborder="1" allowfullscreen>
![[http://jsbin.com/wasor/10/embed?output](http://jsbin.com/wasor/10/embed?output)](../rsc/images/link.png)

</iframe>


## Ejemplo 2 ##

<iframe width="100%" height="800" src="http://jsbin.com/rumew/1/edit" frameborder="1" allowfullscreen>
![[http://jsbin.com/rumew/1/edit](http://jsbin.com/rumew/1/edit)](../rsc/images/link.png)

</iframe>

## Transiciones ##

* Un tipo de [animaciones](https://github.com/mbostock/d3/wiki/Transitions)
* D3 tiene muchos **interpoladores**, para: números, colores, geometrías...
* D3 tiene un surtido de funciones de [interpolación](https://github.com/mbostock/d3/wiki/Transitions#easing):
	* linear, poly, quad, cubic, sin, exp, circle, elastic, back, bounce
* Las interpolaciones se pueden encadenar
* Además emiten eventos: "start" y "end"

## Ejemplo 3 ##

<iframe width="100%" height="800" src="http://jsbin.com/retod/1/embed?output" frameborder="1" allowfullscreen>
![[http://jsbin.com/retod/1/embed?output](http://jsbin.com/retod/1/embed?output)](../rsc/images/link.png)

</iframe>

## Ejemplo 4 ##

<iframe width="100%" height="800" src="http://jsbin.com/focav/3/embed?output" frameborder="1" allowfullscreen>
![[http://jsbin.com/focav/3/embed?output](http://jsbin.com/focav/3/embed?output)](../rsc/images/link.png)

</iframe>
