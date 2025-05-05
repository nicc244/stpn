'use client'
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isClick, setIsClick] = useState(false)

    return (
    <div className="w-full bg-[#068D9D] text-white font-bold text-md">

        <div className="flex gap-4 mx-auto w-max py-3">

            <div className="">
                <a href="https://www.gpjp.cz">
                    GPJP
                </a>
                
            </div>
            <Link href='/prostudenty'>
                <div className="hover:text-amber-500">
                    Pro studenty
                </div>
            </Link>
            

            <Link href='/register'>
                <div className="hover:text-green-400">
                    Pro uchazece
                </div>
            </Link>
            <Link href='/login'>
                <div className={`hover:text-green-400 ${isClick ? 'text-blue-500' : 'text-amber-500'}`} onClick={() => {setIsClick(!isClick)}}>
                    Login
                </div>
            </Link>

        </div>
        </div>
    )
}