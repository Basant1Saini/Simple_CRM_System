import Contact from "../models/Contact.js";

export const getContacts = async (req, res, next) => {
  try {
    const { search, status, tag } = req.query;
    const filter = { owner: req.user._id };
    if (status) filter.status = status;
    if (tag) filter.tags = tag;
    if (search) filter.$text = { $search: search };

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, owner: req.user._id });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, owner: req.user._id });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};

export const addInteraction = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, owner: req.user._id });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    contact.interactions.push(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};
