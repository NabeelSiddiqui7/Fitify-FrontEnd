import CheckIcon from '@mui/icons-material/Check';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { useState, Fragment } from 'react';

export default function DailyChecklist(props: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [activityName, setActivityName] = useState("");
    const [activityCategory, setActivityCategory] = useState("Workout");
    const [activityDescription, setActivityDescription] = useState("");
    var completedCount = props.activities.reduce(function (count: any, activity: any) {
        return count + (activity.completed === true);
    }, 0);

    const categoryColours = function (category: any, background: boolean) {
        switch (category) {
            case 'Workout':
                return background ? 'bg-indigo-100' : 'text-indigo-600';
            case 'Cardio':
                return background ? 'bg-pink-100' : 'text-orange-600';
            case 'Yoga':
                return background ? 'bg-green-100' : 'text-green-600';
            case 'Meditation':
                return background ? 'bg-sky-100' : 'text-sky-600';
        }
    }

    const addTask = async () => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/activities`;
        await axios.get(url, { params: { name: activityName, category: activityCategory, description: activityDescription } });
        props.refresh();
    }

    const updateTask = async (name: any, completed: any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/activities/update`;
        await axios.get(url, { params: { name: name, completed: completed.toString() } });
        props.refresh();
    }

    const deleteTask = async (id: any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/activities/delete`;
        await axios.get(url, { params: { activity_id: id } });
        props.refresh();
    }

    return (
        <div className="py-6 pl-20 pr-5">
            <h3 className="font-bold text-2xl">Today's Activities ({completedCount}/{props.activities.length})</h3>
            <div className='flex items-center overflow-x-auto'>
                <div className="flex h-[16vh] my-4 gap-2 mr-5">
                    {props.activities.sort((a: any, b: any) => a.activity_id - b.activity_id).map((activity: any) => {
                        return (
                            <button
                                onClick={() => {
                                    updateTask(activity.name, Boolean(!activity.completed));
                                }}
                                className="flex flex-col h-full w-[24vh] bg-slate-900 px-1 py-1 rounded-lg drop-shadow-lg"
                            >
                                <div className='flex justify-between w-full px-1'>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        deleteTask(activity.activity_id);
                                    }}>
                                        <DeleteIcon className='text-red-400' sx={{ fontSize: '1rem' }}></DeleteIcon>
                                    </button>
                                    <h2 className={'mt-2 text-sm font-semibold py-1 px-2 rounded-lg ' + categoryColours(activity.category, true)
                                        + ' ' + categoryColours(activity.category, false)}>{activity.category}
                                    </h2>
                                    <div className={`w-4 h-4 my-auto text-white self-end ${activity.completed ? 'bg-green-400' : 'bg-red-400'} rounded-full flex justify-between items-center`}>
                                        {activity.completed && <CheckIcon sx={{ fontSize: '0.75rem', margin: 'auto' }} />}
                                    </div>
                                </div>
                                <h2 className='mt-4 ml-2 font-semibold'>{activity.name}</h2>
                                <p className='ml-2 text-sm text-gray-500'>{activity.description}</p>
                            </button>
                        )
                    })}
                </div>
                <button className='text-gray-500' onClick={() => setIsOpen(true)}>
                    <AddCircleOutlineIcon sx={{ fontSize: '2rem', margin: 'auto' }} />
                </button>
            </div>
            <Transition
                show={isOpen}
                as={Fragment}
            >
                <Dialog onClose={() => {
                    setIsOpen(false);
                    setActivityName("");
                    setActivityCategory("Workout");
                    setActivityDescription("");
                }
                }
                >
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
                        <div className='fixed inset-0 bg-white w-[50vh] h-[60vh] m-auto p-2 rounded-xl drop-shadow-xl'>
                            <Dialog.Panel className='h-full flex p-4'>
                                <div className='flex flex-col grow'>
                                    <Dialog.Title className='font-bold my-2 ml-4'>New Activity</Dialog.Title>
                                    <form className='flex flex-col'>
                                        <label className='ml-4'>
                                            Activity Name:
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            name="activity-name"
                                            className='m-4 border-2 border-slate-600 rounded-md'
                                            onChange={(e) => setActivityName(e.target.value)}
                                        />
                                        <label className='ml-4'>
                                            Category:
                                        </label>
                                        <select
                                            name="activity-category"
                                            id="activity-category"
                                            className='m-4 border-2 border-slate-600 rounded-md'
                                            defaultValue={"Workout"}
                                            onChange={(e) => { setActivityCategory(e.target.value) }}
                                        >
                                            <option value="Workout">Workout</option>
                                            <option value="Cardio">Cardio</option>
                                            <option value="Yoga">Yoga</option>
                                            <option value="Meditation">Meditation</option>
                                        </select>
                                        <label className='ml-4'>
                                            Description (optional):
                                        </label>
                                        <textarea id="activity-desc" name="activity-desc"
                                            maxLength={20} style={{ resize: 'none' }}
                                            className='m-4 border-2 border-slate-600 rounded-md'
                                            onChange={(e) => setActivityDescription(e.target.value)}
                                        />
                                    </form>

                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                setActivityName("");
                                                setActivityCategory("Workout");
                                                setActivityDescription("");
                                            }}
                                            className='bg-red-300 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 rounded shadow'
                                        >Cancel</button>
                                        <button
                                            onClick={() => {
                                                addTask();
                                                setIsOpen(false);
                                                setActivityName("");
                                                setActivityCategory("Workout");
                                                setActivityDescription("");
                                            }}
                                            className='bg-green-300 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4 rounded shadow'
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