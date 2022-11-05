import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import HeaderAdmin from './admin/HeaderAdmin'

import Footer from './Footer'
import ProductViewModal from './ProductViewModal'
import authService from '../services/auth.service'

import Routes from '../routes/Routes'

const Layout = () => {
    return (
        <BrowserRouter>
            <Route render={props => (
                <div>
                    {authService.isLoggedIn() ?
                        < HeaderAdmin {...props} />
                        :
                        <Header {...props} />
                    }
                    <div className="container">
                        <div className="main">
                            <Routes />
                        </div>
                    </div>
                    <Footer />
                    <ProductViewModal />
                </div>
            )} />
        </BrowserRouter>
    )
}

export default Layout
