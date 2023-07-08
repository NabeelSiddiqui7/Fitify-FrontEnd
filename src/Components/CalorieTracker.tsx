import { IconButton } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Label,
  Cell,
} from "recharts";

const helpers: { [key: string]: { [key: string]: string } } = {
  Protein: { colour: "rgb(255 110 74)", name: "Protein" },
  Carbs: { colour: "#f35b04", name: "Carbs" },
  Fat: { colour: "#f7b801", name: "Fat" },


};

const amountSum = 100;

export default function CalorieTracker(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([] as any[]);

  const getData = async (query: string) => {
    const req = {
      method: 'GET',
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
      headers: {
        'X-API-Key': 'tLEP45tHbkF0axfvdMYgag==jjvXVIeoCSE4tPSt',
      }
    };
    const response = (await axios.request(req)).data.items;
    setSearchResults(response);
  }

  const addFood = async (food: any) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/food/add`;
    await axios.get(url, {
      params:
      {
        name: food.name,
        date: (new Date).toString(),
        calories: food.calories,
        protein: food.protein_g,
        fat: food.fat_total_g,
        carbs: food.carbohydrates_total_g
      }
    });
    props.refresh();
  }

  const deleteFood = async (name: any) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/food/delete`;
    await axios.get(url, { params: { name: name } });
    props.refresh();
  }

  let iconStyles = {
    fontSize: '1.5rem',
    margin: 'auto',
    color: 'white'
  };

  return (
    <div className="h-2/3 w-full">
      <div className="flex justify-center items-center m-auto">
        <h1 className="font-bold py-4 mx-2"> Nutrition Breakdown</h1>
        <IconButton onClick={() => setIsOpen(true)}>
          <AddCircleOutlineIcon style={iconStyles} />
        </IconButton>
        <IconButton onClick={() => setIsListOpen(true)}>
          <ViewListIcon style={iconStyles} />
        </IconButton>
      </div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="text-lg lg:text-base"
      >
        <PieChart width={800} height={800}>
          {props.nutrition.map((item: any, index: any) => {
            if ((item.amt / amountSum) * 100 > 2) {
              return (
                <Pie
                  data={props.nutrition}
                  dataKey="amt"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label={(item) =>
                    `${item.amt.toLocaleString("en-us")}`
                  }
                >
                  {props.nutrition.map((item: any, index: any) => {
                    return (
                      <Cell
                        name={helpers[item.nutrition].name}
                        key={item.nutrition}
                        fill={helpers[item.nutrition].colour}
                        stroke="#f5f5fa"
                      />
                    );
                  })}
                </Pie>
              );
            }
          })}
          <Tooltip
            contentStyle={{
              backgroundColor: "#24252f",
              borderRadius: "10px",
              borderColor: "#363640",
            }}
            itemStyle={{ color: "#EFEFEF" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <Transition
        show={isOpen}
        as={Fragment}
      >
        <Dialog onClose={() => { setIsOpen(false); setSearchInput(""); setSearchResults([]) }}>
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
                  <Dialog.Title className='font-bold'>Add Food</Dialog.Title>
                  <form className='flex flex-col'>
                    <label>
                      Enter Food:
                    </label>
                    <div className="flex mb-2">
                      <input
                        placeholder="Ex: I had pizza with fries"
                        type="text"
                        name="weight-record"
                        className='m-4 border-2 border-slate-600 rounded-md w-3/4'
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold my-auto h-7 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                          e.preventDefault();
                          getData(searchInput);
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </form>

                  {searchResults.length > 0 && searchResults.map((food) => {
                    return <button className="w-3/4 border-y-2 border-neutral-300 mx-auto my-1" onClick={() => addFood(food)}>
                      <div className="flex justify-between">
                        <h1 className="font-bold">{food.name}</h1>
                        <h3>{food.calories}cals</h3>
                      </div>
                    </button>
                  })}

                  <div className='flex w-full justify-between p-4 mt-auto'>
                    <button
                      onClick={() => setIsOpen(false)}
                      className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                    >Cancel</button>
                    <button
                      onClick={() => {
                        // addWeight(new Date)
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
      <Transition
        show={isListOpen}
        as={Fragment}
      >
        <Dialog onClose={() => { setIsListOpen(false); }}>
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
                  <Dialog.Title className='font-bold'>Today's Food</Dialog.Title>

                  {props.food.length > 0 && props.food.map((food: any) => {
                    return <div className="w-3/4 border-b-2 border-neutral-300 mx-auto my-1">
                      <div className="flex justify-between">
                        <h1 className="font-bold">{food.name}</h1>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          deleteFood(food.name);
                        }}>
                          <DeleteIcon className='text-red-400' sx={{ fontSize: '1rem' }} />
                        </button>
                      </div>
                    </div>
                  })}

                  <div className='flex w-full justify-between p-4 mt-auto'>
                    <button
                      onClick={() => setIsListOpen(false)}
                      className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                    >Cancel</button>
                    <button
                      onClick={() => {
                        // addWeight(new Date)
                        setIsListOpen(false);
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