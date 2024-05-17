'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("")

    const getUserDetails = async () => {
        try {
            const res = await axios.post('/api/users/me')
            setData(res.data.data._id)
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getUserDetails()
    })

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logour success")
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <div>
            <h1>Profile page</h1>
            <hr />
            <h2>{data === "" ? "nothing": <Link href={`/profile/${data}`}>{}data</Link>}</h2>
            <hr />
            <button onClick={logout}>Logout</button>
        </div>
    )
}