import React, { useState, useRef, useContext } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Loader2, Send } from 'lucide-react' // Import the loader icon from Lucide
import { ShopContext } from '../context/ShopContext'

const items = [
  {
    title: "Full Name",
    placeholder: "Enter your Name",
    type: "text",
    name: "name",
  },
  {
    title: "Email",
    placeholder: "Enter your Email",
    type: "email",
    name: "email",
  },
  {
    title: "Phone",
    placeholder: "Enter your Phone",
    type: "text",
    name: "phone",
  },
]

const Contact = () => {

  const [loading, setLoading] = useState(false); // State to track loading
  const textareaRef = useRef(null);
  const { backendUrl } = useContext(ShopContext);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = 24;
      const maxHeight = lineHeight * 5;
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      text: formData.get('message')
    };

    try {
      setLoading(true);
      const res = await axios.post(backendUrl + '/api/message/send', data); // Your API endpoint
      if (res.data.success) {
        toast.success('Message Sent Successfully!');
        e.target.reset();
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      } else {
        toast.error('Something went wrong, please try again!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error, please try later!');
    } finally {
      setLoading(false); // Set loading to false when the process is done
    }
  }

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'contact'} text2={'us'} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='my-5 flex flex-col justify-center md:flex-row-reverse gap-10'>
          <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px] hidden md:block aspect-square' />
          <div className='flex flex-col justify-center items-start gap-2 w-full md:max-w-[330px] max-h-full'>
            {
              items.map((item, index) => (
                <div key={index} className='flex flex-col gap-1 w-full'>
                  <label htmlFor={item.name} className='text-gray-600 font-semibold'>{item.title}</label>
                  <input
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    required
                    className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none text-gray-500 placeholder:text-gray-500/50'
                  />
                </div>
              ))
            }
            <div className='flex flex-col gap-1 w-full'>
              <label htmlFor="message" className='text-gray-600 font-semibold'>Message</label>
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                name="message"
                placeholder="Enter your Message"
                required
                className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none text-gray-500 placeholder:text-gray-500/50'
              />
            </div>
            <button
              type="submit"
              className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-xl mt-2 flex items-center justify-center w-3/5'
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <div className='text-base flex items-center justify-center gap-1'>Send Message <Send className="w-5 h-5" /></div>}
              {/* {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />} */}
            </button>
          </div>
        </div>
      </form>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1838.447264306359!2d-122.33656175964468!3d47.60144800548134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906aafef6e51f5%3A0x428f3fa965fbc2af!2sAlaskan%20Way%20%26%20Columbia%20St!5e0!3m2!1sen!2sus!4v1745789401996!5m2!1sen!2sus"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full md:max-w-[480px] aspect-square"
        ></iframe>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Alaskan Way & Columbia St <br />Seattle, WA 98104, Washington, USA</p>
          <p className='text-gray-500'>Tel: +91 9876543210 <br /> Email: info@luxeloom.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Luxeloom</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-xl'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact
