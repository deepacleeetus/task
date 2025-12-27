import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from "react-router-dom"; 
const Adminsidebar = () => {
     const navigate = useNavigate();
    return(
        <div className="bg-gray-800 text-white fixed w-64 h-full px-4 py-2">
            <div className='my-2 mb-4'>
                <h1 className='text-2xl text-white font-bold'>Admin Dashboard</h1>
                <hr/>
                <ul>
              
                    <li className="mb-2">
                        <a href="/manage-foods" className="hover:underline">Manage Foods</a>
                    </li>
                    <li className="mb-2">
                        <a href="/view-orders" className="hover:underline">View Orders</a>
                    </li>
                    <li className="mb-2">
                        <a href="/offers" className="hover:underline">Manage Offers</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Adminsidebar;