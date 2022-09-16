const svg=d3.select('svg')

//async task; takes time to read the file, so it returns a promise
//The .then method fires function when it has the data
//.then takes the data as a callback
d3.json('planets.json').then(data => {
  // we want to take the data and join it to the circle elements
  // since we're joing these data to no circle elements, D3 will 
  // create them for us.
  const circs = svg.selectAll('circle')
    .data(data); //data param refers to the json file

  // Add attrs to circs already in DOM
  // Even though there currently are no cicles in the DOM, 
  // it's good practice to set this up as if there was, just in case.
  // Also, if you were to refresh the data, circles could be present
  circs.attr('cy', 200)
    .attr('cx', d => d.distance)
    .attr('r', d => d.radius)
    .attr('fill', d=> d.fill);

  // Append the enter selection to the DOM
  // (Add virtual elements to the DOM)
  circs.enter()
    .append('circle') // appendign a circle to each element 
      .attr('cx', d => d.distance) //and applying these properties
      .attr('cy', 200)
      .attr('r', d => d.radius)
      .attr('fill', d=> d.fill);
})