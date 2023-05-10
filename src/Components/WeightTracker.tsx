import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { isDate } from "util/types";

let data = [
    {
      "name": new Date().toJSON().slice(5, 10),
      "weight": 100,
    },
    {
      "name": new Date().toJSON().slice(5, 10),
      "weight": 100,
    },
    {
      "name": new Date().toJSON().slice(5, 10),
      "weight": 100,
    },
    {
      "name": new Date().toJSON().slice(5, 10),
      "weight": 101,
    },
    {
      "name": new Date().toJSON().slice(5, 10),
      "weight": 101,
    },
    {
      "name": new Date().toJSON().slice(5, 10),
      "weight": 101,
    },
    {
      "name": new Date().toJSON().slice(5, 10),
      "record_date": 102,
    }
  ];

  const formatXAxis = (tickItem:string) => {
    return tickItem.slice(5,10);
  }

export default function WeightTracker(props:any){
    data = props.data;
    return (
        <div>
            <LineChart width={730} height={250} data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="record_date" tickFormatter={formatXAxis} padding={{ left: 10, right: 10 }}/>
              <YAxis domain={['dataMin - 5', 'dataMax']} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#2596be" />
            </LineChart>
        </div>
    )
}