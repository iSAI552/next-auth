'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function SignUpPage(){

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabeled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("signup success", response.data)
            router.push("/login")


        } catch (error:any) {
            console.log("Signup failed")
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div
        className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <h1>{loading ? "Processing": "Sign Up"}</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input value={user.username} placeholder="username" onChange={(e) => ({...user, username: e.target.value})} type="text"></input>
            <label htmlFor="email">email</label>
            <input value={user.email} placeholder="email" onChange={(e) => ({...user, email: e.target.value})} type="email"></input>
            <label htmlFor="password">password</label>
            <input value={user.password} placeholder="password" onChange={(e) => ({...user, password: e.target.value})} type="password"></input>
            <button
            onClick={onSignUp}
            >
                {buttonDisabeled ? "No Signup": "SignUp"}

            </button>
            <Link href={'/login'}>Visit Login Page</Link>
        </div>
    )
}