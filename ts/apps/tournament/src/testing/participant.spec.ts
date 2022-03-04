import { app } from '../app';
import * as request from 'supertest';
import { Participant } from '../app/api/api-model';

const exampleParticipant = {
  name: (Math.random() + 1).toString(36).substring(7),
  elo: Math.floor(Math.random() * 3),
} as Participant;
const tournamentId = (Math.random() + 1).toString(36).substring(7);
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
  });

  it('Participant already exist', async () => {
    const participantName = (Math.random() + 1).toString(36).substring(7);
    const newParticipant = {
      name: participantName,
      elo: Math.floor(Math.random() * 3),
    } as Participant;

    await request(app)
      .post('/api/tournaments/' + tournamentId + '/participants')
      .send(newParticipant)
      .expect(201);
    const { body } = await request(app)
      .post('/api/tournaments/' + tournamentId + '/participants')
      .send(newParticipant)
      .expect(400);

    expect(body.message).toEqual("can't create tournament, the participant already exist");
  });
});