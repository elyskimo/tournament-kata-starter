import { Tournament, Participant, TournamentMongo } from '../interfaces';
import { TournamentModel } from '../models/tournament';
import { createItem } from '../middleware/db/createItem';
import { getItem } from '../middleware/db/getItem';
import * as mongoose from "mongoose";
// TODO: remove tournamentRepository instance everywhere
export class TournamentRepository {
  private tournaments = new Map<string, Tournament>();

  public async saveTournament(tournament: Tournament): Promise<any> {
    try {
      this.tournaments.set(tournament.id, tournament);
      // const item = await createItem(tournament, TournamentModel);
      // console.log("created item",item);
      return await createItem(tournament, TournamentModel);
    } catch (err) {
      console.log(err);
    }
  }

  public async getTournament(tournamentId: string): Promise<Tournament> {
    // return this.tournaments.get(tournamentId);
    try {
      const response = await getItem(tournamentId, TournamentModel) as TournamentMongo;
      return {
        id: new mongoose.Types.ObjectId(response._id).toString(),
        name: response.name,
        participants: response.participants
      } as Tournament;
    } catch (err) {
      console.log(err);
    }
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
