import * as mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phases: {
    type: [String],
    enum: ['SingleBracketElimination', 'SwissRound'],
  },
  participants: {
    type: [],
  },
});

export const TournamentModel = mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);
