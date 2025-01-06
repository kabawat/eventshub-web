
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoArrowRedoOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import EditModel from './editModel';
import DropModel from './dropModel';
import ViewModel from './viewModel';
import Pagination from '../common/pagination';
import Link from 'next/link';

const EventTable = () => {
    const events = useSelector((state) => state.events);
    const [currentEvent, setCurrentEvent] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isDrop, setIsDrop] = useState(false)
    const [isView, setIsView] = useState(false)
    const [mouse, setMouse] = useState({
        x: 0,
        y: 0
    })
    const handleCurrentEvent = (data) => (e) => {
        setMouse({
            x: e.pageX - 120,
            y: e.pageY,
        })
        setTimeout(() => {
            setCurrentEvent(data)
        }, 100)
    }
    useEffect(() => {
        if (window) {
            window.addEventListener('click', (event) => {
                setCurrentEvent(null)
            })
        }
    })
    return (
        <>
            <div className="table-container mt-4">
                <div className="table-wrapper">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Event date</th>
                                <th scope="col">Location</th>
                                <th scope="col">user</th>
                                <th scope="col">status</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody className="tbl_body">
                            {
                                events?.data?.map((event, indx) => {
                                    return (
                                        <tr key={indx}>
                                            <th scope="row">
                                                <div className="section">
                                                    {(Number(events?.currentPage - 1) * 10) + indx + 1}
                                                </div>
                                            </th>
                                            <td style={{ maxWidth: '150px' }}>{event?.title}</td>
                                            <td style={{ maxWidth: '200px' }}>{event?.description}</td>
                                            <td>
                                                <div> {moment(event?.date).format('DD MMMM YYYY')}</div>
                                                <div>{moment(event?.date).format('hh:mm A')}</div>
                                            </td>
                                            <td>{event?.location} </td>
                                            <td>{event?.totalAttendance} </td>
                                            <td>{event?.isActive ? <span className="status active">Active</span> : <span className='status'>Deactivate</span>} </td>
                                            <td>
                                                <div className="option_box toggle_btn" >
                                                    <button onClick={handleCurrentEvent(event)} className='toggle_btn'>
                                                        <HiOutlineDotsVertical />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className='table_footer'>
                    <Pagination totalPages={50} />
                </div>
            </div>
            {
                currentEvent ? <div className="option_container" style={{ top: `${mouse.y}px`, left: `${mouse.x}px` }}>
                    <Link href={`/events/${currentEvent?._id}`} className="action_item toggle_btn">
                        <span className="icon"><IoArrowRedoOutline /></span>
                        <span className="text">View</span>
                    </Link>
                    <div className="action_item toggle_btn" onClick={() => setIsEdit(true)}>
                        <span className="icon"><FiEdit /></span>
                        <span className="text">Edit</span>
                    </div>
                    <div className="action_item toggle_btn" onClick={() => setIsDrop(true)}>
                        <span className="icon"><AiOutlineDelete /></span>
                        <span className="text">Delete</span>
                    </div>
                </div> : <></>
            }

            {/* models  */}
            {isEdit ? <EditModel handleClose={setIsEdit} data={currentEvent} /> : <> </>}
            {isDrop ? <DropModel handleClose={setIsDrop} data={currentEvent} /> : <> </>}
            {/* {isView ? <ViewModel handleClose={setIsView} data={currentEvent} /> : <> </>} */}

        </>
    )
}

export default EventTable
