// "use client"
import React, { useEffect, useState } from 'react'
import Header from '@/components/header';
import { BiEdit } from "react-icons/bi";
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import { FetchEventService } from '@/lib/services/admin';
import moment from 'moment';
import EditModel from '@/components/dashboard/editModel';
const EventPage = ({ id }) => {
    const [eventData, setEventData] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [users, setUsers] = useState([])
    const getAllEvents = async () => {
        try {
            console.log(id)
            const res = await FetchEventService({ id })
            setEventData(res.event)
            setUsers(res.users)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllEvents()
    }, [isEdit])
    return (
        <div className="main">
            <Header />
            <div className="dashboard_cvr">
                <Container>
                    <div className="d-flex justify-content-between align-items-center pt-3">
                        <div className="text-warning fw-bold heading">Events</div>
                        <div className="page" onClick={() => setIsEdit(!isEdit)} >
                            <BiEdit />
                            <span>Edit Events</span>
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="event-container">
                        <h1 className="event-title">{eventData?.title}</h1>
                        <div className="event-details">
                            <div className="event-detail">
                                <strong>Location:</strong> {eventData?.location}
                            </div>
                            <div className="event-detail">
                                <strong>Date:</strong> {moment(eventData?.date).format('DD MMMM YYYY')}
                            </div>
                            <div className="event-detail">
                                <strong>Time:</strong> {moment(eventData?.date).format('hh:mm A')}
                            </div>
                            <div className="event-detail">
                                <strong>Total Attended Users:</strong> {eventData?.totalAttendance}
                            </div>
                            <div className="event-detail">
                                <strong>Description:</strong> {eventData?.description}
                            </div>
                        </div>
                    </div>
                    <div className='event-container'>
                        <h2 className="">Attended Users</h2>
                        <Row>
                            {
                                users?.map((user, index) => (
                                    <Col key={index} sm={6} xs={12}>
                                        <div className="card p-3">
                                            <div className="event-detail"><strong>Name : </strong> {user.fullname}</div>
                                            <div className="event-detail"><strong>Email : </strong> {user.email}</div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                    {isEdit ? <EditModel handleClose={setIsEdit} data={eventData} /> : <> </>}
                </Container>

            </div>
        </div >
    )
}

export default EventPage