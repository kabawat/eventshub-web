"use client"
import Store from '@/store'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
const MainLayout = ({ children }) => {
    return (
        <Provider store={Store}>
            {children}
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </Provider>
    )
}

export default MainLayout
