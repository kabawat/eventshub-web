"use client"
import React from 'react'
import EventPage from '@/page/event';
import { useParams } from 'next/navigation';
const Page = () => {
    const params = useParams()
    return <EventPage id={params?.id} />
}

export default Page