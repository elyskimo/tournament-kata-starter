import { Request, Response } from 'express';
// import { TournamentRepository } from '../repository/tournament-repository';
import { TournamentToAdd, tournamentRepository } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';

// const tournamentRepository = new TournamentRepository();

export const postTournament = async (req: Request, res: Response) => {

  if (!Object.keys(req.body).length) {
    res.status(400);
    return res.send({ message: "can't create tournament, the name is missing" });
  }
  if (!req.body.name?.length) {
    res.status(400);
    return res.send({ message: "can't create tournament, the name is empty" });
  }
  const tournamentToAdd: TournamentToAdd = req.body;

  if (tournamentRepository.getTournamentByName(tournamentToAdd.name)) {
    res.status(400);
    return res.send({ message: "can't create tournament, the name already exist" });
  }

  const tournament = {
    id: uuidv4(),
    name: tournamentToAdd.name,
    phases: req.body?.phases || [],
    participants: req.body?.participants || [],
  };
  const {id} = await tournamentRepository.saveTournament(tournament);

  res.status(201);
  res.send({ id: id });

};

export const getTournament = async (req: Request, res: Response) => {
  const id = req.params['id'];

  const tournament = await tournamentRepository.getTournament(id);

  if (tournament) {
    res.status(200);
    res.send(tournament);
  } else {
    res.status(400);
    res.send({ code: 400, message: 'This tournament does not exist' });
  }
};
