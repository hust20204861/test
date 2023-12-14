import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="admin-sidebar">
            <nav id="sidebar">
                <ul className="list-components">
                    <li>
                        <Link to="/dashboard"><i className="admin-dashboard"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu"  className="products-menu"><i
                            className="admin-product"></i> Products</a>
                        <ul  id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="product-all"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="product-create"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="admin-orders"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="admin-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="admin-reviews"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
