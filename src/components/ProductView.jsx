import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Stars from 'react-stars-display'

import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/product-modal/productModalSlice'

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'

const ProductView = props => {

    const dispatch = useDispatch()

    let product = props.product

    if (product === undefined) product = {
        title: "",
        price: '',
        imageLink: null,
        // image02: null,
        categorySlug: "",
        // colors: [],
        slug: "",
        // size: [],
        description: ""
    }

    const [previewImg, setPreviewImg] = useState(product.imageLink)

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    // const [color, setColor] = useState(undefined)

    // const [size, setSize] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product.image01)
        setQuantity(1)
        // setColor(undefined)
        // setSize(undefined)
    }, [product])

    // console.log(product.genreList);

    const check = () => {
        // if (color === undefined) {
        //     alert('Vui lòng chọn màu sắc!')
        //     return false
        // }

        // if (size === undefined) {
        //     alert('Vui lòng chọn kích cỡ!')
        //     return false
        // }

        return true
    }

    const addToCart = () => {
        if (check()) {
            let newItem = {
                // slug: product.slug,
                bookId: product.bookId,
                title: product.title,
                imageLink: product.imageLink,
                // color: color,
                // size: size,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                alert('Successfully add to cart')
            } else {
                alert('Fail to add to cart')
            }
        }
    }

    const goToCart = () => {
        if (check()) {
            let newItem = {
                // slug: product.slug,
                bookId: product.bookId,
                title: product.title,
                imageLink: product.imageLink,
                // color: color,
                // size: size,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                dispatch(remove())
                props.history.push('/cart')
            } else {
                alert('Fail to add to cart')
            }
        }
    }

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    {/* <div className="product__images__list__item" onClick={() => setPreviewImg(product.imageLink)}>
                        <img src={product.imageLink} alt="" />
                    </div> */}
                    {/* <div className="product__images__list__item" onClick={() => setPreviewImg(product.imageLink)}>
                        <img src={product.imageLink} alt="" />
                    </div> */}
                </div>
                <div className="product__images__main">
                    <img src={product.imageLink} alt="" />
                </div>

                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Product detail
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'See less' : 'See more'
                            }
                        </Button>
                    </div>
                </div>

            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.title}</h1>
                <Stars
                    stars={product.averageRating}
                    size={30}
                />


                {/* {product.genreList[1]} */}

                <br></br>
                <br></br>
                {
                    product && product.genreList && product.genreList.map((item, index) => (
                        <Link key={`Genre-${index}`} to={`/genre/${item.genreId}`}>  {item.genreName}  |</Link>
                    ))
                }

                {/* <Link to={`/genre/3`}>this is a genre</Link>                     */}
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)}
                    </span>
                </div>

                {/* <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.colors.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`} onClick={() => setColor(item)}>
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            product && product.size > 0 && product.size.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`} onClick={() => setSize(item)}>
                                    <span className="product__info__item__list__item__size">
                                        {item}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div> */}

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Quantity
                    </div>

                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>

                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>

                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>

                </div>

                <div className="product__info__item">
                    <Button onClick={() => addToCart()}>add to cart</Button>
                    <Button onClick={() => goToCart()}>buy now</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Product detail
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'See less' : 'See more'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)
