import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){
    let styles = {
        '&:hover': {
            background: "#efefef"
          }
    }
    return (
        <div className="w-1/12 h-screen sticky top-0 bg-gradient-to-b from-lime-400 to-green-700 text-white">
            <header className="font-bold flex flex-col justify-between items-center h-[70vh] py-12">
                <Link 
                    to={'/'}
                    className={`py-4 w-full text-center hover-link`}
                >
                    <p>Home</p>
                </Link>       
                <Link 
                    to={'/'}
                    className={`py-4 w-full text-center hover-link`}
                >
                    <p>Workouts</p>
                </Link> 
                <Link 
                    to={'/'}
                    className={`py-4 w-full text-center hover-link`}
                >
                    <p>Meals</p>
                </Link> 
                <Link 
                    to={'/'}
                    className={`py-4 w-full text-center hover-link`}
                >
                    <p>Videos</p>
                </Link>          
            </header>
        </div>
    )
}