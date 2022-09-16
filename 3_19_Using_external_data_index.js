const data = [
  {width: 200, height: 100, fill: '#a633e0'},
  {width: 100, height: 60, fill: '#e033d7'},
  {width: 50, height: 30, fill: '#e03333'}
]

const svg = d3.select('svg'); //select svg element

//store selected rect element within svg element as a constant
  const rect = svg.selectAll('rect') 
    .data(data) //data method; joining data to the rect
    .attr('width', d => d.width) 
    .attr('height', d => d.height) 
    .attr('fill', d => d.fill); 

    console.log(rect);