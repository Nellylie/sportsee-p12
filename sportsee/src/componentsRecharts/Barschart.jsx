import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle, ResponsiveContainer} from 'recharts';

// obtient les trois valeurs maximums et les retourne par ordre décroissant
function getTopThreeUniqueKilograms(data) {
  const uniqueKilograms = [...new Set(data.map(item => item.kilogram))].sort((a, b) => b - a);
  return uniqueKilograms.slice(0, 3);
}

// customise le ToolTip de recharts pour afficher une étiquette au style personnalisée qui prendra deux valeurs : le kg et les kcal
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

// personnalise l'affichage des bars pour ajouter des pixels à la hauteur pour ne pas que le minimum soit plat
const CustomBar = (props) => {
  const { x, y, width, height, ...others } = props;
  const newY = y - 10;
  const newHeight = height + 10;
  return <Rectangle {...others} x={x} y={newY} width={width} height={newHeight} />;
};

// retourne la barschart associée à la donnée day, kg, kcal
function Barschart({data}) {
  const topThreeKilograms = getTopThreeUniqueKilograms(data);
  const maxKilogram = Math.max(...topThreeKilograms);
  const minKilogram = Math.min(...topThreeKilograms);
  const calorieDomain = [0, maxKilogram * 2]; // préparation pour la mise à l'echelle

  return (
    <div style={{ backgroundColor: '#FBFBFB', padding: '40px 10px 2px 10px', width: '100%', height: '250px', aspectRatio: '16/9' }}>

      <ResponsiveContainer
        width={"100%"}
        height={"100%"}
      >
        {/*associe les données au graphs et indique les tailles, margin */}
        <BarChart
          width={600}
          height={300}
          data={data} 
          margin={{ top: 60, right: 30, left: 80, bottom: 5 }}
        >
          {/*la grille : 3 lignes en arrière plan*/}
          <CartesianGrid strokeDasharray="3 3" />

          {/*la donnée correspondant au jour associée à l'axe X*/}
          <XAxis dataKey="day" />

          {/*l'axe Y a comme repere les kg*/}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[minKilogram, maxKilogram]}
            tickCount={topThreeKilograms.length}
            tickFormatter={(value) => topThreeKilograms.includes(value) ? value : ''}
            ticks={topThreeKilograms}
          />

          {/*un deuxième axe y réalisé pour les kcal, dont les ticks sont cachés, car le repère ce sont les kg*/}
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={calorieDomain}
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} />
          {/*les deux composants bar de recharts avec les données associées*/}
          <Bar radius={[5, 5, 0, 0]} yAxisId="right" dataKey="kilogram" fill="#282D30" barSize={10} shape={<CustomBar />}/>
          <Bar radius={[5, 5, 0, 0]} yAxisId="left" dataKey="calories" fill="#ff0000" barSize={10} shape={<CustomBar />}/>
          
          {/*legende avec valeur personnalisée*/}
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{ paddingLeft: '40px', top:'-10px' }}
            payload={[
              { value: 'kilogram', type: 'circle', id: 'ID01', color: '#282D3' },
              { value: 'calories', type: 'circle', id: 'ID02', color: '#ff0000' }
            ]}
          />
          <text x={50} y={10} fontSize={14} fontWeight="bold">
          activitée quotidienne
          </text>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Barschart;
