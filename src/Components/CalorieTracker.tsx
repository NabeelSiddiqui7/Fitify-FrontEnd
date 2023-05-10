import {
    ResponsiveContainer,
    Tooltip,
    PieChart,
    Pie,
    Label,
    Cell,
  } from "recharts";

  let normal_data = [
    { count: 5, party: "Protein" },
    { count: 7, party: "Carbs" },
    { count: 12, party: "Fat" },

  ];

  const helpers: { [key: string]: { [key: string]: string } } = {
    Protein: { colour: "rgb(255 110 74)", name: "Protein" },
    Carbs: { colour: "#f35b04", name: "Carbs" },
    Fat: { colour: "#f7b801", name: "Fat" },


  };

  const amountSum = 100;
  const slice_width: number = 360 / normal_data.length;


  export default function CalorieTracker(){
    return (
        <div className="h-1/2 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="text-lg lg:text-base"
        >
          <PieChart width={800} height={800}>
            {normal_data.map((item, index) => {
              if ((item.count / amountSum) * 100 > 2) {
                return (
                  <Pie
                    data={normal_data}
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label={(item) =>
                      `${item.count.toLocaleString("en-us")}`
                    }
                  >
                    {normal_data.map((item, index) => {
                      return (
                        <Cell
                          name={helpers[item.party].name}
                          key={item.party}
                          fill={helpers[item.party].colour}
                          stroke="#f5f5fa"
                        />
                      );
                    })}
                  </Pie>
                );
              } else if ((item.count / amountSum) * 100 > 5) {
                return (
                  <Pie
                    key={item.party}
                    data={[{ amount: 100.1, party: item.party }]}
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    startAngle={index * slice_width}
                    endAngle={index * slice_width + slice_width}
                  >
                    <Label
                      value={"no data"}
                      position={"end"}
                      fill={helpers[item.party].colour}
                    />
                    <Cell
                      name={helpers[item.party].name}
                      key={item.party}
                      fill="white"
                      fillOpacity={0}
                      stroke={helpers[item.party].colour}
                      strokeDasharray="15 5"
                    />
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
              labelFormatter={(value: number) =>
                value == undefined
                  ? "No Data"
                  : `${((value / amountSum) * 100).toFixed(0)}%`
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }