import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle, ResponsiveContainer} from 'recharts';

function getTopThreeUniqueKilograms(data) {
  const uniqueKilograms = [...new Set(data.map(item => item.kilogram))].sort((a, b) => b - a);
  return uniqueKilograms.slice(0, 3);
}
function calculateEvenTickPositions(chartHeight, tickCount) {
  const distanceBetweenTicks = chartHeight / (tickCount + 1);
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'red',
        padding: '2px',
        fontSize:'10px',
        color:'white',
        textAlign:'center'
      }}>
        <p>{`${payload[0].value} Kg`}</p>
        <p>{`${payload[1].value} Kcal`}</p>
      </div>
    );
  }
  return null;
};
const CustomBar = (props) => {
  const { x, y, width, height, ...others } = props;
  const newY = y - 10;
  const newHeight = height + 10;
  return <Rectangle {...others} x={x} y={newY} width={width} height={newHeight} />;
};

function Barschart({data}) {
  const topThreeKilograms = getTopThreeUniqueKilograms(data);
  const maxKilogram = Math.max(...topThreeKilograms);
  const minKilogram = Math.min(...topThreeKilograms);
  const calorieDomain = [0, maxKilogram * 2];

  return (
    <div style={{ backgroundColor: '#FBFBFB', padding: '10px', width: '700px', height: '230px', aspectRatio: '16/9' }}>

      <ResponsiveContainer
        width={"100%"}
        height={200}
      >
        <BarChart
          width={600}
          height={200}
          data={data}
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
        >
          <text x={50} y={10} fontSize={14} fontWeight="bold">
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
          <Tooltip content={<CustomTooltip />} />
          <Bar radius={[5, 5, 0, 0]} yAxisId="right" dataKey="kilogram" fill="#282D30" barSize={10} shape={<CustomBar />}/>
          <Bar radius={[5, 5, 0, 0]} yAxisId="left" dataKey="calories" fill="#ff0000" barSize={10} shape={<CustomBar />}/>
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{ paddingLeft: '40px', top:"0px" }}
            payload={[
              { value: 'kilogram', type: 'circle', id: 'ID01', color: '#282D3' },
              { value: 'calories', type: 'circle', id: 'ID02', color: '#ff0000' }
            ]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Barschart;
