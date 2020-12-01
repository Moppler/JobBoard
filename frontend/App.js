import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  </BrowserRouter>
)

const Home = () => {
  useEffect(() => {
    axios.get('api/jobs')
      .then(resp => {
        console.log(resp.data)
      })
  }, [])
 
  return <h1>Hello world</h1>
}

export default App