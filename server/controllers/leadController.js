import Lead from "../models/Lead.js";

export const getLeads = async (req, res, next) => {
  try {
    const { stage } = req.query;
    const filter = { owner: req.user._id };
    if (stage) filter.stage = stage;

    const leads = await Lead.find(filter).populate("contact", "name email company").sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    next(err);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id }).populate("contact");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    next(err);
  }
};

export const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create({ ...req.body, owner: req.user._id });
    res.status(201).json(lead);
  } catch (err) {
    next(err);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    next(err);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    next(err);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const [totalLeads, wonLeads, totalValue, stageBreakdown] = await Promise.all([
      Lead.countDocuments({ owner: ownerId }),
      Lead.countDocuments({ owner: ownerId, stage: "won" }),
      Lead.aggregate([
        { $match: { owner: ownerId } },
        { $group: { _id: null, total: { $sum: "$value" } } },
      ]),
      Lead.aggregate([
        { $match: { owner: ownerId } },
        { $group: { _id: "$stage", count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      totalLeads,
      wonLeads,
      totalPipelineValue: totalValue[0]?.total || 0,
      stageBreakdown,
    });
  } catch (err) {
    next(err);
  }
};
