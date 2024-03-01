const getMessage = (req, res) => {
  const newMessage = req.body;
};

const viewMessage = (req, res) => {
  res.send("APP IS RUNNING FINE");
};

module.exports = {
  getMessage,
  viewMessage,
};
