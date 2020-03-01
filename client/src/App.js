import React from 'react'
import './scss/master.scss' // applies global scss styles
import Home from './components/layouts/Home'
import Sign_In from './components/layouts/Sign_In'
import List from './components/layouts/List'
import Developer from './components/layouts/Developer'
import Four_Oh_Four from './components/layouts/Four_Oh_Four'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux' // provides our application with a store, it has to wrap around everything
import store from './store'
import metadata_image from './img/las-vegas-developers-coding-meetup-metadata.jpg'

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
                  <Helmet>
                     <meta charset="utf-8" />
                     {/* <link
                        rel="shortcut icon"
                        href="%PUBLIC_URL%/favicon.ico"
                     /> */}
                     <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                     />
                     <title>Las Vegas Developers</title>
                     <link
                        rel="canonical"
                        href="https://www.developers.vegas"
                     />
                     <meta
                        name="keywords"
                        content="coding, meetup, las vegas, programming, tech, startup, software, app, #learntocode"
                     />
                     <meta
                        name="description"
                        content="Las Vegas software developers and learners."
                     />

                     <meta property="og:locale" content="en_US" />
                     <meta property="og:type" content="website" />
                     <meta property="og:title" content="Las Vegas Developers" />
                     <meta
                        property="og:description"
                        content="Las Vegas software developers and learners."
                     />
                     <meta
                        property="og:url"
                        content="https://www.developers.vegas"
                     />
                     <meta property="og:site_name" content="Developers.Vegas" />
                     <meta property="og:image" content={metadata_image} />

                     {/* <link rel="apple-touch-icon" href="logo192.png" /> */}
                     {/* <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    --> */}
                     {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
                     {/* <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    --> */}
                  </Helmet>
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
