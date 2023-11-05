import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from 'recharts';

// retourne le radarchart avec le tableau de données associées
function HexaRadarChart({data}) {
  const reversedData = [...data].reverse();// inverse la disposition des données dans le sens inverse d'une aiguille d'une montre

  return (
    <div style={{ backgroundColor: '#282D30', borderRadius:'5px',
      width:'200px', height: '200px', padding:'5px', aspectRatio: '1/1' }}>
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        <RadarChart 
          cx="50%" 
          cy="50%" 
          outerRadius={70} 
          data={reversedData}
        >
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis dataKey="kind"
            tick={{ fontSize: '10px' }}
          />
          <Tooltip 
          />
          <Radar name="Performance" dataKey="value" fill="red" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default HexaRadarChart;