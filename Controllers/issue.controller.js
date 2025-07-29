import Issue from "../Models/issue.model.js";

export const createIssue = async (req, res) => {
  try {
    const { category, type, details, coordinates, address, image } = req.body;
    const userId = req.userInfo.id; // Get user ID from middleware

    const newIssue = new Issue({
      category,
      type,
      details,
      coordinates,
      address,
      image,
      createdBy: userId,
    });
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).json({ error: "Failed to create issue" });
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
};
