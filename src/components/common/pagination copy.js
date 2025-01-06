




// import { FaArrowLeftLong } from "react-icons/fa6";
// import React, { useState } from 'react';

// const Pagination = ({ totalPages }) => {
//     const [currentPage, setCurrentPage] = useState(1);

//     const handlePageClick = (page) => {
//         setCurrentPage(page);
//     };

//     const handlePreviousClick = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNextClick = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const renderPages = () => {
//         const pages = [];
//         for (let i = 1; i <= totalPages; i++) {
//             pages.push(
//                 <PageItem
//                     key={i}
//                     page={i}
//                     isActive={i === currentPage}
//                     onClick={() => handlePageClick(i)}
//                 />
//             );
//         }
//         return pages;
//     };

//     return (
//         <div className="pagination">
//             <PaginationLink
//                 direction="previous"
//                 onClick={handlePreviousClick}
//                 disabled={currentPage === 1}
//             >
//                 Previous
//             </PaginationLink>
//             <PageList>
//                 {renderPages()}
//             </PageList>
//             <PaginationLink
//                 direction="next"
//                 onClick={handleNextClick}
//                 disabled={currentPage === totalPages}
//             >
//                 Next
//             </PaginationLink>
//         </div>
//     );
// };

// const PaginationLink = ({ direction, onClick, disabled, children }) => (
//     <a
//         href="#"
//         className={`${direction} ${disabled ? 'disabled' : ''}`}
//         onClick={(e) => {
//             e.preventDefault();
//             if (!disabled) onClick();
//         }}
//     >
//         {direction === 'previous' && (<FaArrowLeftLong />)}
//         {children}
//         {direction === 'next' && (<FaArrowLeftLong />)}
//     </a>
// );

// const PageList = ({ children }) => (
//     <ul className="pages">{children}</ul>
// );

// const PageItem = ({ page, isActive, onClick }) => (
//     <li className="tabe">
//         <a
//             href="#"
//             className={isActive ? 'current' : ''}
//             aria-current={isActive ? 'page' : undefined}
//             onClick={(e) => {
//                 e.preventDefault();
//                 onClick();
//             }}
//         >
//             {page}
//         </a>
//     </li>
// );

// export default Pagination;
