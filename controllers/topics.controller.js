const { getAllTopics } = require('../models/topics.model');

exports.getTopics = (req, res) => {
  getAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
