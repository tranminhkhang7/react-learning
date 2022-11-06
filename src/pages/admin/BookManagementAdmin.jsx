import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';

import Helmet from '../../components/Helmet'
import authService from '../../services/auth.service'
import '../../sass/table.css'
import BooksService from '../../services/books.service';
import { Button } from '@material-ui/core';

// import HeroSlider from '../components/HeroSlider'
// import Section, { SectionTitle, SectionBody } from '../components/Section'
// import PolicyCard from '../components/PolicyCard'
// import Grid from '../components/Grid'
// import ProductCard from '../../components/ProductCard'

// import heroSliderData from '../../assets/fake-data/hero-slider'
// import policy from '../../assets/fake-data/policy'
// import productData from '../assets/fake-data/products'

// import banner from '../assets/images/banner.png'

const BookManagementAdmin = () => {
    const [products, setProducts] = useState([]);

    const loadProduct = useCallback(() => {
        BooksService.getAllBooksAdmin()
            .then(function (response) {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    useEffect(() => {
        console.log("hello");
        loadProduct()
    }, [])


    // if (authService.checkRole() !== "\"ADMIN\"") {
    //     return <Redirect to='/' />;
    // }
    return (
        <Helmet title="Book Management">
            <Link to='/bookmanagement/add'>
                <button className='Comment-form-button'>Add a new book</button>
            </Link>
            <h2>Book Management</h2>
            <table>
                <tr>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Quantity left</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>

                {products && products.map((item, index) => (
                    <tr key={`Product-${index}`}>
                        <td>{item.bookId}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.price}</td>
                        <td>{item.quantityLeft}</td>
                        <td>{item.status}</td>
                        <td>
                            <Link to={`/bookmanagement/edit/${item.bookId}`}>
                            <button>Edit</button>
                            {/* {item.title} */}
                            </Link>
                        </td>
                        <td>
                            <Link to=''>
                                <button>Delete</button>
                            </Link>
                        </td>
                    </tr>
                ))
                }
                {/* <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
                <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                </tr>
                <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                </tr>
                <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                </tr>
                <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                </tr> */}
            </table>
        </Helmet>
    )
}

export default BookManagementAdmin