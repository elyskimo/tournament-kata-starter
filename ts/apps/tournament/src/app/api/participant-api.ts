import { Request, Response } from 'express';
import { TournamentRepository } from '../repository/tournament-repository';
import { ParticipantToAdd } from './api-model';
import { v4 as uuidv4 } from 'uuid';

const tournamentRepository = new TournamentRepository();

export const postParticipant = (req: Request, res: Response) => {

  if (!Object.keys(req.body).length) {
     res.status(400);
     return res.send({message: "can't create tournament, the name is missing"});
  }
  if (!req.body.name.length) {
    res.status(400);
    return res.send({message: "This participant already exist on this tournament. Can't add this participant"});
  }
  const participantToAdd: ParticipantToAdd = req.body;

  if (tournamentRepository.getTournament(participantToAdd.tournamentId)) {
    res.status(400);
    return res.send({message: "can't create tournament, the name already exist"});
  }

  const tournament = { id: uuidv4(), name: participantToAdd.name, phases: [], participants: [] };
  tournamentRepository.saveTournament(tournament);

  res.status(201);
  res.send({ id: tournament.id });
};

export const getParticipant = (req: Request, res: Response) => {
  const id = req.params['id'];

  const tournament = tournamentRepository.getTournament(id);
if (tournament) {
  res.status(200);
  res.send(tournament);
}else{
  res.status(400);
  res.send({message:"This tournament does not exist"});
}
  
};
