import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

function SessionsTooltip({ payload, active }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', paddingLeft:'10px', paddingRight:'10px'}}>
        <p>{payload[0].value} min</p>
      </div>
    );
  }

  return null;
}

function Lineschart({data}) {
  const [gradientPosition, setGradientPosition] = useState(50);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const percentage = (x / rect.width) * 100;
    setGradientPosition(percentage);
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ backgroundColor: 'red', background: `linear-gradient(to right, red ${gradientPosition -5}%, rgb(200,0,0) ${gradientPosition}%)`, borderRadius:'5px', padding:'5px', width: '200px', height: '200px', aspectRatio: '1/1' }}>
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        <LineChart
          data={data}
          margin={{
            top: 25, right: 10, left: -50, bottom: 25,
          }}
        >
          <XAxis dataKey="day" stroke="white"
            tickLine={false} 
            axisLine={false}
          />
          <YAxis stroke="transparent" />
          <Tooltip content={<SessionsTooltip />} />
          <Line 
            dot={false}
            type="monotone" 
            dataKey="sessionLength" 
            stroke="white"
            strokeWidth={2} 
            activeDot={{ r: 8, fill: 'white' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Lineschart;
