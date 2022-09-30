import React, {Component} from 'react';
import Test from './Test';

class App extends Component {
  state = {
    personClicks: 0
  }

  personClicked = () => {
    this.setState({personClicks: this.state.personClicks + 1})
  }

  render() {
    return (
      <div className="App">
        <Test person="Derrak" personClicked={this.personClicked}/>
        <Test person="Laurel" personClicked={this.personClicked}/>
        <Test person="William" personClicked={this.personClicked}/>
        Person Clicks: {this.state.personClicks}
      </div>
  );
    }
}

export default App;
