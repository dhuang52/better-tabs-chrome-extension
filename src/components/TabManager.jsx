import React from 'react';
import PropTypes from 'prop-types'
import TabManagerHeader from './TabManagerHeader';
import Tab from './Tab';
import '../style/app.css'

class TabManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      pinned: false,
      tabs: []
    }

    // TODO: persist this, should not be reset everytime a new tab is opened
    this.keyboardShortcut = {
      special: ['Meta', 'Control'],
      char: ['b']
    }
    this.keysDown = {}
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove)
    document.addEventListener("keydown", this.handleKeyboard)
    document.addEventListener("keyup", this.handleKeyboard)
    chrome.runtime.onMessage.addListener(this.handleRuntimeMessage)
  }

  handleRuntimeMessage = (message, sender, sendResponse) => {
    console.log(message)
    console.log("yoyoyoyoyoyoo")
    this.setState({tabs: message})
  }

  handleMouseMove = (e) => {
    if(e.pageX === 0) {
      this.handleShow()
    }
  }

  handleShow = () => this.state.active || this.setState({active: true})

  handleOnMouseLeave = () => !this.state.pinned && this.handleExitEvent()

  handleExitEvent = () => {
    // exit events: onMouseLeave, and click on exit button in TabManagerHeader
    this.setState({
      active: false,
      pinned: false
    })
  }

  handleKeyboard = (e) => {
    this.keysDown[e.key] = e.type === 'keydown'

    let allCharsDown = this.keyboardShortcut.char.reduce((acc, curr) => acc && this.keysDown[curr], true)
    let allSpecialDown = this.keyboardShortcut.special.reduce((acc, curr) => acc && this.keysDown[curr], true)

    if(allCharsDown && allSpecialDown) {
      this.keysDown = {}
      this.handleShow()
    }
  }

  handlePin = () => {
    this.setState((state, props) => ({
      pinned: !state.pinned
    }))
  }

  displayContent = () => {
    return (
      <div>
        <TabManagerHeader pinned={this.state.pinned} 
            handlePin={this.handlePin} 
            handleExit={this.handleExitEvent}/>
        {this.state.tabs.map(tab => <Tab key={tab.id} tab={tab}/>)}
      </div>
    )
  }

  render() {
    // console.log(this.state.tabs)
    console.log("tab manager:", this.state.tabs)
    return (
      <div id="tab-manager" 
        className={this.state.active ? 'shownnn' : 'hiddennn'}
        onMouseLeave={this.handleOnMouseLeave}
        onKeyUp={this.handleKeyboard}>

        {this.displayContent()}
        {/* {!this.state.active || this.displayContent()} */}
      </div>
    )
  }
}

TabManager.propTypes = {
  
}

export default TabManager