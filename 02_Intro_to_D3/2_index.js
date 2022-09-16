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

svg.append('text')
  .attr('x', 275)
  .attr('y', 300)
  .attr('fill', 'black')
  .text('hello world')    //// text elements
  .style('font-family','courier') //// add CSS styling
  .style('font-size','24');

  const group = svg.append('g') // group of the 3 rects below
    .attr('transform', 'translate(25,100)') // moves group down 100px
    .attr('fill', '#bb45ff');

  group.append('rect')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 400)
  .attr('y', 20);

  group.append('rect')
  .attr('width', 50)
  .attr('height', 70)
  .attr('x', 460)
  .attr('y', 20);

  group.append('rect')
  .attr('width', 50)
  .attr('height', 90)
  .attr('x', 520)
  .attr('y', 20);
