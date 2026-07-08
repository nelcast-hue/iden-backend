const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'IDEN API funcionando' });
});

app.post('/api/auth/login', (req, res) => {
  const { epost, passord } = req.body;
  if (epost === 'test@iden.app' && passord === '123456') {
    res.json({
      token: 'token_de_prueba',
      bruker: {
        id: 1,
        navn: 'Test Bruker',
        epost: 'test@iden.app'
      }
    });
  } else {
    res.status(401).json({ feil: 'Feil epost eller passord' });
  }
});

app.post('/api/okter/start', (req, res) => {
  const { bruker_id, prosjekt_id, type } = req.body;
  const nyOkt = {
    id: Date.now(),
    bruker_id,
    prosjekt_id,
    type: type || 'arbeid',
    start_tid: new Date().toISOString(),
    status: 'apen'
  };
  res.json({ okt: nyOkt, melding: 'Økt startet' });
});

app.post('/api/okter/stopp', (req, res) => {
  const { okt_id } = req.body;
  res.json({
    okt_id,
    slutt_tid: new Date().toISOString(),
    status: 'fullfort',
    melding: 'Økt avsluttet. Husk arbeidsrapport!'
  });
});

app.listen(PORT, () => {
  console.log('IDEN API kjorer pa http://localhost:' + PORT);
});