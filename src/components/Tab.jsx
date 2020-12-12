import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {

  handleOnClick = () => {
    console.log(this.props)
    chrome.runtime.sendMessage({tabId: this.props.tab.id})
  }

  render() {
    const {tab} = this.props
    return (
      <div 
        className="tab tab-manager-hoverable"
        onClick={this.handleOnClick}>
        <span><img className="tab-icon" src={tab.favIconUrl || ""} alt={tab.title}/></span>
        <div className="tab-title">{tab.title}</div>
      </div>
    )
  }
}

Tab.propTypes = {
  tab: PropTypes.object
}

export default Tab