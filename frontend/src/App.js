import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from './header'
import Footer from './footer'
import HomePage from "./homePage"
import ProductsList from "./searchAndReview/products-list";


function App() {
    return (
        <Router>
            <Header />
            <div className="container mt-3">
                <Route exact path={["/", "/homePage"]} component={HomePage} />
                <Route exact path={["/restaurants"]} component={ProductsList} />
            </div>
            <Footer />
        </Router>
        )
}

export default App