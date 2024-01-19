exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.adherentBoard = (req, res) => {
    res.status(200).send("Adherent Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };