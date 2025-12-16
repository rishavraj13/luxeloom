import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const NewsLetterBox = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendUrl } = useContext(ShopContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(backendUrl + '/api/subscriber/add', { email })
            if (response.data.success) {
                toast.success("Subscribed Successfully")
                setEmail("")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className="text-gray-400 mt-3">Stay updated with exclusive offers and the latest trends—subscribe now!</p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full sm:flex-1 outline-none' required type="email" placeholder='Enter you email' />
                {
                    !loading ?
                    <button type='submit' className='uppercase bg-black text-white text-xs h-10 w-36 flex items-center justify-center'>Subscribe</button> :
                    <button type='submit' className='uppercase bg-black text-white text-xs h-10 w-36 flex items-center justify-center'><Loader2 className='animate-spin'/></button>
                }
            </form>
        </div>
    )
}

export default NewsLetterBox