import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import formatCurrency from "../util";
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            product: null
        }
    }
    componentDidMount(){
        this.props.fetchProducts();
    };
    openModal=(product)=>{
        this.setState({product});
    };
    closeModal=()=>{
        this.setState({product:null});
    };
    render() {
        const {product}=this.state;
        return (
            <div>
                <Fade bottom cascade={true}>
                    {
                        !this.props.products ? (<div>Loading...</div>) : (
                    
                <ul className="products">
                    {this.props.products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#"+ product._id} onClick={()=>this.openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product_price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button onClick={()=>this.props.addtoCart(product)} className="primary button">Add to Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                )}
                </Fade>
                {product && (<Modal isOpen={true}
                    onRequestClose={this.closeModal}
                    >
                        <Zoom>
                            <button className="close-modal" onClick={()=>this.closeModal()}>x</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}></img>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        {product.description}
                                    </p>
                                    <p>
                                        Available sizes: {" "}
                                        {product.availableSizes.map(x=>
                                        <span> {" "}<button className="button">{x}</button></span>)}
                                    </p>
 
                                    <div className="product_price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button onClick={()=>this.props.addtoCart(product)} className="primary button">Add to Cart</button>
                                        </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>)
                }
            </div>
        )
    }
}
export default connect((state)=> ({products:state.products.filteredItems}), {fetchProducts,})(Products)