import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Skeleton = () => (
  <div className="animate-pulse border-t-2 pt-10">
    <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="border bg-gray-300 rounded-lg w-[24%] sm:w-full sm:mb-3 flex-shrink-0 h-24 md:h-[22.1%]"
            ></div>
          ))}
        </div>
        <div className="w-full sm:w-[80%]">
          <div className="bg-gray-300 rounded-lg w-full h-72 md:h-full"></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-gray-300 rounded-lg w-3/4 h-8 mb-4"></div>
        <div className="bg-gray-300 rounded-lg w-1/2 h-6 mb-4"></div>
        <div className="bg-gray-300 rounded-lg w-1/3 h-10 mb-4"></div>
        <div className="bg-gray-300 rounded-lg w-1/4 h-12 my-6"></div>
        <hr className="mt-8 sm:w-4/5" />
        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-300 rounded-lg w-1/3 h-4"></div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-20">
      <div className="flex">
        <div className="border-2  bg-gray-300 rounded-lg px-5 py-3 text-sm w-[10%]"></div>
        <div className="border bg-gray-300 rounded-lg px-5 py-3 text-sm w-[10%]"></div>
      </div>
      <div className="flex flex-col gap-4 border px-6 py-6 mt-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-300 rounded-lg w-full h-6"></div>
        ))}
      </div>
    </div>
  </div>
);

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
      setSize('');
    }
  }, [productId, products]);

  if (!products || products.length === 0) {
    return <Skeleton />;
  }

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} alt="" className={`border rounded-lg w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${item === image ? 'border-black/50 border-2' : ''}`} />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {(85 * productData.price) - 1}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border rounded-lg py-2 px-4 bg-gray-100 ${item === size ? 'border-black/50 border-2' : ''}`} key={index} >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="uppercase bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            Add to cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border-2 border-black/50 px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Luxeloom is a premier e-commerce platform that redefines the online shopping experience with a
            focus on luxury, style, and sophistication. It serves as a virtual marketplace where premium
            brands and discerning customers connect seamlessly, eliminating the need for a physical storefront.
            Luxeloom stands out for its elegance, convenience, and global accessibility, offering a curated
            selection of high-quality products.
          </p>
          <p>
            Each item on Luxeloom is showcased with stunning imagery, detailed descriptions, and transparent
            pricing. Products feature their own dedicated pages, complete with information about sizes,
            colors, and other variations to help customers make informed choices. Designed to offer a refined
            shopping journey, Luxeloom combines functionality with a personalized touch, making it a preferred
            destination for luxury enthusiasts worldwide.
          </p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='h-[40vh] flex items-center justify-center text-2xl md:text-4xl text-gray-700'>Product not found!</div>
  )
};

export default Product;
