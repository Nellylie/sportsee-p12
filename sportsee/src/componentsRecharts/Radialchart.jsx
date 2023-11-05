import { PieChart, Pie, Cell, Legend } from 'recharts';

function CustomLegend() {
  return (
    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
      <li style={{ color: 'rgba(0,0,0,0.5)', fontSize: '15px', fontWeight:'700' }}>
        Score
      </li>
    </ul>
  );
}

// retourne le radialchart avec le tableau de données associées
export default function Radialchart({ data }) {
  const percentageValue = data * 100; 
  const dataPie = [
    { value: percentageValue },
    { value: 100 - percentageValue }
  ];

  return (
    <div style={{
      width: '200px',
      height: '200px',
      backgroundColor: '#FBFBFB',
      display: 'flex',
      padding:'5px',
      borderRadius:'5px',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'relative' }}>
        <svg width={200} height={200} style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx={100} cy={100} r={80} fill="white" // le cercle
          />
        </svg>
        <PieChart width={200} height={200}// utilise le composant pour les figures "tartes" de recharts
        >
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
        <Legend content={<CustomLegend />} verticalAlign="top" 
          align="left" 
          wrapperStyle={{ marginLeft: "20px", marginTop:'-20px', width: '200px', height: '36px'}} 
        />
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
