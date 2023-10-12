import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HexaRadarChart({data}) {
  const reversedData = [...data].reverse();

  return (
    <div style={{ backgroundColor: '#282D30', width: '258px', height: 'auto', aspectRatio: '1/1' }}>
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        <RadarChart 
          cx="50%" 
          cy="50%" 
          outerRadius={90} 
          data={reversedData}
        >
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis dataKey="kind"
            tick={{ fontSize: '12px' }}
          />
          <Tooltip 
          />
          <Radar name="Performance" dataKey="value" fill="red" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
