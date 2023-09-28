import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function Lineschart({data}) {
  console.log("datasession", data);
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line 
        type="monotone" 
        dataKey="sessionLength" 
        stroke="#8884d8" 
        strokeWidth={2} 
        dot={true}
        activeDot={{ r: 8 }} 
      />
    </LineChart>
  );
}

export default Lineschart;
