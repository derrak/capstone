import * as d3 from 'd3';

const data = [];
const url = "https://udemy-react-d3.firebaseio.com/ages.json"

export default class D3Chart {
  constructor(element){
    const svg = d3.select(element)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500)

    d3.json(url).then(agesData => {
      console.log(agesData);
    })

    const rects = svg.selectAll('rects')
      .data(data)

    rects.enter()
      .append('rect')
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 100)
      .attr('height', 400)
      .attr('fill', 'grey')
  }
}