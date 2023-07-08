import { useState } from "react";
import { Link } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';

export default function Header() {
    return (
        <div className="lg:w-1/12 w-full lg:h-screen lg:sticky top-0 bg-gradient-to-b from-slate-800 via-gray-900 to-slate-900 text-white">
            <header className="font-bold flex lg:flex-col justify-between items-center lg:h-[70vh] py-12">
                <Link
                    to={'/'}
                    className={`py-4 w-full text-center hover-link`}
                >
                    <p>Home</p>
                </Link>
                <div
                    className={`py-4 w-full text-center bg-black bg-opacity-40`}
                >
                    <div className="flex justify-center">
                        <p>Workouts</p>
                        <LockIcon />
                    </div>
                </div>
                <div
                    className={`py-4 w-full text-center bg-black bg-opacity-40`}
                >
                    <div className="flex justify-center">
                        <p>Meals</p>
                        <LockIcon />
                    </div>
                </div>
                <div
                    className={`py-4 w-full text-center bg-black bg-opacity-40`}
                >
                    <div className="flex justify-center">
                        <p>Videos</p>
                        <LockIcon />
                    </div>
                </div>
            </header>
        </div>
    )
}