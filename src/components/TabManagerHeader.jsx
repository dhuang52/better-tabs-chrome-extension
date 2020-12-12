import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faTimes } from '@fortawesome/free-solid-svg-icons';

class TabManagerHeader extends React.Component {
  render() {
    return (
      <div id="tab-manager-header">
        <FontAwesomeIcon 
          icon={faTimes}
          size="lg"
          className="icon tab-manager-hoverable disabled"
          id="exit-icon"
          onClick={this.props.handleExit} />
        
        <FontAwesomeIcon 
          icon={faThumbtack}
          size="lg"
          className={"icon tab-manager-hoverable " + (this.props.pinned ? "active" : "disabled")}
          onClick={this.props.handlePin} />
        
        <input id="search-bar" type="text" placeholder="Search"></input>
      </div>
    )
  }
}

TabManagerHeader.propTypes = {
  pinned: PropTypes.bool,
  handlePin: PropTypes.func,
  handleExit: PropTypes.func,
}

export default TabManagerHeader