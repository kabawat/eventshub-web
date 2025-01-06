"use client"
import React, { useEffect } from 'react'
import Header from '@/components/header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '@/store/slices/events';
import EventTable from '@/components/dashboard/table';
import { HiOutlinePlus } from "react-icons/hi";
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import { MdOutlineRefresh } from "react-icons/md";
const Page = () => {
    const events = useSelector((state) => state.events);
    const dispath = useDispatch()
    const getAllEvents = ({ page }) => {
        const payload = { page }
        dispath(fetchAllEvents(payload))
    }
    useEffect(() => {
        if (!events?.status && !events?.error && !events?.loading) {
            getAllEvents({ page: 1 })
        }
    }, [])
    return (
        <div className="main">
            <Header />
            <div className="dashboard_cvr">
                <Container>
                    <div className="d-flex justify-content-between align-items-center pt-3">
                        <div className="text-warning fw-bold heading">Events</div>
                        <div className="d-flex">
                            <Link href="/create-event" className="page" >
                                <HiOutlinePlus />
                                <span>Create Events</span>
                            </Link>
                            <button className='btn page' onClick={() => getAllEvents({ page: events?.currentPage })}>
                                <MdOutlineRefresh />
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>
                    <EventTable />
                </Container>
            </div>
        </div >
    )
}

export default Page