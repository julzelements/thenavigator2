import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDotCircle, faCircle, faCheckCircle, faExclamationCircle, faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faDotCircle, faCircle, faCheckCircle, faExclamationCircle, faSquareFull);

function Icon(props) {
  let icon;
  let transform;
  switch (props.section.status) {
    case "available":
      icon = "dot-circle"
      break;
    case "unavailable":
      icon = "circle"
      transform = "shrink-8"
      break;
    case "completed":
      icon = "check-circle"
      break;
    case "invalid": 
      icon = "exclamation-circle"
      break;
    default: // default status: unavailable
      icon = "circle" 
      transform = "shrink-8"
      break;
  }

  const iconClasses = `${props.section.status} ${props.section.active ? "isActive" : ""}`

  return (
    <div className={iconClasses}>
      <div className={"icon-tooltip-container"}>
        <FontAwesomeIcon className={"icon"} icon={icon} size="2x" transform={transform} onClick={props.onClick}/>
        <div className={"tooltip arrow_box"}>
          <div className={"tooltip-text"}>
            {props.section.sectionName}
          </div>
        </div>
      </div>
      <div className={"divider-container"}>
        <div className={"divider"}>|</div>
      </div>
    </div>
  );
}

// This field should be a controlled component
// It also needs styling

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  changeHandler = event => {
    this.setState({
      value: event.target.value
    });
  }

    render() {
      return (
      <div className="field">
        <input
          type="text"
          value={this.state.value}
          onChange={this.changeHandler}    
        /> 
          {this.props.section.sectionName}
        <button onClick={() => this.props.submitSection(this.state.value)}>Submit Section</button>
      </div>
      )
    }
  }

class App extends React.Component {
  constructor(props) {
		super(props);
    this.state = data;
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  getActiveSection() {
    return this.state.sections.filter(section => section.active);
  }

  getActiveSectionIndex() {
    return this.state.sections.indexOf(this.getActiveSection()[0]);
  }

  upDateActiveSection(sectionName) {
    const clickedSectionData = this.state.sections.filter(section => section.sectionName === sectionName)[0];
    const clickedSectionIndex = this.state.sections.indexOf(clickedSectionData);
  
    const newState = this.state;
    // null out all sections then activate clicked on section
    newState.sections.map(section => {
      section.active = false
      return section;
    });
  
    newState.sections[clickedSectionIndex].active = true;
    // this is messy. Should probably use a map data structure instead.
  
    console.log(sectionName + " was clicked" + clickedSectionIndex);
    this.setState({
      sections: newState.sections
    });

  }

  handleClick(sectionName) {
    this.upDateActiveSection(sectionName);
  }

  handleSubmit(fieldData) {
    const newState = this.state;
    newState.sections[this.getActiveSectionIndex()].value = fieldData;
    this.setState(newState)
  }

  renderIcon(section) {
    return (
      <Icon 
        section={section}
        onClick={() => this.handleClick(section.sectionName)}
        />
    );
  }

  renderField(section) {
    return (
      <Field 
      section={section}
      submitSection={this.handleSubmit}
      />
    );
  }

  render() {
    console.log(JSON.stringify(this.state, null, 2));
    const activeSection = this.state.sections.filter(section => section.active)[0]

    return (
      <div className="App">
        <div className="app-container">
          <div className="navigation-menu-container">
            <div className="navigation-bar">
              {this.state.sections.map(sections => this.renderIcon(sections))}
            </div>
          </div>
          <div className="field-container">
            {this.renderField(activeSection)}
          </div>
        </div>
      </div>
    );
  }
}

const data = {
  sections: [
  {sectionName: "name details", status: "available", active: true, value: ""},
  {sectionName: "dob details", status: "completed", active: false, value: ""},
  {sectionName: "address details", status: "invalid", active: false, value: ""},
  {sectionName: "phone details", status: "unavailable", active: false, value: ""},
]
}

export default App;
