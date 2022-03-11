import { Request, Response } from 'express';
import { TournamentPhase, TournamentPhaseType, tournamentRepository } from '../interfaces';

export const postPhase = (req: Request, res: Response) => {
  const id = req.params['id'];
  if (
    !req.body.type ||
    (req.body.type !== TournamentPhaseType.SingleBracketElimination && req.body.type !== TournamentPhaseType.SwissRound)
  ) {
    return res.status(400).send({ message: 'The type is not provided or is not known' });
  }
  const tournament = tournamentRepository.getTournament(id);
  const phase: TournamentPhase = req.body;

  if (tournament) {
  } else {
    return res.status(404).send({ message: 'This tournament does not exist' });
  }
};
