import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')
if (rootElement && rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement)
} else {
  ReactDOM.render(<App />, rootElement)
}
