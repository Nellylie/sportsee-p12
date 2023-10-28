import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

function SessionsTooltip({ payload, active }) {
  if (active && payload && payload.length) {
    return (
      <div  style={{ backgroundColor: 'white', paddingLeft:'10px', paddingRight:'10px'}}>
        <p>{payload[0].value} min</p>
      </div>
    );
  }

  return null;
}

function CustomizedAxisTick(props) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
}

function CustomLegend() {
  return (
    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
      <li style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
        Durée moyenne des  <br/> sessions
      </li>
    </ul>
  );
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
    <div onMouseMove={handleMouseMove} style={{ backgroundColor: 'red', background: `linear-gradient(to right, red ${gradientPosition -1}%, rgb(200,0,0) ${gradientPosition}%)`, borderRadius:'5px', padding:'5px', width: '200px', height: '200px', aspectRatio: '1/1' }}>
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
            tick={<CustomizedAxisTick/>}
          />
          <YAxis stroke="transparent" />
          <Tooltip content={<SessionsTooltip /> } cursor={false}/>
          <Legend content={<CustomLegend />} verticalAlign="top" 
            align="left" 
            wrapperStyle={{ marginLeft: "60px", marginTop:'-20px', width: '200px', height: '36px'}} 
          />
          <Line 
            name="Durée moyenne des sessions"
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
