import { app } from '../app';
import * as request from 'supertest';
import { Tournament, TournamentPhaseType, TournamentPhase } from '../app/interfaces';

const exampleTournamentPhase = {
  type:
    Math.floor(Math.random() * 1) === 0 ? TournamentPhaseType.SingleBracketElimination : TournamentPhaseType.SwissRound,
} as TournamentPhase;

describe('/tournament/{id}/phases endpoint', () => {
  describe('[POST New phase: single elimination table', () => {
    it('Phase : Tournament does not exist', async () => {
      const tId = (Math.random() + 1).toString(36).substring(5);
      const { body } = await request(app)
        .post('/api/tournaments/' + tId + '/phases')
        .send(exampleTournamentPhase)
        .expect(404);
      expect(body.message).toEqual('This tournament does not exist');
    });

    it('The type is not provided or is not known', async () => {
      const response = await request(app)
        .post('/api/tournaments')
        .send({ name: (Math.random() + 1).toString(36).substring(7) } as Tournament)
        .expect(201);
      const { body } = await request(app)
        .post('/api/tournaments/' + response.body.id + '/phases')
        .send({ type: (Math.random() + 1).toString(36).substring(7) })
        .expect(400);
      expect(body.message).toEqual('The type is not provided or is not known');
    });
  });
});
