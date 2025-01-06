import React, { useState } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { BiUser } from "react-icons/bi";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { useSelector } from 'react-redux';
import CreateModel from '../dashboard/createModel';
import { LuLogOut } from "react-icons/lu";
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
const Header = () => {
    const profile = useSelector(state => state.profile)
    const [showDropDown, setShowDropDown] = useState(false)
    const [show, setShow] = useState(false)
    const router = useRouter()
    const params = usePathname()
    const handleLogout = () => {
        Cookies.remove('x_a_t')
        router.replace('/login')
    }
    return (
        <nav>
            <div className="left">
                <div className="logo">
                    <span style={{ color: '#000' }}>Event</span>Hub
                </div>
                <div className="navigation">
                    <Link href={'/'} className={`page ${params == "/" && 'active'}`}>
                        <LuLayoutDashboard />
                        <span>Dashboard</span>
                    </Link>
                    <Link href={'/events'} className={`page ${params == "/events" && 'active'}`} >
                        <MdOutlineEmojiEvents />
                        <span>Events</span>
                    </Link>
                </div>
            </div>
            <div className="right position-relative">
                <div className="info">
                    <div className='username'>
                        {profile?.data?.fullname}
                    </div>
                    <div className="categ">
                        {profile?.data?.username}
                    </div>
                </div>
                <div className="user" onClick={() => setShowDropDown(!showDropDown)}>
                    <BiUser />
                </div>
                {
                    showDropDown ? <>
                        <div className="action_container" >
                            <div className="action_item toggle_btn" onClick={handleLogout}>
                                <span className="icon"><LuLogOut /></span>
                                <span className="text">Logout</span>
                            </div>
                        </div>
                    </> : <></>
                }
            </div>
            {
                show ? <CreateModel handleClose={setShow} /> : <></>
            }
        </nav >
    )
}

export default Header
