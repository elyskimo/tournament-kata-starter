import { Request, Response } from 'express';
import { Participant, tournamentRepository } from '../interfaces';

export const postParticipant = async (req: Request, res: Response) => {
  const id = req.params['id'];
  
  if (!req.body.name?.length || isNaN(req.body.elo)) {
    res.status(400);
    return res.send({ message: "can't add this participant, the name or the elo is empty" });
  }

  const tournament = await tournamentRepository.getTournament(id);
  const participant: Participant = req.body;
  if (tournament) {
    if (!tournamentRepository.getParticipant(tournament, participant.name)) {
      tournamentRepository.addParticipant(id, participant);
      res.status(201);
      return res.send({ message: 'This participant was added successfully' });
    } else {
      res.status(404);
      return res.send({ message: "can't create tournament, the participant already exist" });
    }
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
  } else {
    res.status(400);
    res.send({ message: 'This tournament does not exist' });
  }
};

export const getParticipants = async (req: Request, res: Response) => {

  const tournamentId = req.params['id'];
  const tournament = await tournamentRepository.getTournament(tournamentId);
  if (tournament) {
    res.status(200);
    res.send({ participants: tournament.participants});
  }else{
    res.status(404);
    res.send({message:"This tournament does not exist"});
  }

};
