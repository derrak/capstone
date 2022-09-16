const canvas = d3.select(".canvas"); //selects canvas
const svg = canvas.append('svg') //appends SVG to canvas
  .attr('width', 600) // use method chaining to apply attributes to svg
  .attr('height', 600); 

// appends shapes to canvas
svg.append('rect')
  .attr('width', 200)
  .attr('height', 200)
  .attr('fill', 'rgb(69, 179, 257)')
  .attr('x', 20)
  .attr('y', 20);

svg.append('circle')
.attr('r', 150)
.attr('cx', 300)
.attr('cy', 300)
.attr('fill', 'rgb(230, 126, 34)');


svg.append('line')
.attr('x1', 350)
.attr('y1', 100)
.attr('x2', 100)
.attr('y2', 400)
.attr('stroke-width', '3')
.attr('stroke', 'rgb(155, 89, 182)');
