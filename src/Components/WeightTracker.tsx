import { Dialog, Transition } from "@headlessui/react";
import { IconButton } from "@mui/material";
import ToggleIcon from "material-ui-toggle-icon";
import { Fragment, useEffect, useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

import { isDate } from "util/types";
import axios from "axios";

  const formatXAxis = (tickItem:string) => {
    return tickItem.slice(5,10);
  }

export default function WeightTracker(props:any){
    const data = props.data;
    const [isOpen, setIsOpen] = useState(false);
    const [weight, setWeight] = useState(0);
    const [weightAdded, setWeightAdded] = useState(false);

    console.log(data);

    let iconStyles = {
      fontSize: '1rem',
      margin: 'auto',
      color: 'white'
    };

    const addWeight = async (date:any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/weight/add`;
        await axios.get(url, {params: {weight: weight, date:date.toString()}});
        props.refresh();
    }

    const updateWeight = async (date:any) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/weight/update`;
        await axios.get(url, {params: {id: 1, weight: weight, date:date.toString()}});
        props.refresh();
    }

  useEffect(()=>{
    if(data.length > 0){
        setWeightAdded(new Date(data[data.length-1].record_date).toString().slice(0,15) == new Date().toString().slice(0,15));
    }
  })

    return (
        <div className="flex flex-col">
          <div className="flex items-center m-auto">
              <h1 className="font-bold p-4">Weight Tracking</h1>
              <IconButton onClick={()=>setIsOpen(true)} style={iconStyles}>
                <ToggleIcon
                    on={weightAdded}
                    onIcon={<EditIcon/>}
                    offIcon={<AddCircleOutlineIcon/>}
                />                                
              </IconButton>
            </div>
            <LineChart width={730} height={250} data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="record_date" tick={{ fill: 'white' }} reversed={true} tickLine={{ stroke: 'white' }}
               tickFormatter={formatXAxis} padding={{ left: 10, right: 10 }}/>
              <YAxis domain={['dataMin - 5', 'dataMax']} tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#2596be" />
            </LineChart>
            <Transition
                show={isOpen}
                as={Fragment}
            >
                {!weightAdded? 
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
                                    <Dialog.Title className='font-bold'>Weight Record</Dialog.Title>
                                    <form className='flex flex-col'>
                                        <label>
                                            Enter Weight:
                                        </label>
                                        <input 
                                            type="number" 
                                            name="weight-record" 
                                            defaultValue={0}
                                            className='m-4 border-2 border-slate-600 rounded-md' 
                                            onChange={(e)=>setWeight(Number(e.target.value))}
                                        />
                                    </form>

                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                        <button 
                                            onClick={() => setIsOpen(false)}
                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                        >Cancel</button>
                                        <button 
                                            onClick={() => {
                                                addWeight(new Date)
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
                                    <Dialog.Title className='font-bold'>Weight Record</Dialog.Title>
                                    <form className='flex flex-col'>
                                        <label>
                                            Edit Weight:
                                        </label>
                                        <input 
                                            type="number" 
                                            name="weight-record" 
                                            defaultValue={0}
                                            className='m-4 border-2 border-slate-600 rounded-md' 
                                            onChange={(e)=>setWeight(Number(e.target.value))}
                                        />
                                    </form>

                                    <div className='flex w-full justify-between p-4 mt-auto'>
                                        <button 
                                            onClick={() => setIsOpen(false)}
                                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                                        >Cancel</button>
                                        <button 
                                            onClick={() => {
                                                updateWeight(new Date)
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
    )
}