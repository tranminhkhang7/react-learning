import React, { useCallback, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { Redirect } from 'react-router';

import Helmet from '../../components/Helmet'
import authService from '../../services/auth.service'
import '../../sass/table.css'
import BooksService from '../../services/books.service';
import { Button, colors } from '@material-ui/core';

// import HeroSlider from '../components/HeroSlider'
// import Section, { SectionTitle, SectionBody } from '../components/Section'
// import PolicyCard from '../components/PolicyCard'
// import Grid from '../components/Grid'
// import ProductCard from '../../components/ProductCard'

// import heroSliderData from '../../assets/fake-data/hero-slider'
// import policy from '../../assets/fake-data/policy'
// import productData from '../assets/fake-data/products'

// import banner from '../assets/images/banner.png'

const BookManagementAdmin = props => {
    const value = queryString.parse(props.location.search);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);

    const [products, setProducts] = useState([]);
    const [totalNumber, setTotalNumber] = useState();
    const [pageNumberList, setPageNumberList] = useState([]);

    const loadProduct = useCallback(() => {
        setPage(value.page);
        setSize(value.size);
        BooksService.getAllBooksAdmin(page, size)
            .then(function (response) {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    const loadTotalNumber = useCallback(() => {
        BooksService.getTotalNumber()
            .then(function (response) {
                console.log(response.data);
                setTotalNumber(response.data);
                for (let i = 1; i <= totalNumber; i++) {
                    pageNumberList.push(i);
                    // setPageNumberList(current => [...current, i]);
                }
                console.log("hello list", pageNumberList);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    useEffect(() => {
        loadProduct();
        loadTotalNumber();
    }, [])


    const history = useHistory();
    const handleDelete = async (bookId) => {
        // console.log(bookId);
        try {

            await BooksService.deleteBook(bookId).then(
                () => {
                    window.alert("Successfully deleted.")
                    // history.push('/catalog/' + id);
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };


    function deletePopup(bookId) {
        let text = "Deleting this book means setting the book's status to disabled.\nDo you want to continue?";
        if (window.confirm(text) == true) {
            handleDelete(bookId);
        } else {
            console.log("Cancel");
        }
    }

    if (authService.checkRole() !== "\"ADMIN\"") {
        return <Redirect to='/' />;
    }
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
                            {item.status === 'active'
                                ?
                                <button style={{ backgroundColor: "#c0392b", color: "#ecf0f1" }} onClick={(e) => {
                                    deletePopup(item.bookId);
                                }}>
                                    Disable
                                </button>
                                :
                                <button style={{ backgroundColor: "#27ae60", color: "#ecf0f1" }} onClick={(e) => {
                                    deletePopup(item.bookId);
                                }}>
                                    Active
                                </button>
                            }
                        </td>
                    </tr>
                ))
                }
            </table>
            {
                pageNumberList.map((item, index) => (
                    <Link to='' key={`Page-${index}`}>{item}</Link> 
                    
            ))
            }
        </Helmet>
    )
}

export default BookManagementAdmin