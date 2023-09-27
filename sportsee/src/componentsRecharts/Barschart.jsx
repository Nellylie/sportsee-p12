import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function getTopThreeUniqueKilograms(data) {
  const uniqueKilograms = [...new Set(data.map(item => item.kilogram))].sort((a, b) => b - a);
  return uniqueKilograms.slice(0, 3);
}
function calculateEvenTickPositions(chartHeight, tickCount) {
  const distanceBetweenTicks = chartHeight / (tickCount + 1); // +1 because we want to leave space at the top
  let positions = [];
  for(let i=1; i <= tickCount; i++) {
    positions.push(distanceBetweenTicks * i);
  }
  return positions;
}

const CustomYAxisTick = ({ x, payload, position }) => {
  return (
    <g transform={`translate(${x},${position})`}>
      <text x={0} y={0} dy={-4} textAnchor="end" fill="#666" fontSize={10}>
        {payload.value}
      </text>
      <text x={-30} y={0} dy={-4} textAnchor="end" fill="#888" fontSize={8}>
      </text>
    </g>
  );
};


function Barschart({data}) {
  const topThreeKilograms = getTopThreeUniqueKilograms(data);
  const maxKilogram = Math.max(...topThreeKilograms);
  const minKilogram = Math.min(...topThreeKilograms);

  const calorieDomain = [0, maxKilogram * 2];

  return (<BarChart
    width={700}  
    height={300}
    data={data}
    margin={{ top: 20, right: 30, left: 80, bottom: 5 }} 
  >
    <text x={10} y={20} fontSize={14} fontWeight="bold">
      activitée quotidienne
    </text>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="day" />
    <YAxis 
      yAxisId="right"
      orientation="right" 
      domain={[minKilogram, maxKilogram]}
      Tick={props => {
        const tickPositions = calculateEvenTickPositions(300, topThreeKilograms.length);
        return (
          <CustomYAxisTick 
            {...props}
            position={tickPositions.shift()}
          />
        );
      }}
    />



    <YAxis 
      yAxisId="left"
      orientation="left"
      domain={calorieDomain}
      hide={true}
    />
    <Tooltip />
    <Bar radius={[5, 5, 0, 0]} yAxisId="right" dataKey="kilogram" fill="#808080" />
    <Bar radius={[5, 5, 0, 0]} yAxisId="left" dataKey="calories" fill="#ff0000" />


    <Legend 
      align="right"
      verticalAlign="top"
      wrapperStyle={{ paddingLeft: '40px' }} 
      payload={[
        { value: 'kilogram', type: 'circle', id: 'ID01', color: '#808080' },
        { value: 'calories', type: 'circle', id: 'ID02', color: '#ff0000' }
      ]}
    />
  </BarChart>
  );
}

export default Barschart;
