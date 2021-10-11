import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStampDetail } from '../actions/productActions'

function ProductScreen({ match }) {

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const id = match.params.id
    const {product, loading}  = productDetails

    useEffect(() => {
        if (!product) {
            dispatch(getStampDetail(id))
        }
        return () => {
            
        }
    }, [dispatch, id, product])
    
    return loading ? <p>loading</p> : 
        <div>
            ProductScreen of : {product.name}
        </div>
        
}

export default ProductScreen
