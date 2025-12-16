import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'Latest'} text2={'collections'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Elevate your style with our latest collection of timeless, modern designs crafted for every occasion.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {loading ? (
                    Array(10).fill().map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="overflow-hidden bg-gray-300 h-48 w-full rounded-md"></div>
                            <div className="pt-3 pb-1 bg-gray-300 h-4 mt-2 w-2/3 rounded-md"></div>
                            <div className="text-sm font-medium flex items-center mt-2">
                                <div className="bg-gray-300 h-4 w-12 rounded-md"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                )}
            </div>
        </div>
    );
}

export default LatestCollection;
