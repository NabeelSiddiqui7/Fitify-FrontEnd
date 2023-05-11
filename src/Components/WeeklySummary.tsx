import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const data = [
    {
      "name": "monday",
      "steps": 4000,
      "calories": 2400,
      "amt": 2400
    },
    {
      "name": "tuesday",
      "steps": 3000,
      "calories": 1398,
      "amt": 2210
    },
    {
      "name": "wednesday",
      "steps": 2000,
      "calories": 9800,
      "amt": 2290
    },
    {
      "name": "thursday",
      "steps": 2780,
      "calories": 3908,
      "amt": 2000
    },
    {
      "name": "friday",
      "steps": 1890,
      "calories": 4800,
      "amt": 2181
    },
    {
      "name": "saturday",
      "steps": 2390,
      "calories": 3800,
      "amt": 2500
    },
    {
      "name": "sunday",
      "steps": 3490,
      "calories": 4300,
      "amt": 2100
    }
  ]

export default function WeeklySummary(){
    return (
        <div>
            <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#8884d8" />
            <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}