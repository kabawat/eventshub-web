import { formatDateForDatetimeLocal } from '@/lib/helper/date'
import { createEventsService, updateEventsService } from '@/lib/services/admin'
import { fetchAllEvents } from '@/store/slices/events'
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CreateModel = ({ handleClose }) => {
    const formInit = {
        description: '',
        location: '',
        title: '',
        date: '',
        isActive: true,
    }
    const events = useSelector(state => state.events)
    const [formData, setFormData] = useState(formInit)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const handleChange = ({ target }) => {
        const { name, value, checked } = target
        if (name == "isActive") {
            setFormData(
                { ...formData, [name]: checked }
            )
        } else {
            setFormData(
                { ...formData, [name]: value }
            )
        }
    }
    const handleSubmit = async () => {
        try {
            setLoader(true)
            const payload = {
                description: formData?.description,
                location: formData?.location,
                title: formData?.title,
                date: formData?.date,
                isActive: formData?.isActive,
            }
            const res = await createEventsService(payload)
            toast(res?.message)
            dispatch(fetchAllEvents({ page: events.currentPage }))
            setTimeout(() => {
                handleClose(false)
            }, 1000)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoader(false)
        }
    }
    return (
        <Modal show={true} centered animation={true} size='lg' >
            <Modal.Header className='d-flex justify-content-between align-items-center'>
                <Modal.Title className='text-warning'>Create Event</Modal.Title>
                <div className="d-flex">
                    <label className="form-check-label" htmlFor="isActive">Status : </label>
                    <div className="form-check form-switch ms-3">
                        <input className="form-check-input" type="checkbox" role="switch" name="isActive" onChange={handleChange} value={formData?.isActive} checked={formData?.isActive} />
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form action="#" className="form">
                    <Row>
                        <Col>
                            <div className="form-group">
                                <label className='mb-1' htmlFor="title">Title</label>
                                <input type="text" name='title' onChange={handleChange} value={formData?.title} className="form-control py-2" id="title" placeholder="title" />
                            </div>
                        </Col>
                        <Col>
                            <label className='mb-1' htmlFor="date">Date & Time</label>
                            <input aria-label="Date and time" name='date' onChange={handleChange} value={formatDateForDatetimeLocal(formData.date)} id='date' className='form-control py-2' type="datetime-local" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group mt-4">
                                <label className='mb-1' htmlFor="location">Location</label>
                                <input type="text" name='location' onChange={handleChange} value={formData?.location} className="form-control py-2" id="location" placeholder="location" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group mt-4">
                                <label className='mb-1' htmlFor="description">Description</label>
                                <textarea type="text" name='description' rows={6} onChange={handleChange} value={formData?.description} className="form-control py-2" id="description" placeholder="description" ></textarea>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" disabled={loader} onClick={() => handleClose(false)}>
                    Close
                </Button>
                {
                    loader ? <>
                        <Button variant="warning" className='text-light' disabled>
                            Save <span className="spinner-border spinner-border-sm  ms-2 text-light" role="status"></span>
                        </Button>
                    </> : <>
                        <Button variant="warning" className='text-light' onClick={handleSubmit}>
                            Save
                        </Button>
                    </>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default CreateModel
