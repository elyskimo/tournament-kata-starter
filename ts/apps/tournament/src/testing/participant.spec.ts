import { app } from '../app';
import * as request from 'supertest';
import { Tournament, Participant } from '../app/api/api-model';

const exampleParticipant = {
  name: (Math.random() + 1).toString(36).substring(7),
  elo: parseInt(((Math.random() + 1 ) * 10000).toString()),
} as Participant;

const exampleTournament = {
  id:(Math.random() + 1).toString(36).substring(5),
  name: (Math.random() + 1).toString(36).substring(7),
  participants: [exampleParticipant]
} as Tournament;

const tournamentId = (Math.random() + 1).toString(36).substring(7);

describe('/tournament/participants endpoint', () => {
  describe('[POST] when adding a participant in a tournament', () => {
    // TODO: test case for successfull request 201
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

  // describe('[GET] list of participant for specific tournament', () => {
  //   it('should return a list of participants', async () => {
  //
  //     const { body } = await request(app).post('/api/tournaments').send(exampleTournament).expect(201);
  //     console.log("iciiiii",body.id)
  //     const get = await request(app).get('/api/tournaments/' + body.id +'/participants' ).expect(201);
  //     expect(get.body.participants).not.toBeUndefined();
  //   });
  // });
});
