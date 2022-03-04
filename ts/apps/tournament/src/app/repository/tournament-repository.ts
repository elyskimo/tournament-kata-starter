import { Tournament, Participant } from '../api/api-model';

export class TournamentRepository {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): void {
    this.tournaments.set(tournament.id, tournament);
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
