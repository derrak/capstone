import React, {Component} from 'react';
import ChartWrapper from './ChartWrapper';
import Navbar from 'react-bootstrap/Navbar'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar bg='light'>
          <Navbar.Brand>TallPeople</Navbar.Brand>
        </Navbar>
        <ChartWrapper />
      </div>
    );
  }
}

export default App;
