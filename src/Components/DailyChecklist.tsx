import CheckIcon from '@mui/icons-material/Check';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { useState, Fragment } from 'react';

export default function DailyChecklist(props:any){
    const [isOpen, setIsOpen] = useState(false);
    const [activityName, setActivityName] = useState("");
    var completedCount = props.activities.reduce(function(count:any, activity:any) {
        return count + (activity.completed === true);
    }, 0);

    console.log(props.activities);

    const addTask = async () => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/activities`;
        await axios.get(url, {params: {description: activityName}});
        props.refresh();
    }

    const updateTask = async (description: any, completed:any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/activities/update`;
        await axios.get(url, {params: {description: description, completed:completed.toString()}});
        props.refresh();
    }

    const deleteTask = async (description: any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/activities/delete`;
        await axios.get(url, {params: {description: description}});
        props.refresh();
    }
    
    return (
        <div className="py-6 pl-20 pr-5">
            <h3 className="font-bold text-2xl">Today's Activities ({completedCount}/{props.activities.length})</h3>
            <div className='flex items-center'>
                <div className="flex h-[16vh] my-4 gap-2 mr-5">
                    {props.activities.sort((a:any,b:any) => a.activity_id - b.activity_id).map((activity:any) => {
                        return (
                            <button 
                                onClick={()=>{
                                    updateTask(activity.description, Boolean(!activity.completed));
                                }}
                                className="flex flex-col h-full text-center w-[20vh] bg-white px-1 py-2 rounded-lg drop-shadow-lg items-center"
                            >
                                <div className='flex justify-between w-full px-1'>
                                    <button onClick={(e)=>{
                                        e.stopPropagation();
                                        deleteTask(activity.description);
                                    }}>
                                        <DeleteIcon className='text-red-600' sx={{fontSize: '1rem'}}></DeleteIcon>
                                    </button>
                                    <div className={`w-5 h-5 text-base self-end ${activity.completed? 'bg-green-400' : 'bg-red-400'} rounded-full flex justify-between items-center`}>
                                        {activity.completed && <CheckIcon sx={{fontSize:'1rem', margin:'auto'}}/>}
                                    </div>
                                </div>
                                <h2 className='mx-auto mt-4 font-semibold'>{activity.description}</h2>
                            </button>
                        )
                    })}
                </div>
                <button className='text-gray-500' onClick={()=>setIsOpen(true)}>
                    <AddCircleOutlineIcon sx={{fontSize:'2rem', margin:'auto'}}/>
                </button>
            </div>
            <Transition
                show={isOpen}
                as={Fragment}
            >
                <Dialog onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-75"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className='fixed inset-0 bg-white w-[50vh] h-[50vh] m-auto p-2 text-center rounded-xl drop-shadow-xl'>
                            <Dialog.Panel className='h-full flex p-4'>
                                <div className='flex flex-col grow'>
                                    <Dialog.Title className='font-bold'>New Activity</Dialog.Title>
                                    <form className='flex flex-col'>
                                        <label>
                                            Activity Name:
                                        </label>
                                        <input 
                                            type="text" 
                                            name="activity-name" 
                                            className='m-4 border-2 border-slate-600 rounded-md' 
                                            onChange={(e)=>setActivityName(e.target.value)}
                                        />
                                    </form>

                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                        <button 
                                            onClick={() => setIsOpen(false)}
                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                        >Cancel</button>
                                        <button 
                                            onClick={() => {
                                                addTask();
                                                setIsOpen(false);
                                            }}
                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                        >Add</button>                            
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    )
}