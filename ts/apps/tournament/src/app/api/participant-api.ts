import { Request, Response } from 'express';
import { TournamentRepository } from '../repository/tournament-repository';
import { Participant } from './api-model';

const tournamentRepository = new TournamentRepository();

export const postParticipant = (req: Request, res: Response) => {
  const id = req.params['id'];
/*
  if (!Object.keys(req.body).length) {
    res.status(400);
    return res.send({ message: 'No data to set' });
  }*/
  if (!req.body.name?.length || !req.body.elo) {
    res.status(400);
    return res.send({ message: "can't add this participant, the name or the elo is empty" });
  }
  const participant: Participant = req.body;

  if (tournamentRepository.getTournament(id)) {
    tournamentRepository.addParticipation(id, participant);
    res.status(200);
    return res.send({ message: 'This participant was added successfully' });
  } else {
    res.status(404);
    return res.send({ message: 'This tournament does not exist' });
  }
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

export const getParticipants = (req: Request, res: Response) => {
  console.log("-----------------get participants",req.body)

  const tournamentId = req.params['id'];

  const tournament = tournamentRepository.getTournament(tournamentId);
  if (tournament) {
    res.status(200);
    res.send({ participants: tournament.participants});
  }else{
    res.status(400);
    res.send({message:"This tournament does not exist"});
  }

};
