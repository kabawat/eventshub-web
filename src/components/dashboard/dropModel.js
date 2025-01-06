import { dropEventsService } from '@/lib/services/admin'
import { fetchAllEvents } from '@/store/slices/events'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DropModel = ({ data, handleClose }) => {
    const events = useSelector(state => state.events)
    const [formData, setFormData] = useState(data)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()

    const handleUpdate = async () => {
        try {
            setLoader(true)
            const res = await dropEventsService(formData?._id)
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
            <Modal.Body>
                <h2 className='text-center'>Are you sure?</h2>
                <p className='text-center'>Do you really want to delete this event? This process cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center' >
                <Button variant="secondary" disabled={loader} onClick={() => handleClose(false)}>
                    Cancel
                </Button>
                {
                    loader ? <>
                        <Button variant="danger" className='text-light' disabled>
                            Yes, Delete <span className="spinner-border spinner-border-sm  ms-2 text-light" role="status"></span>
                        </Button>
                    </> : <>
                        <Button variant="danger" className='text-light' onClick={handleUpdate}>
                            Yes, Delete
                        </Button>
                    </>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default DropModel
