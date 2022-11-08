import React, { useCallback, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { Redirect } from 'react-router';

import Helmet from '../../components/Helmet'
import authService from '../../services/auth.service'
import '../../sass/table.css'
import BooksService from '../../services/books.service';
import { Button, colors } from '@material-ui/core';
import CustomersService from '../../services/customers.service';
import GenresService from '../../services/genre.service';

// import HeroSlider from '../components/HeroSlider'
// import Section, { SectionTitle, SectionBody } from '../components/Section'
// import PolicyCard from '../components/PolicyCard'
// import Grid from '../components/Grid'
// import ProductCard from '../../components/ProductCard'

// import heroSliderData from '../../assets/fake-data/hero-slider'
// import policy from '../../assets/fake-data/policy'
// import productData from '../assets/fake-data/products'

// import banner from '../assets/images/banner.png'

const GenreManagement = props => {
    const value = queryString.parse(props.location.search);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [genres, setGenres] = useState([]);
    const [totalNumber, setTotalNumber] = useState();
    const [pageNumberList, setPageNumberList] = useState([]);

    const loadGenres = useCallback(() => {
        setPage(value.page);
        setSize(value.size);
        GenresService.getAllGenres(page, size)
            .then(function (response) {
                console.log(response.data);
                setGenres(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    // const loadTotalNumber = useCallback(() => {
    //     CustomersService.getTotalNumber()
    //         .then(function (response) {
    //             console.log(response.data);
    //             setTotalNumber(response.data);
    //             for (let i = 1; i <= totalNumber; i++) {
    //                 pageNumberList.push(i);
    //                 // setPageNumberList(current => [...current, i]);
    //             }
    //             console.log("hello list customer", pageNumberList);
    //         })
    //         .catch(function (error) {
    //             console.log(error.message);
    //             return null;
    //         });
    // })

    useEffect(() => {
        loadGenres();
        // loadTotalNumber();
    }, [])


    const history = useHistory();
    const handleDelete = async (genreId) => {
        // console.log(bookId);
        try {
            await GenresService.deleteGenre(genreId).then(
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


    function deletePopup(genreId) {
        let text = "Deleting this genre means permanently removing the genre. This action can not be undone.\nDo you want to continue?";
        if (window.confirm(text) === true) {
            handleDelete(genreId);
        } else {
            console.log("Cancel");
        }
    }

    // if (authService.checkRole() !== "\"ADMIN\"") {
    //     return <Redirect to='/' />;
    // }
    return (
        <Helmet title="Genre Management">
            <Link to='/genremanagement/add'>
                <button className='Comment-form-button'>Add a new genre</button>
            </Link>
            <h2>Customer Management</h2>
            <table>
                <tr>
                    <th>Genre ID</th>
                    <th>Genre name</th>
                    <th>Delete</th>
                </tr>

                {genres && genres.map((item, index) => (
                    <tr key={`Product-${index}`}>
                        <td>{item.genreId}</td>
                        <td>{item.genreName}</td>
                        <td>
                            <button style={{ backgroundColor: "#c0392b", color: "#ecf0f1" }} onClick={(e) => {
                                deletePopup(item.genreId);
                            }}>
                                Delete
                            </button>
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

export default GenreManagement