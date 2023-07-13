import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import CalorieTracker from "../Components/CalorieTracker";
import WeeklySummary from "../Components/WeeklySummary";
import DailyChecklist from "../Components/DailyChecklist";
import WeightTracker from "../Components/WeightTracker";
import { Link } from "react-router-dom";
import { Transition } from '@headlessui/react'
import MuscleGroups from "../Components/MuscleGroups";
import axios from "axios";
import { UserContext } from "../App";



export default function Main(props: any) {
    const [userData, setUserData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser] = useState({});
    const [weight, setWeight] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [results, setResults] = useState<any[]>(["empty"]);
    const [dailyActivities, setDailyActivities] = useState([]);
    const [weeklySummary, setWeeklySummary] = useState([]);
    const [dailyFood, setDailyFood] = useState([]);
    const [dailyNutrition, setdailyNutrition] = useState([] as any[]);
    const [dailyWorkout, setDailyWorkout] = useState([] as any[]);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const getResult = async () => {
        const url = `${process.env.REACT_APP_API_BASE_URL}`;
        const res = await axios.get(url, {
            params: {
                id: user.id
            }
        });
        const data = res.data;
        setResults(data);
        setWeight(data.WeightData);
        setDailyActivities(data.DailyActivities);
        setWeeklySummary(data.WeeklySummary);
        setDailyWorkout(data.DailyWorkout);
        setDailyFood(data.DailyFood);

        let normal_data = [
            { amt: 0, nutrition: "Protein" },
            { amt: 0, nutrition: "Carbs" },
            { amt: 0, nutrition: "Fat" },

        ];
        data.DailyFood.forEach((food: any) => {
            normal_data[0].amt += food.protein_g;
            normal_data[1].amt += food.carbs_g;
            normal_data[2].amt += food.fat_g;
        })
        setdailyNutrition(normal_data);
    }

    useEffect(() => {
        const checkRefreshToken = async () => {
            const url = `${process.env.REACT_APP_API_BASE_URL}/refresh_token`;
            const res = await axios.post(url, null, {
                withCredentials: true,
                params:
                {
                    cookies: '123'
                }
            }).then((res) => {
                const data = res.data;
                const newUser = { accesstoken: data.accesstoken, id: data.id, email: data.email, username: data.username };
                setUser(newUser);
                if (!data.accesstoken) {
                    navigate("/login")
                }
            });
        };
        checkRefreshToken();
    }, []);

    useEffect(() => {
        getResult().then(() => {
            setIsLoading(false);
        });
    }, [user])

    if (isLoading) {
        return (
            <div className="h-screen max-w-screen">
                <div className="flex bg-slate-800 h-full grow text-white">
                    <h2 className="m-auto">Loading</h2>
                </div>
            </div>
        )
    }
    return (
        <div className="lg:flex h-fit max-w-screen">
            <Header />
            <div className="bg-slate-800 h-fit grow text-white">
                <div className="py-6 px-20 flex justify-between">
                    <h1 className="font-bold text-4xl">Hello {user.username}!</h1>
                    <div>
                        <Link to={'/login'}>
                            <button className="bg-transparent hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                                onClick={() => props.logoutCallback()}>Logout</button>
                        </Link>
                    </div>
                </div>
                <DailyChecklist activities={dailyActivities} refresh={getResult} />
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full min-h-[52vh] py-2 px-20">
                        <div className="flex h-full w-full lg:flex-nowrap flex-wrap justify-between gap-4">
                            <div className="w-1/3 flex flex-col w-full text-center bg-slate-900 items-center my-2 rounded-2xl drop-shadow-lg">
                                <CalorieTracker nutrition={dailyNutrition} food={dailyFood} refresh={getResult} />
                                <div className="w-2/3 px-20 flex py-2 my-auto justify-between align-center">
                                    <div className="flex items-center text-center">
                                        <h3 className="mx-1">protein</h3>
                                        <div className="h-[2vh] w-[2vh] bg-red-400 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <h3 className="mx-1">carbs</h3>
                                        <div className="h-[2vh] w-[2vh] bg-orange-600 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <h3 className="mx-1">fat</h3>
                                        <div className="h-[2vh] w-[2vh] bg-yellow-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grow flex-col h-[52vh] w-full text-center bg-slate-900 items-center my-2 rounded-2xl drop-shadow-lg">
                                <WeeklySummary data={weeklySummary} refresh={getResult} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-col h-full w-full py-2 px-20">
                        <div className="flex h-full w-full lg:flex-nowrap flex-wrap justify-between gap-4">
                            <div className="lg:w-3/5 w-full h-[52vh] flex flex-col text-center bg-slate-900 items-center my-2 rounded-2xl drop-shadow-lg">
                                <WeightTracker data={weight} refresh={getResult} />
                            </div>
                            <div className="flex grow flex-col text-center bg-slate-900 justify-between items-center my-2 rounded-2xl drop-shadow-lg">
                                <MuscleGroups data={dailyWorkout} refresh={getResult} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed bottom-16 flex flex-col mx-12 my-8 right-16 justify-center items-center'>
                <Transition
                    show={openAdd}
                    enter="transform transition duration-200"
                    enterFrom="opacity-0 rotate-[120deg] scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 rotate-[120deg] scale-0 "
                >
                    {
                        <div className="bg-slate-500 p-6 text-white font-bold rounded-lg transition-all ease-in-out duration-300">
                            <ul className="p-2">
                                <Link to={"/"}>
                                    <li>Meal</li>
                                </Link>
                            </ul>
                            <ul className="p-2">
                                <Link to={"/"}>
                                    <li>Workout</li>
                                </Link>
                            </ul>
                            <ul className="p-2">
                                <   Link to={"/"}>
                                    <li>Run</li>
                                </Link>
                            </ul>
                        </div>
                    }
                </Transition>
            </div>
            {/* <div className='fixed bottom-0 flex flex-col mx-12 my-8 right-0 justify-center items-center'>
            <button onClick={()=> setOpenAdd(!openAdd)} className='bg-black text-white rounded-full w-16 h-16 drop-shadow-xl'>
                <AddCircleOutlineIcon/>
            </button>
        </div> */}
        </div>
    );
}
