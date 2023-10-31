
# Sportsee

Sportsee est une application pour les amateurs de sport qui souhaitent suivrent leur progression via un affichage visuel de leur score journalier.

La démo est disponible sur ce lien : 
https://nellylie.github.io/sportsee-p12/


## Technologie
L'application Sportsee est codée avec la librairie React, la librairie Recharts pour la visualisation dynamique des données, la librairie Sass pour la gestion du css, la librairie Axios pour la connection à l'API, l'ensemble des librairies utilisée sont visualisable dans le fichier package.json du repository Sportsee.





## Installation

Se mettre sur le repertoire enfant Sportsee pour lancer l'application

```bash
  npm i
```

Pour tester avec la connection à l'API,
suivre les indications sur ce lien :https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard

et changer le numero de port de 3000 à 3001 dans le fichier index.js du repertoire app du git cloné:

```js
const express = require('express')
const cors = require('cors')

const router = require('./routes')

const app = express()
app.use(cors())
const port = 3001

```

Lancer le server, puis lancer l'application, ce dernier tentera de se connecter automatiquement à la version API et si la connection échoue, il se connectera à la version des données mockées. 

Bonne visite!
