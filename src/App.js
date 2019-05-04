import React from 'react';
import './App.css';

function Icon(props) {
  return (
    <button
      onClick={() => props.onClick()}
     >
      {props.section.active.toString()}
    </button>
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
          {this.state.sections.map(sections => this.renderIcon(sections))}
        </div>
          {this.renderField(activeSection)}
      </div>
    );
  }
}

const data = {
  sections: [
  {sectionName: "name details", status: "unavailable", active: true},
  {sectionName: "dob details", status: "available", active: false},
  {sectionName: "address details", status: "available", active: false},
]
}

export default App;
