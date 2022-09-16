const data = [
  {width: 200, height: 100, fill: '#a633e0'},
  {width: 200, height: 100, fill: '#a633e0'}
]

const svg = d3.select('svg'); //select svg element

//store selected rect element within svg element as a constant
  const rect = svg.select('rect') 
    .data(data) //data method; pass in data (in this case a const created above)
    //.attr('width', 200)
    .attr('width', function(d, i, n){return d.width}) //data is refered to as 'd'
    .attr('width', (d, i, n) => {console.log(this)}) //data is refered to as 'd'
    .attr('height', function(d, i, n){return d.height}) // i is array index (optional)
    .attr('fill', function(d, i, n){return d.fill});  // n is current selection (optional)

//    ES6 arrow functions
/*
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
    .attr('width', (d) => d.width} 

    If function goes to multiple lines, you need curleys and the return keyword





*/