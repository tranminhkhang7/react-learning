import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Genre from '../pages/Genre'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/catalog/:id' component={Product}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/genre/:id' component={Genre} />




        </Switch>
    )
}

export default Routes
