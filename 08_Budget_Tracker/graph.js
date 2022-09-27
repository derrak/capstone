const dimensions = { height: 300, width: 300, radius: 150 };
const center = {
  x: (dimensions.width / 2 + 5),
  y: (dimensions.height / 2 + 5)
}

const color = d3.scaleOrdinal(d3['schemeSet3'])
//https://observablehq.com/@d3/color-schemes


const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', dimensions.width + 150)
  .attr('height', dimensions.width + 150)

const graph = svg.append('g')
  .attr('transform', `translate(${center.x}, ${center.y})`)

const pie = d3.pie() // function calculates angle of slices (and start and end angle) of the pie based on values passed in
  .sort(null) // turns sort off, so d3 won't sort data for us
  .value(d => d.cost) // determines pie slice angles based on the cost values


const arcPath = d3.arc()
  .outerRadius(dimensions.radius)
  .innerRadius(dimensions.radius / 2);

const update = (data) => {

  // update color scale domain
  color.domain(data.map(d => d.name)); // create a array filled with the names of all items in data array

  // join pie data to path elements
  const paths = graph.selectAll('path')
    .data(pie(data)); // returns new array of data with angles attached

  // Remove exit selection
  paths.exit()
    .transition().duration(750)
      .attrTween('d', arcTweenExit)
    .remove();

  // Update elements curently in graph;
  // Only need to update the arcPath; all other attrs are pased in when it was created
  paths
    .attr('d', arcPath) // passes 'd' (a data object) to arcPath and retuns the path string 

  paths.enter()
    .append('path')
    .attr('class', 'arc') // append css class; may use later
    // .attr('d', arcPath) // This was the starting position of the arc; now handled by the transition    
    .attr('stroke', '#fff')
    .attr('stroke-width', 3)
    .attr('fill', d => color(d.data.name)) // name is now within the data object of each d object (once ran through .data(pie())
    // .each allows running a function on each d
    // adds a _current property, set to d to each d
    .each(function(d){this._current = d}) // .each allows running a function on each d
    .transition().duration(750)
    .attrTween('d', arcTweenEnter);
}

let data = [];


db.collection('expenses').onSnapshot(response => {
  response.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(data);

});

//===========TWEENS=======================
const arcTweenEnter = (d) => {
  //define function
  // d3.interpolate returns a function which we'll call 'i'
  // it will interpolate a value between d.endAngle, d.startAngle
  // when a value between 0 and 1 is passed into it
  let i = d3.interpolate(d.endAngle, d.startAngle)

  // return a function which takes in a time ticker 't'
  // t is a value between 0 and 1 which represents the duration; 0=start, 1=end
  return function (t) {
    //return the value from passing the ticker into the interpolation
    // returns an interpolated value between i's min, max scaled by t
    // so when t's .5, the value will be halfway between i's min, max
    // startAngle starts at endAngle value, and increases towards startAngle value
    d.startAngle = i(t);
    return arcPath(d) // return a new path 'd' every time the ticker changes
  }
}

// Exit Tween swaps startAngle and endAngle
const arcTweenExit = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle)

  return function (t) {
    d.startAngle = i(t);
    return arcPath(d)
  }
}

// use function keyword to all ow use of 'this'
function arcTweenUpdate(d){

}
