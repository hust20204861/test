import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <div className='products'>
            <div className="product">
                <img
                    className="product-img"
                    src={product.images[0].url}
                    alt='product'
                />
                <div className="product-name">
                    <h5 className="cart-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings">
                        <div className="rating">
                            <div className="star" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="cart-text">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view" className="view-details">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
