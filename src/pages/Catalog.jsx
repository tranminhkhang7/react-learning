import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import BooksService from '../services/books.service'


const Catalog = () => {
    const [products, setProducts] = useState([]);

    const loadProduct = useCallback(() => {
        BooksService.getAllBooks()
            .then(function (response) {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    useEffect(()=>{
        loadProduct()
    }, [])

    return (
        <Helmet title="Books">
            <div className="catalog">
                
                <div className="catalog__content">
                    <InfinityList
                        data={products}
                    />
                </div>

            </div>
        </Helmet>
    )
}

export default Catalog
