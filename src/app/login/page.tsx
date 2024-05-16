'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function LoginPage(){

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabeled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("login success", response.data)
            router.push("/profile")


        } catch (error:any) {
            console.log("login failed")
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div
        className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <h1>{loading ? "Processing": "Login"}</h1>
            <hr/>
            <input value={user.email} placeholder="email" onChange={(e) => ({...user, email: e.target.value})} type="email"></input>
            <label htmlFor="password">password</label>
            <input value={user.password} placeholder="password" onChange={(e) => ({...user, password: e.target.value})} type="password"></input>
            <button
            onClick={onLogin}
            >
                {buttonDisabeled ? "No Login": "Login"}

            </button>
            <Link href={'/signup'}>Visit Signup Page</Link>
        </div>
    )
}