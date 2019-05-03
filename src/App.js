import React from 'react';
import './App.css';

function Square(props) {
	return (
		<button 
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

class App extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			toggled: Array(3).fill(0),
		}
  }

  renderSquare(i) {
	  return <Square 
	  value={this.state.toggled[i]}
	  onClick={() => this.handleClick(i)}
	  />;  // anything you set here can be accessed
	}

  handleClick(i) {
    const newToggled = this.state.toggled.fill(0);
    newToggled[i] = 1;
    console.log(i)
    this.setState({
      toggled: newToggled,
    })
  }

  render() {
    return (
      <div>
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
    );
  }
}

export default App;
