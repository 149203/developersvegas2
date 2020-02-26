import React from 'react'
import './scss/master.scss' // applies global scss styles
import Home from './components/layouts/Home'
import Sign_In from './components/layouts/Sign_In'
import List from './components/layouts/List'
import Developer from './components/layouts/Developer'
import Four_Oh_Four from './components/layouts/Four_Oh_Four'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux' // provides our application with a store, it has to wrap around everything
import store from './store'

export default function App() {
   const api_regex = /^\/api\/.*/
   const slug_regex = /^\/.+-.+/
   const { pathname } = window.location
   // if using "/api/" in the pathname, don't use react router
   if (api_regex.test(pathname)) {
      return <div /> // but we must return something in JSX, at least an empty div
   } else {
      // extract slug
      let slug = ''
      if (slug_regex.test(pathname)) {
         slug = pathname.slice(1)
      }
      const handle_slug = slug => {
         if (slug) {
            return <Route exact path="/:slug" component={Developer} />
         } else return <Route component={Four_Oh_Four} />
      }
      return (
         <Provider store={store}>
            <Router>
               <div className="App">
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/hello" component={Sign_In} />
                     <Route exact path="/list" component={List} />
                     {/* Switch goes in order. At the bottom, check if it's a slug. If it is, display a developer component, else display the 404 component */}
                     {handle_slug(slug)}
                  </Switch>
               </div>
            </Router>
         </Provider>
      )
   }
}
