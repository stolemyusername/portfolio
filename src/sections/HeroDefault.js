import React, { Component } from 'react';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const titleify = string => (string.split('-').map(word => word.toProperCase()).join(' '));

const delayAppear = (i, isShown) => (
	{
		transition: `opacity ${(i + 1) / 4}s linear`
	}
)

const Skill = (props) => {
		return (
			<li
				className="skill"
				onClick={props.handler}
			>
				<h2>
					{titleify(props.title)}
				</h2>
				<div className={"techs"}>
					{props.skill.map((tech, i) => {
						return (
							<span 
								className={props.expanded[props.index] ? "show" : "hide"} 
								key={i}
								style={delayAppear(i, props.expanded === props.index)}
								>
									{tech}
							</span>
							)
					})}
				</div>
			</li>)
}

class Hero extends Component {
	constructor(props){
		super()
		this.state = {
			expandedStatus: {},
		}
	}
  
  toggleExpanded(i) {
  	const newStatus = this.state.expandedStatus;
  	newStatus[i] = !newStatus[i];
  	this.setState({ expandedStatus: newStatus });
  }


  componentDidMount() {
  	//Trigger the startup animations
  	const delayedHover = (i) => {
  		const cb = this.toggleExpanded.bind(this, i)
  		setTimeout(cb, i * 1000);
  	}

  	Object.keys(this.props.resume.tech).forEach((item, i) => {
  		delayedHover(i);
  	})
  }

  render() {
    return (
      <div className="hero">
      	<div className="container">
      		<ul className="skills">
	      		{Object.keys(this.props.resume.tech).map((skill, i) => {
	  				return (
	  					<Skill 
	  					title={skill} 
	  					skill={this.props.resume.tech[skill]} 
	  					index={i}
	  					key={i}
	  					expanded={this.state.expandedStatus}
	  					handler={this.toggleExpanded.bind(this, i)}
	  				/>)
	      		})
	      		}
      		</ul>
      	</div>
      </div>
    );
  }
}

export default Hero;
