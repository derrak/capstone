const data = [
  {width: 200, height: 100, fill: '#a633e0'},
  {width: 100, height: 60, fill: '#e033d7'},
  {width: 50, height: 30, fill: '#e03333'}
]

const svg = d3.select('svg'); //select svg element

//store selected rect element within svg element as a constant
// join data to rects
  const rects = svg.selectAll('rect') 
    .data(data) //data method; joining data to the rect

  //add attrs to rects already in the DOM (in this case, there's 1)
  rects.attr('width', d => d.width) 
    .attr('height', d => d.height) 
    .attr('fill', d => d.fill); 

  //append the virtual elements created by Enter Selection
  //when threre are more data objects than pre-built rects,
  //virtual elements are created, waiting to be appended to something. 
  //Append those elements to the DOM
  rects.enter() //rects.enter selection
    .append('rect') //append a rect for each virtual element created 
    .attr('width', d => d.width) //update the attributes of each virtual element
    .attr('height', d => d.height) 
    .attr('fill', d => d.fill); 