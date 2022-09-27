const dimensions = { height: 300, width: 300, radius: 150 };
const center = {
  x: (dimensions.width / 2 + 5),
  y: (dimensions.height / 2 + 5)
}

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

// join pie data to path elements
  const paths = graph.selectAll('path')
    .data(pie(data)); // returns new array of data with angles attached

    paths.enter()
      .append('path')
        .attr('class', 'arc') // append css class; may use later
        .attr('d', arcPath) // passes 'd' (a data object) to arcPath and retuns the path string      
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
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
    })