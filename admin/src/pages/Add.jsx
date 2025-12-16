import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { CircleAlert, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Men');
        setSubCategory('Topwear');
        setBestseller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className='w-20' />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className='w-20' />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className='w-20' />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className='w-20' />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <div className='flex items-start justify-start gap-1'>
          <p className='mb-2'>Product Name</p>
          <CircleAlert size={12} color='#b28878' />
        </div>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter the product name' required />
      </div>
      <div className='w-full'>
        <div className='flex items-start justify-start gap-1'>
          <p className='mb-2'>Product description</p>
          <CircleAlert size={12} color='#b28878' />
        </div>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write the product description' required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <div className='flex items-start justify-start gap-1'>
            <p className='mb-2'>Product category</p>
            <CircleAlert size={12} color='#b28878' />
          </div>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <div className='flex items-start justify-start gap-1'>
            <p className='mb-2'>Product subcategory</p>
            <CircleAlert size={12} color='#b28878' />
          </div>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <div className='flex items-start justify-start gap-1'>
            <p className='mb-2'>Product price</p>
            <CircleAlert size={12} color='#b28878' />
          </div>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full sm:w-32 px-3 py-2' type="Number" placeholder='Enter Price' />
        </div>
      </div>
      <div>
        <div className='flex items-start justify-start gap-1'>
          <p className='mb-2'>Product sizes</p>
          <CircleAlert size={12} color='#b28878' />
        </div>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? 'bg-[#ffdbd7]' : 'bg-slate-200'} size-12 justify-center flex items-center cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? 'bg-[#ffdbd7]' : 'bg-slate-200'} size-12 justify-center flex items-center cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? 'bg-[#ffdbd7]' : 'bg-slate-200'} size-12 justify-center flex items-center cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? 'bg-[#ffdbd7]' : 'bg-slate-200'} size-12 justify-center flex items-center cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? 'bg-[#ffdbd7]' : 'bg-slate-200'} size-12 justify-center flex items-center cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>
      <div className='w-full flex items-center md:justify-start'>
        {
          loading ?
            <div className='w-28 py-3 mt-4 bg-black text-white flex items-center justify-center'><LoaderCircle size={24} className='animate-spin' /></div> :
            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>Add</button>
        }
      </div> 
    </form>
  )
}

export default Add