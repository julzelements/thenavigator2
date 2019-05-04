import React from 'react';
import './App.css';

function Icon(props) {
  return (
    <div>
      [{props.status}]
    </div>
  );
}

function Field(props) {
  return (
    <div>
      [FIELD]
    </div>
  );
}


class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = data
  }

  renderIcon(section) {
    return (
      <Icon status={section.status}/>
    );
  }

  render() {

    const activeSection = this.state.sections.filter(section => section.active)[0]

    return (
      <div>
        <div>
          {this.state.sections.map(sections => this.renderIcon(sections))}
        </div>
          {activeSection.sectionName}
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
