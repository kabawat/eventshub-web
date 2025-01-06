"use client"
import React, { useEffect } from 'react'
import Header from '@/components/header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '@/store/slices/events';
import { HiOutlinePlus } from "react-icons/hi";
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import CreateEvent from '@/components/events/createEvent';
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

    // -------------

    return (
        <div className="main">
            <Header />
            <div className="dashboard_cvr">
                <Container>
                    <div className="d-flex justify-content-center align-items-center pt-3">
                        <div className="text-warning fw-bold heading py-4">Create a new Events</div>
                        {/* <Link href="/events" className="page" >
                            <HiOutlinePlus />
                            <span>All Events</span>
                        </Link> */}
                    </div>
                    <>
                        <CreateEvent />
                    </>
                </Container>
            </div>
            <section></section>
        </div >
    )
}

export default Page