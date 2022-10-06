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

/////// GRAPH SETUP. Create Scales and Extents 
//===========CREATE SCALES=======================
// Create linear scale for y values 
// industry practice to call function 'y' or 'x'
const y = d3.scaleLinear()
  .range([graphHeight, 0]); // [] with output min and max. Mx of range set to graphHeight

const x = d3.scaleBand()
  .range([0,500]) // [] with output min and max
  .paddingInner(0.2) // padding between bars
  .paddingOuter(0.2); // padding on left and right of bar group

  //===========EXTENTS=======================
  // Update x-axis text
  xAxisGroup.selectAll('text') // Selects text lables from xAxisGroup
  .attr('transform', 'rotate(-40)')
  // .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end') // start, middle, end are text-anchor options
  .attr('fill', 'blue');

  // Create and call the axes. 
  const xAxis = d3.axisBottom(x); 
  const yAxis = d3.axisLeft(y)
  .ticks(5)
  .tickFormat(d => d + ' orders') // adds context label to tick values

  //===========TRANSITION VARIABLE==========
  const t = d3.transition().duration(750)


//===========UPDATE DATA (Functions that depend on the data)=======================

const update = (dataArray) => {
  // Updating the x & y scales based on updated data
  x.domain(dataArray.map(object => object.name))


  y.domain([0, d3.max(dataArray, d => d.orders)]) // [] with input min and max
  
  // join data to rects in graph group
  const rects = graph.selectAll('rect')
  .data(dataArray)

  // Remove exit selection
  rects.exit().remove();

  // Update current shapes in DOM
  rects
    // .attr('width', 50) // manually set the width of each bar (not best practice)
    .attr('width', x.bandwidth) // width set by Band scale; set to the value of .bandwidth method
    // .attr('height', d => d.orders) // Orig way of passing height value
    .attr('fill', '#EC7272')
    // .attr('x', (d,i) => i * 70); // change x placement of each bar (to space them out) based on an equation ((not best practice))
    .attr('x', d => x(d.name)) // change x placement of each bar (to space them out) based on an equation ((not best practice))

  rects.enter()
    .append('rect') // to each one of the extra elements
    .attr('fill', '#EC7272')
    .attr('x', d => x(d.name))
    
    .attr('width', 0) // Starting position of width of graph; updated to x.bandwidth in .transition.attrTween below
    .attr('height', 0) // Starting position of height and y values; updated in .transition
    .attr('y', graphHeight)
    .merge(rects) // brings in rects from enter selection, applies transition to both
    .transition(t)
      .attrTween('width', widthTween)  //Apply attrTween to the width bars, using the widthTween functions (at end of code)
      .attr('y', d => y(d.orders)) // Ending conditions of transitions
      .attr('height', d => graphHeight - y(d.orders));

  // Takes our group and runs the axis function onto it
  // Which adds the SVGs and adds them to the group  
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
}

//===========RETRIEVE DATA=======================
db.collection('dishes').get().then(response => {

  var dataArray = [];
  response.docs.forEach(doc => {
    dataArray.push(doc.data()); // .data gets the data from each doc and pushes it into the data array
  }); 

  update(dataArray); //Update function, with all data dependant functions
  // called whenever dataArray is updated. 
})

//===========TWEENS=======================
const widthTween = (d) => {
  //define function
  // d3.interpolate returns a function which we call 'i'
  // 0 and x.bandwidth are starting and ending position
  let i = d3.interpolate(0, x.bandwidth());

  // return a function which takes in a time ticker 't'
  // t is a value between 0 and 1 which represents the duration; 0=start, 1=end
  return function(t){
    //return the value from passing the ticker into the interpolation
    // returns an interpolated value between i's min, max scaled by t
    // so when t's .5, the value will be halfway between i's min, max
    return i(t);
  }
}