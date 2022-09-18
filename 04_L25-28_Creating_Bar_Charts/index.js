// select the canvas class first, then append an svg container to it
const svg = d3.select('.canvas')
  .append('svg')
    .attr('width',600)
    .attr('height',600);

// Create margins and dimensions for graph element
const margin = {top: 20, right: 20, bottom: 100, left: 100};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// Create graph group, add attributes
const graph = svg.append('g')
.attr('width', graphWidth)
.attr('height', graphHeight)
// Move graph over from top left. 
// In the backticks is a tempalate string, which brings in the two margin values
.attr('transform', `translate(${margin.left}, ${margin.top})`)

// Create groups for axes. The axes will be created near the bottom of the code
// as they rely on the data and the scales, which are made below.
const xAxisGroup = graph.append('g')
  // transform takes this group (the xAxis) and moves it down graphHeight distance
  .attr('transform', `translate(0, ${graphHeight})`); 
const yAxisGroup = graph.append('g');

// d3.json is async, it returns a promise
// the .then method fires a callback method
// and passes the return of d3.json into the
// data parameter
d3.json('menu.json').then(data => {

  // Find min, max, and extent of y values
  // use these values in the scales
  const yMin = d3.min(data, d => d.orders);
  // cycles through data input, returns min value for d.*
  const yMax = d3.max(data, d => d.orders);
    // cycles through data input, returns max value for d.*
  const yExtent = d3.extent(data, d => d.orders);
    // cycles through data input, returns array of [min,max] values

  // Create linear scale for y values 
  // industry practive to call function 'y' or 'x'
  const y = d3.scaleLinear()
   .domain([0, yMax]) // [] with input min and max
   .range([graphHeight, 0]); // [] with output min and max. Mx of range set to graphHeight

  const x = d3.scaleBand()
   // .map creates a new array full of the
   //  unique name values of each object in the data set
   // it uses .lenght of array to know what to divide into range max
    .domain(data.map(object => object.name))
    .range([0,500]) // [] with output min and max
    .paddingInner(0.2) // padding between bars
    .paddingOuter(0.2); // padding on left and right of bar group

    console.log("Bandwidth: " + x.bandwidth()) 
    // .bandwith is a method that returns the width of each bar
    // will be used to set bar width below

  // join data to rects in graph group
  const rects = graph.selectAll('rect')
    .data(data)

  // apply attrs to rects in DOM (there's only 1)
  rects
    // .attr('width', 50) // manually set the width of each bar (not best practice)
    .attr('width', x.bandwidth) // width set by Band scale; set to the value of .bandwidth method
    // .attr('height', d => d.orders) // Orig way of passing height value
    .attr('height', d => graphHeight - y(d.orders)) // wrapping height value in y scale function
    .attr('fill', 'orange')
    // .attr('x', (d,i) => i * 70); // change x placement of each bar (to space them out) based on an equation ((not best practice))
    .attr('x', d => x(d.name)) // change x placement of each bar (to space them out) based on an equation ((not best practice))
    .attr('y', d => y(d.orders)); // calculates the top-left starting point of each bar. 

  // // append the enter selection to the DOM
  // // (the leftover elements 'rects' that d3 
  // // has joined data to)
  rects.enter()
    .append('rect') // to each one of the extra elements
      .attr('width', x.bandwidth) 
      // .attr('height', d => y(d.orders))
      .attr('height', d => graphHeight - y(d.orders))
      .attr('fill', 'blue')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.orders));

  // Create and call the axes. 
  // The x and y parameters refer to the x and y consts 
  // created above to create the scales
  const xAxis = d3.axisBottom(x); 
  const yAxis = d3.axisLeft(y)
  .ticks(5)
  .tickFormat(d => d + ' orders') // adds context label to tick values

  // Takes our group and runs the axis function onto it
  // Which adds the SVGs and adds them to the group  
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup.selectAll('text') // Selects text lables from xAxisGroup
  .attr('transform', 'rotate(-40)')
  // .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end') // start, middle, end are text-anchor options
  .attr('fill', 'blue');
})

