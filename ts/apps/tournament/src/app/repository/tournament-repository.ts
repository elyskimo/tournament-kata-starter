import { Tournament, Participant } from '../interfaces';
import { TournamentModel } from '../models/tournament';
import { createItem } from '../middleware/db/createItem';

export class TournamentRepository {
  private tournaments = new Map<string, Tournament>();

  public async saveTournament(tournament: Tournament): Promise<boolean> {
    try {
      this.tournaments.set(tournament.id, tournament);
      await createItem(tournament, TournamentModel);
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  public getTournament(tournamentId: string): Tournament {
    return this.tournaments.get(tournamentId);
  }

  public getTournamentByName(tournamentName: string): Tournament {
    return Array.from(this.tournaments.values()).find((item: Tournament) => item.name === tournamentName);
  }

  public addParticipant(tournamentId: string, participant: Participant): void {
    this.tournaments.get(tournamentId).participants.push(participant);
  }

  public getParticipant(tournament: Tournament, participantName: string): Participant {
    return tournament.participants.find((item: Participant) => item.name === participantName);
  }
}
