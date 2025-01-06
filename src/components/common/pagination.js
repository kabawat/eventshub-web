import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '@/store/slices/events';
const PaginationExample = () => {
    const events = useSelector(state => state.events);
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

    const handlePageClick = (selectedPage) => {
        console.log("selectedPage : ", selectedPage?.selected)
        dispatch(fetchAllEvents({ page: selectedPage.selected + 1 }))
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="pagination-container">
            <ReactPaginate
                previousLabel={<><FaArrowLeftLong /></>}
                nextLabel={<><FaArrowRightLong /></>}
                pageCount={events?.totalPages}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
            />
        </div>
    );
};

export default PaginationExample;
