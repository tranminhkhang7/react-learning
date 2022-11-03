import React from 'react'

import { Link } from 'react-router-dom'

import Grid from './Grid'

import logo from '../assets/images/books-corner-high-resolution-logo-color-on-transparent-background.png'

const footerAboutLinks = [
    {
        display: "About us",
        path: "/about"
    },
    // {
    //     display: "Liên hệ",
    //     path: "/about"
    // },
    // {
    //     display: "Tuyển dụng",
    //     path: "/about"
    // },
    // {
    //     display: "Tin tức",
    //     path: "/about"
    // },
    // {
    //     display: "Hệ thống cửa hàng",
    //     path: "/about"
    // }
]

const footerCustomerLinks = [
    // {
    //     display: "Chính sách đổi trả",
    //     path: "/about"
    // },
    // {
    //     display: "Chính sách bảo hành",
    //     path: "/about"
    // },
    // {
    //     display: "Chính sách hoàn tiền",
    //     path: "/about"
    // }
]
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                            REACH US
                        </div>
                        <div className="footer__content">
                            <p>
                                Delivery service <strong>0123456789</strong>
                            </p>
                            {/* <p>
                                Thắc mắc đơn hàng <strong>0123456789</strong>
                            </p>
                            <p>
                                Góp ý, khiếu nại <strong>0123456789</strong>
                            </p> */}
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            ABOUT BOOKS CORNER
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            AFTER-SALES SERVICES
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Hello this is description.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer
