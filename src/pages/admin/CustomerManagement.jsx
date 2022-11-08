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

// import HeroSlider from '../components/HeroSlider'
// import Section, { SectionTitle, SectionBody } from '../components/Section'
// import PolicyCard from '../components/PolicyCard'
// import Grid from '../components/Grid'
// import ProductCard from '../../components/ProductCard'

// import heroSliderData from '../../assets/fake-data/hero-slider'
// import policy from '../../assets/fake-data/policy'
// import productData from '../assets/fake-data/products'

// import banner from '../assets/images/banner.png'

const CustomerManagement = props => {
    const value = queryString.parse(props.location.search);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const [customers, setCustomers] = useState([]);
    const [totalNumber, setTotalNumber] = useState();
    const [pageNumberList, setPageNumberList] = useState([]);

    const loadCustomer = useCallback(() => {
        setPage(value.page);
        setSize(value.size);
        CustomersService.getAllCustomersAdmin(page, size)
            .then(function (response) {
                console.log(response.data);
                setCustomers(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    const loadTotalNumber = useCallback(() => {
        CustomersService.getTotalNumber()
            .then(function (response) {
                console.log(response.data);
                setTotalNumber(response.data);
                for (let i = 1; i <= totalNumber; i++) {
                    pageNumberList.push(i);
                    // setPageNumberList(current => [...current, i]);
                }
                console.log("hello list customer", pageNumberList);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    })

    useEffect(() => {
        loadCustomer();
        loadTotalNumber();
    }, [])


    const history = useHistory();
    const handleDelete = async (customerId) => {
        // console.log(bookId);
        try {
            await CustomersService.deleteCustomer(customerId).then(
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


    function deletePopup(customerId) {
        let text = "Deleting this customer means setting the customer's status to disabled.\nDo you want to continue?";
        if (window.confirm(text) == true) {
            handleDelete(customerId);
        } else {
            console.log("Cancel");
        }
    }

    // if (authService.checkRole() !== "\"ADMIN\"") {
    //     return <Redirect to='/' />;
    // }
    return (
        <Helmet title="Customer Management">
            {/* <Link to='/bookmanagement/add'>
                <button className='Comment-form-button'>Add a new book</button>
            </Link> */}
            <h2>Customer Management</h2>
            <table>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Date of birth</th>
                    <th>Status</th>
                    <th>Delete</th>
                </tr>

                {customers && customers.map((item, index) => (
                    <tr key={`Product-${index}`}>
                        <td>{item.customerId}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.birthday}</td>
                        <td>{item.status}</td>
                        <td>
                            {item.status === 'active'
                                ?
                                <button style={{ backgroundColor: "#c0392b", color: "#ecf0f1" }} onClick={(e) => {
                                    deletePopup(item.customerId);
                                }}>
                                    Disable
                                </button>
                                :
                                <button style={{ backgroundColor: "#27ae60", color: "#ecf0f1" }} onClick={(e) => {
                                    deletePopup(item.customerId);
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

export default CustomerManagement