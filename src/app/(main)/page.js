"use client"
import React, { useEffect } from 'react'
import { MdOutlineEmojiEvents } from "react-icons/md";
import { Col, Row } from 'react-bootstrap';
import Header from '@/components/header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '@/store/slices/events';
import Link from 'next/link';
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
        <div className="menu_bar">
          <h1 className="text-warning py-5 text-center">Overview</h1>
          <Row className='justify-content-center'>
            <Col md={3} sm={6} xs={12}>
              <div className="overview_box">
                <div className="overview_logo">
                  <span>
                    <MdOutlineEmojiEvents />
                  </span>
                </div>
                <div className='ps-3 overview_detaile'>
                  <div className="overview_heading">Total Event</div>
                  <div className="overview_number"> {events?.totalEvents || 0}</div>
                </div>
              </div>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <div className="overview_box">
                <div className="overview_logo">
                  <span>
                    <MdOutlineEmojiEvents />
                  </span>
                </div>
                <div className='ps-3 overview_detaile'>
                  <div className="overview_heading">Active Events</div>
                  <div className="overview_number"> {events?.activeEvents || 0}</div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="d-flex py-5 mt-5">
            <Link href="/events" className="cta">
              <span>View Events</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <section></section>
    </div >
  )
}

export default Page