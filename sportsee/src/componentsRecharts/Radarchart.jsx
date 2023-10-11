import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';

export default function HexaRadarChart({data}) {
  const reversedData = [...data].reverse();

  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={reversedData}>
      <PolarGrid gridType="polygon" />
      <PolarAngleAxis dataKey= "kind"/>
      <Tooltip />
      <Radar name="Performance" dataKey="value" fill="red" fillOpacity={0.6} />
    </RadarChart>
  );
}