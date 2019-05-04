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

  return (
    <div className={props.section.status}>
      <div>
        <FontAwesomeIcon 
          icon={icon} 
          size="2x" 
          transform={transform}
          onClick={props.onClick}
          />
      </div>
      <div className={"divider-container"}>
        <div className={"divider"}>|</div>
      </div>
    </div>
  );
}

function Field(props) {
  return (
    <div>
      {props.section.sectionName}
    </div>
  );
}


class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = data;
  }

  handleClick(sectionName) {
    const clickedSectionData = this.state.sections.filter(section => section.sectionName === sectionName)[0];
    const clickedSectionIndex = this.state.sections.indexOf(clickedSectionData);
    const newState = this.state;
    // null out all sections then activate clicked on section
    newState.sections.map(section => {
      section.active = false
      return section;
    });
    newState.sections[clickedSectionIndex].active = true;
    // this is messy. Should probably use a map structure instead.

    console.log(sectionName + " was clicked" + clickedSectionIndex);
    this.setState({
      sections: newState.sections
    });
    
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
      <Field section={section}/>
    );
  }

  render() {
    console.log(JSON.stringify(this.state, null, 2));
    const activeSection = this.state.sections.filter(section => section.active)[0]

    return (
      <div>
        <div>
          <div className="navigation-menu-container">
            <div className="navigation-bar">
              {this.state.sections.map(sections => this.renderIcon(sections))}
            </div>
          </div>
          {this.renderField(activeSection)}
        </div>
      </div>
    );
  }
}

const data = {
  sections: [
  {sectionName: "name details", status: "available", active: true},
  {sectionName: "dob details", status: "completed", active: false},
  {sectionName: "address details", status: "invalid", active: false},
  {sectionName: "phone details", status: "unavailable", active: false},
]
}

export default App;
