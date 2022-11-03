import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {

    console.log(props.product);

    const dispatch = useDispatch()

    return (
        <div className="product-card">
            <Link to={`/catalog/${props.product.bookId}`}>

                <div className="product-card__image">
                    <img src={props.product.imageLink} alt="" />
                </div>

                <h3 className="product-card__name">{props.product.title}</h3>

                <div className="product-card__price">
                    {numberWithCommas(props.product.price)}
                </div>

            </Link>

            <div className="product-card__btn">
                <Button
                    size="sm"
                    icon="bx bx-cart"
                    animate={true}
                    onClick={() => dispatch(set(props.slug))}>
                    buy now
                </Button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard
