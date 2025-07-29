import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueId: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
