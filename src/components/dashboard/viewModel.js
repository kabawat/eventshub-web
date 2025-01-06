import moment from 'moment'
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

const ViewModel = ({ data, handleClose }) => {
    const [formData, setFormData] = useState(data)
    return (
        <Modal show={true} centered animation={true} size='lg' >
            <Modal.Header className='d-flex justify-content-between'>
                <Modal.Title className='text-warning'>Event Details</Modal.Title>
                {
                    !formData?.isActive ? <>
                        <div className='rounded bg-success text-light px-4 py-1'>Activate Event</div>
                    </> : <>
                        <div className='rounded bg-danger text-light px-4 py-1'>Deactivate Event</div>
                    </>
                }

            </Modal.Header>
            <Modal.Body>
                <form action="#" className="">
                    <Row className='align-items-start'>
                        <Col>
                            <div className="card p-3">
                                <div className='fw-bold text-warning'>Title</div>
                                <p>
                                    {formData?.title}
                                </p>
                            </div>
                        </Col>
                        <Col>
                            <div className="card p-3">
                                <div className='fw-bold text-warning'>Location</div>
                                <p>
                                    {formData?.location}
                                </p>
                            </div>
                        </Col>

                    </Row>
                    <Row className='mt-2'>
                        <Col>
                            <div className="card p-3">
                                <div className="d-flex justify-content-between">
                                    <div className="">
                                        <div className='fw-bold text-warning'>Date</div>
                                        <p>
                                            {moment(formData?.date).format('DD MMMM YYYY')}
                                        </p>
                                    </div>
                                    <div className="">
                                        <div className='fw-bold text-warning'>Time</div>
                                        <p>
                                            {moment(formData?.date).format('hh:mm A')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="card p-3">
                                <div className='fw-bold text-warning'>Total Attended User</div>
                                <p>
                                    {formData?.totalAttendance}
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <div className="card p-3">
                                <div className='fw-bold text-warning'>Description</div>
                                <p>
                                    {formData?.description}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewModel
