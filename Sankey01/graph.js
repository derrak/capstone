// const dimensions = { height: 300, width: 300, radius: 150 };
// const center = {
//   x: (dimensions.width / 2 + 5),
//   y: (dimensions.height / 2 + 5)
// }

// const color = d3.scaleOrdinal(d3['schemeSet3'])
// //https://observablehq.com/@d3/color-schemes


// const svg = d3.select('.canvas')
//   .append('svg')
//   .attr('width', dimensions.width + 150)
//   .attr('height', dimensions.width + 150)

// const graph = svg.append('g')
//   .attr('transform', `translate(${center.x}, ${center.y})`)

// const pie = d3.pie() // function calculates angle of slices (and start and end angle) of the pie based on values passed in
//   .sort(null) // turns sort off, so d3 won't sort data for us
//   .value(d => d.cost) // determines pie slice angles based on the cost values


// const arcPath = d3.arc()
//   .outerRadius(dimensions.radius)
//   .innerRadius(dimensions.radius / 2);

// //=============Legend Setup================
// //Legend is called in the update function as it will change
// const legendGroup = svg.append('g')
//   .attr('transform', `translate(${dimensions.width + 40}, 10)`);

// const legend = d3.legendColor()
//   .shape('circle')
//   .shapePadding(10)
//   .scale(color);

//   //=============ToolTip Setup================
//   const tip = d3.tip()
//     .attr('class', 'tip card')
//     .html(d => {
//       let content = `<div class="name">${d.data.name}</div>`;
//       content += `<div class="cost">${d.data.cost}</div>`;
//       content += `<div class="delete">Click slice to delete</div>`;
//       return content;
//     });

//     graph.call(tip); //apply toolTip to graph group


// const update = (data) => {
//   // update color scale domain
//   color.domain(data.map(d => d.name)); // create a array filled with the names of all items in data array

//   // update and call legend
//   legendGroup.call(legend)
//   legendGroup.selectAll('text').attr('fill', 'white');

//   // join pie data to path elements
//   const paths = graph.selectAll('path')
//     .data(pie(data)); // returns new array of data with angles attached

//   // Remove exit selection
//   paths.exit()
//     .transition().duration(750)
//     .attrTween('d', arcTweenExit)
//     .remove();

//   // Update elements curently in graph;
//   // Only need to update the arcPath; all other attrs are pased in when it was created
//   paths
//     .attr('d', arcPath) // passes 'd' (a data object) to arcPath and retuns the path string
//     .transition().duration(750)
//     .attrTween('d', arcTweenUpdate)

//   paths.enter()
//     .append('path')
//     .attr('class', 'arc') // append css class; may use later
//     // .attr('d', arcPath) // This was the starting position of the arc; now handled by the transition    
//     .attr('stroke', '#fff')
//     .attr('stroke-width', 3)
//     .attr('fill', d => color(d.data.name)) // name is now within the data object of each d object (once ran through .data(pie())
//     // .each allows running a function on each d
//     // the function adds a _current property, set to d to each d
//     // acts a a snapshop of current positions, which is needed for transitions
//     .each(function (d) { this._current = d })
//     .transition().duration(750)
//     .attrTween('d', arcTweenEnter);

//     //=============Handle Event Listeners================
//   graph.selectAll('path')
//     .on('mouseover', (d, i, n) => { // on mouseover, fires this function, which fires two functions within
//       tip.show(d, n[i]) // data and reference to current element n[i]
//       handleMouseOver(d, i, n)})
//     .on('mouseout', (d, i, n) => {
//       tip.hide()
//       handleMouseOut(d, i, n)})
//     .on('click', handleClick)
// }

// let data = [];


// db.collection('expenses').onSnapshot(response => {
//   response.docChanges().forEach(change => {
//     const doc = { ...change.doc.data(), id: change.doc.id };

//     switch (change.type) {
//       case 'added':
//         data.push(doc);
//         break;
//       case 'modified':
//         const index = data.findIndex(item => item.id == doc.id);
//         data[index] = doc;
//         break;
//       case 'removed':
//         data = data.filter(item => item.id !== doc.id);
//         break;
//       default:
//         break;
//     }
//   });

//   update(data);

// });

// //===========TWEENS=======================
// const arcTweenEnter = (d) => {
//   //define function
//   // d3.interpolate returns a function which we'll call 'i'
//   // it will interpolate a value between d.endAngle, d.startAngle
//   // when a value between 0 and 1 is passed into it
//   let i = d3.interpolate(d.endAngle, d.startAngle)

//   // return a function which takes in a time ticker 't'
//   // t is a value between 0 and 1 which represents the duration; 0=start, 1=end
//   return function (t) {
//     //return the value from passing the ticker into the interpolation
//     // returns an interpolated value between i's min, max scaled by t
//     // so when t's .5, the value will be halfway between i's min, max
//     // startAngle starts at endAngle value, and increases towards startAngle value
//     d.startAngle = i(t);
//     return arcPath(d) // return a new path 'd' every time the ticker changes
//   }
// }

// // Exit Tween swaps startAngle and endAngle
// const arcTweenExit = (d) => {
//   let i = d3.interpolate(d.startAngle, d.endAngle)

//   return function (t) {
//     d.startAngle = i(t);
//     return arcPath(d)
//   }
// }

// // use function keyword to all ow use of 'this'
// function arcTweenUpdate(d) {
//   //interpolate between current and new positions
//   var i = d3.interpolate(this._current, d);
//   //update current prop with new updated data
//   this._current = d;

//   return function (t) {
//     return arcPath(i(t));
//   }

// }

// //===========EVENT HANDLERS=======================
// // d=data of path event triggered 
// // n=array of element in the current selection
// // i= index of current element hovering over 
// // named the transitions 'changeSliceFill' so they don't interfear with other transitions
// const handleMouseOver = (d, i, n) =>{ 
//   //console.log(n[i]) //tells us details of element hovered over
//   d3.select(n[i]) // selects current element, wraps in d3 wrapper; get access to d3 methods
//     .transition('changeSliceFill').duration(300)
//       .attr('fill', '#fff')
// }

// const handleMouseOut = (d, i, n) =>{ 
//   d3.select(n[i]) // selects current element, wraps in d3 wrapper; get access to d3 methods
//     .transition('changeSliceFill').duration(300)
//       .attr('fill', color(d.data.name)) //d.data.name referrs to the data passed through the pi function
// }

// const handleClick = (d) => {
//   const id = d.data.id;
//   db.collection('expenses').doc(id).delete()
// }