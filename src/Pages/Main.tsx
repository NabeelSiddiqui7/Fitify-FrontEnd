import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import CalorieTracker from "../Components/CalorieTracker";
import WeeklySummary from "../Components/WeeklySummary";
import DailyChecklist from "../Components/DailyChecklist";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WeightTracker from "../Components/WeightTracker";
import { Link } from "react-router-dom";
import { Transition } from '@headlessui/react'
import MuscleGroups from "../Components/MuscleGroups";
import axios from "axios";
import ToggleIcon from "material-ui-toggle-icon";
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@material-ui/core/IconButton";



export default function Main() {
    const [username, setUserName] = useState('');
    const [weight, setWeight] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [results, setResults] = useState<any[]>(["empty"]);
    const [weightAdded, setWeightAdded] = useState(false);
    const [dailyActivities, setDailyActivities] = useState([]);

    const getResult = async () => {
        const url = `${process.env.REACT_APP_API_BASE_URL}`;
        const res = await axios.get(url);
        const data = res.data;
        setResults(data);
        setUserName(data.UserData[0].username);
        setWeight(data.WeightData);
        setDailyActivities(data.DailyActivities);
    }
    
    useEffect(()=>{
        if(results[0] == "empty"){
            getResult();
        }
    });

    let iconStyles = {
        fontSize: '1rem',
        margin: 'auto'
      };
      
  return (
    <div className="flex h-fit">
        <Header/>
        <div className="bg-slate-100 h-fit grow">
            <div className="py-6 px-20 flex">
                <h1 className="font-bold text-4xl">Hello {username}!</h1>
            </div>
           <DailyChecklist activities={dailyActivities} refresh={getResult}/>
            <div className="flex-col h-[60vh] py-6 px-20">
                <div className="flex h-full justify-between">
                    <div className="w-1/3 flex flex-col text-center bg-white justify-between items-center m-2 rounded-2xl drop-shadow-lg">
                        <h1 className="font-bold px-4 py-2">1000 Calories Taken In</h1>
                        <CalorieTracker/>
                        <div className="w-full px-20 flex justify-between py-2">
                            <div className="w-1/3 flex items-center">
                                <h3 className="mx-1">protein</h3>
                                <div className="h-[2vh] w-[2vh] bg-red-600"></div>
                            </div>
                            <div className="w-1/3 flex items-center">
                                <h3 className="mx-1">carbs</h3>
                                <div className="h-[2vh] w-[2vh] bg-black"></div>
                            </div>
                            <div className="w-1/3 flex items-center">
                                <h3 className="mx-1">fat</h3>
                                <div className="h-[2vh] w-[2vh] bg-black"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex grow flex-col text-center bg-white justify-between items-center m-2 rounded-2xl drop-shadow-lg">
                        <h1 className="font-bold p-4">Weekly Summary</h1>
                        <WeeklySummary/>
                    </div>
                </div>
            </div>   
            <div className="flex-col h-[60vh] py-6 px-20">
                <div className="flex h-full justify-between">
                    <div className="w-3/5 flex flex-col text-center bg-white justify-between items-center m-2 rounded-2xl drop-shadow-lg">
                        <div className="flex items-center">
                            <h1 className="font-bold p-4">Weight Tracking</h1>
                            <IconButton onClick={()=>setWeightAdded(!weightAdded)}>
                                <ToggleIcon
                                    on={weightAdded}
                                    onIcon={<AddCircleOutlineIcon style={iconStyles}/>}
                                    offIcon={<CheckIcon style={iconStyles}/>}
                                />                                
                            </IconButton>
                        </div>
                        <WeightTracker data={weight}/>
                    </div>
                    <div className="flex grow flex-col text-center bg-white justify-between items-center m-2 rounded-2xl drop-shadow-lg">
                        <h1 className="font-bold pt-4">Muscle Groups Hit This Week</h1>
                            <MuscleGroups/>
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
        <div className='fixed bottom-0 flex flex-col mx-12 my-8 right-0 justify-center items-center'>
            <button onClick={()=> setOpenAdd(!openAdd)} className='bg-green-500 text-white rounded-full w-16 h-16 drop-shadow-xl'>
                <AddCircleOutlineIcon/>
            </button>
        </div>
    </div>
  );
}
