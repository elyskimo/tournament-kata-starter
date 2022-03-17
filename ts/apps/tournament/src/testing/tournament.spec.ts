import { app } from '../app';
import * as request from 'supertest';
import { Tournament } from '../app/interfaces';
import { initMongo } from '../config/mongo';

const exampleTournament = {
  id: (Math.random() + 1).toString(36).substring(5),
  name: (Math.random() + 1).toString(36).substring(7),
} as Tournament;

beforeAll(() => initMongo());
describe('/tournament endpoint', () => {
  describe('[POST] when creating a tournament', () => {
    it('should return the correct id', async () => {
      const { body } = await request(app).post('/api/tournaments').send(exampleTournament).expect(201);

      expect(body.id).not.toBeUndefined();
    });

    it('the name doesnt exist ', async () => {
      const { body } = await request(app).post('/api/tournaments').send({}).expect(400);

      expect(body.message).toEqual("can't create tournament, the name is missing");
    });

    it('the name is empty', async () => {
      const { body } = await request(app).post('/api/tournaments').send({ name: '' }).expect(400);

      expect(body.message).toEqual("can't create tournament, the name is empty");
    });

    it('should have stored the tournament', async () => {
      const tournamentName = (Math.random() + 1).toString(36).substring(7);
      const newTournament = {
        name: tournamentName,
      } as Tournament;
      const { body } = await request(app).post('/api/tournaments').send(newTournament).expect(201);

      const get = await request(app).get(`/api/tournaments/${body.id}`).expect(200);

      expect(get.body.name).toEqual(newTournament.name);
    });

    it('tournament name already exists', async () => {
      const tournamentName = (Math.random() + 1).toString(36).substring(7);
      const newTournament = {
        name: tournamentName,
      } as Tournament;

      await request(app).post('/api/tournaments').send(newTournament).expect(201);
      const { body } = await request(app).post('/api/tournaments').send(newTournament).expect(400);

      expect(body.message).toEqual("can't create tournament, the name already exist");
    });
  });
  describe('[GET] when user want tournament descriptions', () => {
    it('tournament does not exist', async () => {
      const { body } = await request(app)
        .get('/api/tournaments/' + exampleTournament.id)
        .expect(400);
      expect(body.message).toEqual('This tournament does not exist');
    });
  });
});
