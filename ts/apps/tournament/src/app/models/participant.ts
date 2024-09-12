import * as mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  elo: {
    type: Number,
  },
});
module.exports = mongoose.models.Participant || mongoose.model('Participant', ParticipantSchema);
