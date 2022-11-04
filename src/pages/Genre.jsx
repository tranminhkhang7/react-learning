import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import GenresService from '../services/genre.service';

const Genre = props => {
    
    const genreId = props.match.params.id;

    const initFilter = {
        category: []
        ,
        color: [],
        size: []
    }


    const [products, setProducts] = useState([]);

    const loadProduct = useCallback(() => {
        GenresService.getAllBooksByGenreId(genreId)
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

    // const productList = productData.getAllProducts()
    // const [products, setProducts] = useState(productList);

    const [filter, setFilter] = useState(initFilter)



    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] })
                    break
                case "COLOR":
                    setFilter({ ...filter, color: [...filter.color, item.color] })
                    break
                case "SIZE":
                    setFilter({ ...filter, size: [...filter.size, item.size] })
                    break
                default:
            }
        } else {
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({ ...filter, category: newCategory })
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({ ...filter, color: newColor })
                    break
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size)
                    setFilter({ ...filter, size: newSize })
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(() => {
        // let temp = productList
        let temp = products

        if (filter.category.length > 0) {
            temp = temp.filter(e => filter.category.includes(e.categorySlug))
        }

        if (filter.color.length > 0) {
            temp = temp.filter(e => {
                const check = e.colors.find(color => filter.color.includes(color))
                return check !== undefined
            })
        }

        if (filter.size.length > 0) {
            temp = temp.filter(e => {
                const check = e.size.find(size => filter.size.includes(size))
                return check !== undefined
            })
        }

        setProducts(temp)
    },
        [filter, products],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title="Sản phẩm">
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

export default Genre
