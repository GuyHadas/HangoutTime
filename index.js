import Motion from 'react'
window.Motion = Motion

import React from 'react'
import ReactDOM from 'react-dom'
import Main from './views/main'

ReactDOM.render(React.createElement(Main), document.getElementById('app'))

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
}
