import React from 'react';
import ReactDOM from 'react-dom';
import TabManager from './components/TabManager'

if(!document.getElementById("tab-manager-root")) {
  let div = document.createElement("div")
  div.setAttribute("id", "tab-manager-root")
  document.body.prepend(div)
  ReactDOM.render(<TabManager />, document.getElementById('tab-manager-root'));
}
