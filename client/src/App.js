import React from 'react'
import './scss/master.scss' // applies global scss styles
import Home from './components/layouts/Home'
import Sign_In from './components/layouts/Sign_In'
import List from './components/layouts/List'
import Four_Oh_Four from './components/layouts/Four_Oh_Four'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux' // provides our application with a store, it has to wrap around everything
import store from './store'

export default function App() {
   const api_regex = /^\/api\/.*/
   // if using "/api/" in the pathname, don't use react router
   if (api_regex.test(window.location.pathname)) {
      return <div />
   } else {
      return (
         <Provider store={store}>
            <Router>
               <div className="App">
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/hello" component={Sign_In} />
                     <Route exact path="/list" component={List} />
                     <Route component={Four_Oh_Four} />
                  </Switch>
               </div>
            </Router>
         </Provider>
      )
   }
}
