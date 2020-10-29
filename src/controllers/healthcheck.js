module.exports = {
  fetchHealthcheck(req, res) {
    res.send({ version: req.Config.version });
  }
};