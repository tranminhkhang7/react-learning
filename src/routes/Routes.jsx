import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Product from '../pages/Product'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Genre from '../pages/Genre'
import BookManagementAdmin from '../pages/admin/BookManagementAdmin'
import AddNewBook from '../pages/admin/AddNewBook'
import EditBook from '../pages/admin/EditBook'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/catalog/:id' component={Product} />
            <Route path='/catalog' component={Catalog} />
            <Route path='/cart' component={Cart} />
            <Route path='/order' component={Order} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/genre/:id' component={Genre} />

            <Route path='/bookmanagement' exact component={BookManagementAdmin} />
            <Route exact path='/bookmanagement/add' component={AddNewBook} />
            <Route exact path='/bookmanagement/edit/:id' component={EditBook} />



        </Switch>
    )
}

export default Routes
