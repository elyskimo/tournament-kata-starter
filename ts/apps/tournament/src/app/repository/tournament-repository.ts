import { Tournament } from '../api/api-model';

export class TournamentRepository {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): void {
    this.tournaments.set(tournament.id, tournament);
  }

  public getTournament(tournamentId: string): Tournament {
    return this.tournaments.get(tournamentId);
  }

  public getTournamentByName(tournamentName: string): Tournament {
     return Array.from(this.tournaments.values()).filter((item: Tournament) => item.name === tournamentName)[0];
  }
}
