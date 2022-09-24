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
// The non-data dependant parts of the scales are created here, 
// The data-dependant domains are set in the UPDATE DATA section

// Create linear scale for y values 
// industry practice to call function 'y' or 'x'
const y = d3.scaleLinear()
  .range([graphHeight, 0]); // [] with output min and max. Mx of range set to graphHeight

const x = d3.scaleBand()
  .range([0,500]) // [] with output min and max
  .paddingInner(0.2) // padding between bars
  .paddingOuter(0.2); // padding on left and right of bar group

  //===========EXTENTS=======================
  // Find min, max, and extent of y values
  // I don't think these 3 yValue const are used in the code anymore.
  // The function in yMax is used directly in the y.domain in the UPDATE DATA AREA
 // const yMin = d3.min(dataArray, d => d.orders);
  // cycles through dataArray input, returns min value for d.*
 // const yMax = d3.max(dataArray, d => d.orders);
    // cycles through dataArray input, returns max value for d.*
 // const yExtent = d3.extent(dataArray, d => d.orders);
    // cycles through dataArray input, returns array of [min,max] values

  // Update x-axis text
  xAxisGroup.selectAll('text') // Selects text lables from xAxisGroup
  .attr('transform', 'rotate(-40)')
  // .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end') // start, middle, end are text-anchor options
  .attr('fill', 'blue');

  // Create and call the axes. 
  // The x and y parameters refer to the x and y consts 
  // created above to create the scales
  const xAxis = d3.axisBottom(x); 
  const yAxis = d3.axisLeft(y)
  .ticks(5)
  .tickFormat(d => d + ' orders') // adds context label to tick values

//===========UPDATE DATA (Functions that depend on the data)=======================
//================================================================

const update = (dataArray) => {
  // Updating the x & y scales based on updated data
  x.domain(dataArray.map(object => object.name))
  // .map creates a new array full of the
  // unique name values of each object in the data set
  // it uses .lenght of array to know what to divide into range max

  y.domain([0, d3.max(dataArray, d => d.orders)]) // [] with input min and max
  
  // join data to rects in graph group
  const rects = graph.selectAll('rect')
  .data(dataArray)

  // Remove exit selection
  rects.exit().remove();

  // Update current shapes in DOM
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

  // Append the enter selection to the DOM
  // (the leftover elements 'rects' that d3 
  // has joined data to)
  rects.enter()
    .append('rect') // to each one of the extra elements
      .attr('width', x.bandwidth) 
      // .attr('height', d => y(d.orders))
      .attr('height', d => graphHeight - y(d.orders))
      .attr('fill', 'blue')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.orders));

  // Takes our group and runs the axis function onto it
  // Which adds the SVGs and adds them to the group  
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
}

//===========RETRIEVE DATA=======================
//HOW TO CONNECT TO LOCAL JSON; turned off when we changed source to Firestore
// d3.json is async, it returns a promise
// the .then method fires a callback method
// and passes the return of d3.json into the
// data parameter
//d3.json('menu.json').then(data => {

//HOW TO CONNECT TO FIRESTORE DATABASE
//'dishes' refers to the collection w/in the firebase db
// .get is a ASYNC request to get the docs; it returns a promise
// .then is fired when the .get() action is complete
// firebase returns the data 'response' differently, so it has to 
// be processed more than the local json file, so it's passsed in as 'response'
db.collection('dishes').get().then(response => {

// Create new array for data
// Get into the 'response' object, then docs within, 
// then cycle through the docs and 
// push the data into the data array.
// The .data function extracts the data we want out of the result.docs object
  var dataArray = [];
  response.docs.forEach(doc => {
    dataArray.push(doc.data()); // .data gets the data from each doc and pushes it into the data array
  }); 

  update(dataArray); //Update function, with all data dependant functions
  // called whenever dataArray is updated. 
})

