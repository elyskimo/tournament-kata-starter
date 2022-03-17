import { app } from '../app';
import * as request from 'supertest';
import { Participant, Tournament } from '../app/interfaces';
import { initMongo } from '../config/mongo';

const exampleParticipant = {
  name: (Math.random() + 1).toString(36).substring(7),
  elo: Math.floor(Math.random() * 3),
} as Participant;

const exampleTournament = {
  id: (Math.random() + 1).toString(36).substring(5),
  name: (Math.random() + 1).toString(36).substring(7),
  participants: [exampleParticipant],
} as Tournament;

const tournamentId = (Math.random() + 1).toString(36).substring(7);

beforeAll(() => initMongo());
describe('/tournament/participants endpoint', () => {
  describe('[POST] when adding a participant in a tournament', () => {
    it('Tournament does not exist', async () => {

      const { body } = await request(app)
        .post('/api/tournaments/' + tournamentId + '/participants')
        .send(exampleParticipant)
        .expect(404);
      expect(body.message).toEqual('This tournament does not exist');
    });

    it('Name or elo of the participant is empty', async () => {
      const { body } = await request(app)
        .post('/api/tournaments/' + tournamentId + '/participants')
        .send({ name: '' } as Participant)
        .expect(400);
      expect(body.message).toEqual("can't add this participant, the name or the elo is empty");
    });

    it('Participant already exist', async () => {
      const participantName = (Math.random() + 1).toString(36).substring(7);
      const newParticipant = {
        name: participantName,
        elo: Math.floor(Math.random() * 3),
      } as Participant;
      const response = await request(app).post('/api/tournaments').send(exampleTournament).expect(201);

      await request(app)
        .post('/api/tournaments/' + response.body.id + '/participants')
        .send(newParticipant)
        .expect(201);
      const { body } = await request(app)
        .post('/api/tournaments/' + response.body.id + '/participants')
        .send(newParticipant)
        .expect(404);

      expect(body.message).toEqual("can't create tournament, the participant already exist");
    });
  });

  describe('[GET] list of participant for specific tournament', () => {
    it('should return a list of participants', async () => {
      const response = await request(app)
        .post('/api/tournaments')
        .send({ name: (Math.random() + 1).toString(36).substring(7), participants: [exampleParticipant] } as Tournament)
        .expect(201);
      const get = await request(app)
        .get('/api/tournaments/' + response.body.id + '/participants')
        .expect(200);

      expect(Array.isArray(get.body.participants)).toBe(true);
    });
  });
});
