   ES6 arrow functions

Arrow functions effect what 'this' is bound to:
Without arrow functions, 'this' refers to the current element. 
When using arrow functions, refer to current element by referencing 'n[i]';

  Original function:
  .attr('width', function(d, i, n){
    console.log(this)
    return d.width
  }) 
> console.log: this refers to the current element we're applying data properties to

If you use arrow functions, 'this' will refer to the current window, not the current element.
To combat this, refer to current element as 'n[i]' rahter than this. 
  Arrow function:
  .attr('width', (d, i, n) => {
    console.log(this)
    return d.width
  })
> console.log: this refers to window that we're in. Not very helpful. 

TO COMBAT THIS, with arrow functions, you can refer to n[i] instead of 'this'
  .attr('width', (d, i, n) => {
    console.log(n[i]) //n[i] grabs the index from the current element of the array
    return d.width
  })
  > console.log: this refers to the current element we're applying data properties to

  *************Even shorter
    .attr('width', (d) => {return d.width})

    If return value is on the same line, 
    you don't need the 'return' keyword or the curley brackets.
    The return is implicit:
    .attr('width', (d) => d.width)

    If function goes to multiple lines, you need curleys and the return keyword

    If only passing one parameter into the function; don't need perens around it. 

    .attr('width', d => d.width)

    .attr('width', function(d){return d.width}) 
    .attr('width', (d) => {return d.width})
    .attr('width', (d) => d.width) // If return value is on the same line, don't need 'return' or {}
    .attr('width', d => d.width) // If passing only 1 parameter, don't need the ()

