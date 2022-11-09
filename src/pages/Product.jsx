import React, { useCallback, useEffect, useState } from 'react'

import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'
import CommentProduct from '../components/CommentProduct'

import productData from '../assets/fake-data/products'
import BooksService from '../services/books.service'
import CommentsService from '../services/comments.service'
import authService from '../services/auth.service'
import "../sass/comment.css";
import "../sass/rating.css";
import { useHistory } from 'react-router-dom'

const Product = props => {

    const id = props.match.params.id;

    // console.log(id);

    const [product, setProduct] = useState({});
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);

    const loadProductDetail = useCallback(() => {
        BooksService.getBookDetail(id)
            .then(function (response) {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    }, [id])

    const history = useHistory();
    const handleComment = async (e) => {
        e.preventDefault();
        try {
            await CommentsService.addComment(content, rating, id).then(
                () => {
                    history.push('/catalog/' + id);
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

    useEffect(() => {
        // console.log("here");
        loadProductDetail();
    }, [id])

   

    return (
        <Helmet title={product?.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product} />
                </SectionBody>
            </Section>

            <Section>
                <SectionTitle>
                    Comments
                </SectionTitle>

                <SectionBody>

                    <div>
                        <form className="Comment-form" onSubmit={handleComment}>
                            <div className="Comment-form-content">
                                <div>
                                    {authService.isLoggedIn() ?
                                        <input
                                            // className="form-control mt-1"
                                            className="Comment-form-input"
                                            type="textarea"
                                            placeholder="Fell free to write your comment..."
                                            name="text"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                        :
                                        <input disabled
                                            // className="form-control mt-1"
                                            className="Comment-form-input"
                                            type="textarea"
                                            placeholder="This section is only available for logged in users."
                                            name="text"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    }
                                </div>

                                {authService.isLoggedIn() ?
                                    <div className="rate">
                                        <input type="radio" id="star5" name="rate" value="5"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star5" title="text">5 stars</label>
                                        <input type="radio" id="star4" name="rate" value="4"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="rate" value="3"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" value="2"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star2" title="text">2 stars</label>
                                        <input type="radio" id="star1" name="rate" value="1"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star1" title="text">1 star</label>
                                    </div>
                                    :
                                    <div className="rate">
                                        <input disabled type="radio" id="star5" name="rate" value="5"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star5" title="text">5 stars</label>
                                        <input disabled type="radio" id="star4" name="rate" value="4"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star4" title="text">4 stars</label>
                                        <input disabled type="radio" id="star3" name="rate" value="3"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star3" title="text">3 stars</label>
                                        <input disabled type="radio" id="star2" name="rate" value="2"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star2" title="text">2 stars</label>
                                        <input disabled type="radio" id="star1" name="rate" value="1"
                                            onClick={(e) => setRating(e.target.value)} />
                                        <label for="star1" title="text">1 star</label>
                                    </div>
                                }



                                <div>
                                    {authService.isLoggedIn() ?
                                        <button type="submit" className="Comment-form-button">
                                            Submit
                                        </button>
                                        :
                                        <button disabled type="submit" className="Comment-form-button">
                                            Submit
                                        </button>
                                    }
                                </div>

                            </div>
                        </form>
                    </div>
                </SectionBody>
                <SectionBody>
                    <CommentProduct id={id} />
                </SectionBody>

            </Section>
        </Helmet>
    )
}

export default Product
