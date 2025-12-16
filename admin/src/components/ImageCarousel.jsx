import React, { useState } from 'react'

const ImageCarousel = ({ items }) => {
    const images = items.map(item => item.image[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative">
            <img src={images[currentImageIndex]} alt="Order Item" className="w-full h-auto" />
            {images.length > 1 && (
                <div className="flex items-center justify-between mt-3">
                    <button onClick={prevImage} className="text-[#505050] bg-[#ffdbd7] border border-[#b28878] rounded-full size-8 flex items-center justify-center mx-2" >&#10094;</button>
                    <button onClick={nextImage} className="text-[#505050] bg-[#ffdbd7] border border-[#b28878] rounded-full size-8 flex items-center justify-center mx-2" >&#10095;</button>
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;