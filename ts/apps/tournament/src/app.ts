import * as express from 'express';
import { getTournament, postTournament } from './app/controllers/tournament-controller';
import { postParticipant, getParticipants } from './app/controllers/participant-controller';
import { postPhase } from './app/controllers/phase-controller';
import * as bodyParser from 'body-parser';

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournament!' });
});

app.get('/api/tournaments/:id/participants', getParticipants);
app.post('/api/tournaments', postTournament);
app.get('/api/tournaments/:id', getTournament);

app.post('/api/tournaments/:id/participants', postParticipant);
app.post('/api/tournaments/:id/phases', postPhase);