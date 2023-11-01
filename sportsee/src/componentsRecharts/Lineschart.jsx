import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

// personnalise le style du tooltip, l'infobulle
function CustomTooltip({ payload, active }) {
  if (active && payload && payload.length) {
    return (
      <div  style={{ backgroundColor: 'white', paddingLeft:'10px', paddingRight:'10px'}}>
        <p>{payload[0].value} min</p>
      </div>
    );
  }

  return null;
}

// personnalise les ticks des jours affichés
function CustomAxisTick(props) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
}

// personnalise la légende : le style et message, utile pour avoir un retour à la ligne avec <br>
function CustomLegend() {
  return (
    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
      <li style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
        Durée moyenne des  <br/> sessions
      </li>
    </ul>
  );
}

// retourne la linechart avec le tableau de données associées
function Lineschart({data}) {
  const [gradientPosition, setGradientPosition] = useState(50);// pour le dégradé relié à la souris

  // écoute le mouvement de la souris par rapport à l'objet du graphic rectangle
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x est l'evenement souris sur le x moins la position du rect du graphe
    const percentage = (x / rect.width) * 100; // percentage est x divisé par la taille total du rectangle
    setGradientPosition(percentage); // utilisera cette valeur pour la valeur du linear-gradient du background du rectangle
  };



  return (
    <div onMouseMove={handleMouseMove} style={
      { backgroundColor: 'red'
        , background: `linear-gradient(to right, red ${gradientPosition -1}%, rgb(200,0,0) ${gradientPosition}%)`
        , borderRadius:'5px', padding:'5px', width: '200px', height: '200px', aspectRatio: '1/1' }}> {/*la fonction handleMouseMove est appelée, chaque mouvement redefini la position du background foncé */}

      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        <LineChart
          data={data} //associe les datas
          margin={{
            top: 25, right: 10, left: -50, bottom: 25,
          }}
        >
          <XAxis dataKey="day" stroke="white"// rend tout tick et ligne invisible pour ne gardé en repère que les jours sur l'axe X
            tickLine={false} 
            axisLine={false}
            tick={<CustomAxisTick/>}
          />
          <YAxis stroke="transparent" // elimine les traces sur l'axe Y
          />
          <Tooltip content={<CustomTooltip /> } //efface le cursor par defaut de rechart
            cursor={false}/>
          <Legend content={<CustomLegend />} verticalAlign="top" 
            align="left" 
            wrapperStyle={{ marginLeft: "60px", marginTop:'-20px', width: '200px', height: '36px'}} 
          />
          <Line 
            name="Durée moyenne des sessions"
            dot={false}
            type="monotone" // adoucit la courbe
            dataKey="sessionLength" 
            stroke="white"
            strokeWidth={1} 
            activeDot={{ r: 8, fill: 'white' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Lineschart;
