module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send({ success: "true" });
  });

  app.post('/', function(req, res) {
    res.send(req.body);
  });
};
