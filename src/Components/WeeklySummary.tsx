import { IconButton } from "@mui/material";
import axios from "axios";
import ToggleIcon from "material-ui-toggle-icon";
import { Fragment, useEffect, useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, Transition } from "@headlessui/react";

const formatXAxis = (tickItem: string) => {
    return tickItem.slice(5, 10);
}

export default function WeeklySummary(props: any) {
    const data = props.data;
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [showSteps, setShowSteps] = useState(true);
    const [stepsAdded, setStepsAdded] = useState(false);
    const [caloriesAdded, setCaloriesAdded] = useState(false);

    let iconStyles = {
        fontSize: '1rem',
        color: 'white'
    };


    const addSteps = async (date: any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/weekly/steps/add`;
        await axios.get(url, { params: { steps: steps, date: date.toString() } });
        props.refresh();
    }

    const addCalories = async (date: any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/weekly/calories/add`;
        await axios.get(url, { params: { id: 1, calories: calories, date: date.toString() } });
        props.refresh();
    }

    useEffect(() => {
        if (data.length > 0) {
            setStepsAdded(new Date(data[data.length - 1].day).toString().slice(0, 15) == new Date().toString().slice(0, 15) && data[data.length - 1].steps != null);
            setCaloriesAdded(new Date(data[data.length - 1].day).toString().slice(0, 15) == new Date().toString().slice(0, 15) && data[data.length - 1].calories != null);
        }
    })
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center mx-auto w-full justify-center">
                <button className="m-1 p-1 border-2 border-slate-500 rounded-lg text-xs w-24" onClick={() => setShowSteps(!showSteps)}>
                    {showSteps ? 'Show Calories' : 'Show Steps'}
                </button>
                <h1 className="font-bold py-4 mx-2">Weekly Running Summary</h1>
                <IconButton onClick={() => setIsOpen(true)} style={iconStyles}>
                    <ToggleIcon
                        on={showSteps ? stepsAdded : caloriesAdded}
                        onIcon={<EditIcon />}
                        offIcon={<AddCircleOutlineIcon />}
                    />
                </IconButton>
            </div>
            {
                showSteps ?
                    <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={730} height={250} data={props.data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="day" tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }}
                                    tickFormatter={formatXAxis} padding={{ left: 10, right: 10 }} />
                                <YAxis tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                        <Transition
                            show={isOpen}
                            as={Fragment}
                        >
                            {!stepsAdded ?
                                <Dialog onClose={() => {
                                    setIsOpen(false);
                                    setSteps(0);
                                    setCalories(0);
                                }}>
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
                                                    <Dialog.Title className='font-bold'>Weekly {showSteps ? 'Steps' : 'Calories'}</Dialog.Title>
                                                    <form className='flex flex-col'>
                                                        <label>
                                                            Enter Steps:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="steps-record"
                                                            defaultValue={0}
                                                            className='m-4 border-2 border-slate-600 rounded-md'
                                                            onChange={(e) => setSteps(Number(e.target.value))}
                                                        />
                                                    </form>
                                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                                        <button
                                                            onClick={() => setIsOpen(false)}
                                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                                        >Cancel</button>
                                                        <button
                                                            onClick={() => {
                                                                addSteps(new Date)
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
                                :
                                <Dialog onClose={() => {
                                    setIsOpen(false);
                                    setSteps(0);
                                    setCalories(0);
                                }}>
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
                                                    <Dialog.Title className='font-bold'>Weekly {showSteps ? 'Steps' : 'Calories'}</Dialog.Title>
                                                    <form className='flex flex-col'>
                                                        <label>
                                                            Edit Steps:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="steps-record"
                                                            defaultValue={0}
                                                            className='m-4 border-2 border-slate-600 rounded-md'
                                                            onChange={(e) => setSteps(Number(e.target.value))}
                                                        />
                                                    </form>
                                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                                        <button
                                                            onClick={() => setIsOpen(false)}
                                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                                        >Cancel</button>
                                                        <button
                                                            onClick={() => {
                                                                addSteps(new Date)
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
                            }
                        </Transition>
                    </div>
                    :
                    <div className="h-full w-full">
                        <ResponsiveContainer width="100%" height="80%">
                            <LineChart width={730} height={250} data={props.data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="day" tickFormatter={formatXAxis} padding={{ left: 10, right: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="calories" stroke="rgb(29 78 216)" />
                            </LineChart>
                        </ResponsiveContainer>
                        <Transition
                            show={isOpen}
                            as={Fragment}
                        >
                            {!stepsAdded ?
                                <Dialog onClose={() => {
                                    setIsOpen(false);
                                    setSteps(0);
                                    setCalories(0);
                                }}>
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
                                                    <Dialog.Title className='font-bold'>Weekly {showSteps ? 'Steps' : 'Calories'}</Dialog.Title>
                                                    <form className='flex flex-col'>
                                                        <label>
                                                            Enter Calories:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="steps-record"
                                                            defaultValue={0}
                                                            className='m-4 border-2 border-slate-600 rounded-md'
                                                            onChange={(e) => setCalories(Number(e.target.value))}
                                                        />
                                                    </form>
                                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                                        <button
                                                            onClick={() => setIsOpen(false)}
                                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                                        >Cancel</button>
                                                        <button
                                                            onClick={() => {
                                                                addCalories(new Date)
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
                                :
                                <Dialog onClose={() => {
                                    setIsOpen(false);
                                    setSteps(0);
                                    setCalories(0);
                                }}>
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
                                                    <Dialog.Title className='font-bold'>Weekly {showSteps ? 'Steps' : 'Calories'}</Dialog.Title>
                                                    <form className='flex flex-col'>
                                                        <label>
                                                            Edit Calories:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="steps-record"
                                                            defaultValue={0}
                                                            className='m-4 border-2 border-slate-600 rounded-md'
                                                            onChange={(e) => setCalories(Number(e.target.value))}
                                                        />
                                                    </form>
                                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                                        <button
                                                            onClick={() => setIsOpen(false)}
                                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                                        >Cancel</button>
                                                        <button
                                                            onClick={() => {
                                                                addCalories(new Date)
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
                            }
                        </Transition>
                    </div>
            }
        </div>
    )
}