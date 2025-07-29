import Vote from "../Models/votes.model.js";

export const castVote = async (req, res) => {
  try {
    const { issueId } = req.body;
    const userId = req.userInfo.id;

    if (!issueId) {
      return res.status(400).json({ error: "Issue ID is required" });
    }

    const existingVote = await Vote.findOne({ userId, issueId });
    if (existingVote) {
      await Vote.deleteOne({ userId, issueId });
      return res.status(200).json({ message: "Vote removed successfully" });
    }

    const newVote = new Vote({ userId, issueId });
    await newVote.save();

    res.status(201).json({ message: "Vote cast successfully", vote: newVote });
  } catch (error) {
    res.status(500).json({ error: "Failed to cast vote" });
  }
};
