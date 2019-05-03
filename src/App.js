import React from 'react';
import './App.css';

function Icon(props) {
	return (
		<button 
			className={props.value ? "green" : "red" }
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

  renderIcon(i) {
	  return <Icon 
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
        {this.renderIcon(0)}
        {this.renderIcon(1)}
        {this.renderIcon(2)}
      </div>
    );
  }
}

export default App;
