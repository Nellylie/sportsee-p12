import { PieChart, Pie, Cell } from 'recharts';

export default function Radialchart({ data }) {
  const percentageValue = data * 100;
  const dataPie = [
    { value: percentageValue },
    { value: 100 - percentageValue }
  ];

  return (
    <div style={{
      width: 258,
      height: 253,
      backgroundColor: '#FBFBFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'relative' }}>
        <svg width={200} height={200} style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx={100} cy={100} r={80} fill="white" />
        </svg>
        <PieChart width={200} height={200}>
          <Pie
            data={dataPie}
            dataKey="value"
            startAngle={-270}
            endAngle={90}
            innerRadius={80}
            outerRadius={90}
            isAnimationActive={true}
            cornerRadius={10}
            cornerIsRound
          >
            <Cell fill="red" stroke="transparent" />
            <Cell fill="transparent" stroke="transparent" />
          </Pie>
        </PieChart>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 16,
          fontWeight: 'bold',
        }}>
          {percentageValue}%
        </div>
      </div>
    </div>
  );
}
