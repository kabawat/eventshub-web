"use client"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { get_profile } from "@/store/slices/profile"
export default function RootLayout({ children }) {
    const profile = useSelector((state) => state.profile);

    const dispatch = useDispatch()
    useEffect(() => {
        if (!profile?.status && !profile?.error && !profile?.loading) {
            dispatch(get_profile());
        }
    }, [profile]);

    return (
        <div className={"main"}>
            {children}
        </ div>
    );
}
