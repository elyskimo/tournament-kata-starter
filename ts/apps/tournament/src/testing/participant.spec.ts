import { app } from '../app';
import * as request from 'supertest';
import { Tournament, TournamentPhaseType } from '../app/api/api-model';

const exampleTournament = {
  id:(Math.random() + 1).toString(36).substring(5),
  name: (Math.random() + 1).toString(36).substring(7),
} as Tournament;

describe('/tournament endpoint', () => {

});
