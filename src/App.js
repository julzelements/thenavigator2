import React from 'react';
import './App.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className={this.props.display} onSubmit={this.handleSubmit}>
        <label>
          {this.props.name}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

function Icon(props) {
	return (
    <div>
      <button 
        className={props.value ? "green" : "red" }
        onClick={props.onClick}
      >
        {props.name}
      </button>
      <NameForm name={props.name} display={props.value ? "green" : "hidden" }/>
    </div>
	);
}


class App extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      toggled: Array(3).fill(0),
      name: ["first name", "second name", "last name"]
		}
  }

  renderIcon(i) {
	  return <Icon 
	  value={this.state.toggled[i]}
    name={this.state.name[i]}
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
