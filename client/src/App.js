import React from 'react'
import './scss/master.scss' // applies global scss styles
import Home from './components/layouts/Home'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux' // provides our application with a store, it has to wrap around everything
import store from './store'

function App() {
   return (
      <Provider store={store}>
         <Router>
            <div className="App">
               <Route exact path="/" component={Home} />
            </div>
         </Router>
      </Provider>
   )
}

export default App
