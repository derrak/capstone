import React, {Component} from 'react';
import D3Chart from './D3Chart';

export default class ChartWrapper extends Component {
  componentDidMount(){
    new D3Chart(this.refs.chart)
  }
  render() {
    return <div ref = "chart"></div>
  }

}
Using Hooks
// import React, { useRef, useState, useEffect } from 'react';
// import D3Chart from './D3Chart';
 
// const ChartWrapper = () => {
//   const chartArea = useRef(null)
//   const [chart, setChart] = useState(null)
 
//   useEffect(() => {
//     if (!chart) {
//       setChart(new D3Chart(chartArea.current))
//     }
//     else {
//       chart.update()
//     }
//   }, [chart])
 
//   return (
//     <div className="chart-area" ref={chartArea}></div>
//   )
// }
 
// export default ChartWrapper