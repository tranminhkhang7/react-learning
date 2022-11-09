import React from 'react'
import CommentsService from '../services/comments.service';
import { useCallback, useEffect, useState } from 'react';

const CommentProduct = (props) => {

    const [comments, setComments] = useState([]);

    const loadCommentProduct = useCallback(() => {
        CommentsService.getCommentOfAProduct(props.id)
            .then(function (response) {
                console.log(response.data);
                setComments(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                return null;
            });
    }, [props.id])

    useEffect(() => {
        // console.log("here comment");
        loadCommentProduct();
    }, [])

    return (
        <>
            {
                comments.map((item, index) => (
                    <div key={`Comment-${index}`}>
                        <div className='Comment-form'>
                            <div className="Comment-form-content">
                                <b>{item.customerName}</b> <i>&nbsp;&nbsp;has commented at {item.timestamp} with {item.rating}★</i>
                            </div>
                            <div className="Comment-form-content">
                                {item.content}
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                ))
            }
        </>
    )
}

export default CommentProduct
