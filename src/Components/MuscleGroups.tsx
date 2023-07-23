import { Fragment, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import Select from "react-select";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Model, { IExerciseData, IMuscleStats } from 'react-body-highlighter';
import ToggleIcon from 'material-ui-toggle-icon';
import axios from "axios";
export default function MuscleGroups(props: any) {
    const [isOpen, setIsOpen] = useState(false);

    let iconStyles = {
        fontSize: '1.5rem',
        margin: 'auto',
        color: 'white'
    };

    const exercises: IExerciseData[] = [
        { name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] },
        { name: 'Push Ups', muscles: ['chest'] },
        { name: 'Chest Flys', muscles: ['chest'] },
        { name: 'Tricep Pulldowns', muscles: ['triceps'] },
        { name: 'Tricep Pushdowns', muscles: ['triceps'] },
        { name: 'Dips', muscles: ['chest', 'triceps'] },
        { name: 'Rows', muscles: ['upper-back', 'biceps'] },
        { name: 'Pull Ups', muscles: ['upper-back', 'biceps'] },
        { name: 'Lat Pulldown', muscles: ['upper-back', 'back-deltoids', 'biceps', 'trapezius'] },
        { name: 'Squats', muscles: ['quadriceps', 'gluteal'] },
        { name: 'Deadlift', muscles: ['quadriceps', 'gluteal', 'hamstring', 'upper-back', 'trapezius', 'lower-back'] },
        { name: 'Calf Raises', muscles: ['calves'] },
        { name: 'Crunches', muscles: ['abs'] },



    ]

    const completedExercises = props.data.map((exercise: { name: any; }) => { return exercise.name });

    const data: IExerciseData[] = [
        // { name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] },
        // { name: 'Push Ups', muscles: ['chest'] },
    ];

    exercises.forEach(exercise => {
        if (completedExercises.includes(exercise.name)) {
            data.push(exercise);
        }
    });

    const addWorkout = async (workout: any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/workout/add`;
        await axios.get(url, {
            params:
            {
                id: 1,
                name: workout,
                date: (new Date).toString()
            }
        });
        props.refresh();
    }

    const deleteWorkout = async (name: any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/workout/delete`;
        await axios.get(url, { params: { name: name } });
        props.refresh();
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="flex items-center mt-2 text-white">
                <h1 className="font-bold mx-2">Muscle Groups Today</h1>
                <IconButton onClick={() => setIsOpen(true)} style={iconStyles}>
                    <ToggleIcon
                        on={true}
                        onIcon={<AddCircleOutlineIcon />}
                        offIcon={<AddCircleOutlineIcon />}
                    />
                </IconButton>
            </div>
            <div className='mt-6'>
                <div className="flex">
                    <Model
                        data={data}
                        style={{ width: '8rem', marginBottom: '2rem' }}
                        highlightedColors={['rgb(239 68 68)', 'rgb(185 28 28)']}
                    ></Model>
                    <Model
                        type="posterior"
                        data={data}
                        style={{ width: '8rem', marginBottom: '2rem' }}
                        highlightedColors={['rgb(239 68 68)', 'rgb(185 28 28)']}
                    ></Model>
                </div>
            </div>
            <Transition
                show={isOpen}
                as={Fragment}
            >
                <Dialog onClose={() => {
                    setIsOpen(false);
                    // setSearchInput(""); 
                    // setSearchResults([])
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
                        <div className='fixed inset-0 bg-white w-[60vh] h-[60vh] m-auto p-2 text-center rounded-xl drop-shadow-xl'>
                            <Dialog.Panel className='h-full flex p-4'>
                                <div className='flex flex-col grow'>
                                    <Dialog.Title className='font-bold mb-2'>Add Workout</Dialog.Title>
                                    <form className='flex flex-col mb-6'>
                                        <Select
                                            onChange={e => {
                                                addWorkout(e?.value)
                                            }}
                                            options={exercises.map((exercise) => {
                                                return { value: exercise.name, label: exercise.name };
                                            })}
                                            isSearchable={true}
                                        />
                                    </form>

                                    <div className="border-2 border-neutral-200 overflow-auto h-1/2">
                                        <h1 className="my-2">Today's Exercises</h1>
                                        {data.length > 0 && data.map((exercise) => {
                                            return <div className="w-3/4 border-b-2 border-neutral-300 mx-auto my-1">
                                                <div className="flex justify-between">
                                                    <h1 className="font-bold">{exercise.name}</h1>
                                                    <button onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteWorkout(exercise.name);
                                                    }}>
                                                        <DeleteIcon className='text-red-400' sx={{ fontSize: '1rem' }} />
                                                    </button>
                                                </div>
                                            </div>
                                        })}
                                    </div>

                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                        >Cancel</button>
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