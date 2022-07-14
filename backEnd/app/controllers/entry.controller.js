const Entry = require("../models/entry.model");

EntryController = {

  getAll: function(req, res){
    Entry.getAll(entries=>res.send(entries));
  },

  create: function(req, res){
    const {applicant, description, datetime_submitted, score} = req.body;
    console.log(req.body);
    if (!applicant || !description || !datetime_submitted){
      console.log(req.body);
      // console.log("123",req);
      res.status(400).send({message: "The fields applicant, description and datetime_submitted are all required to create an entry"});
      return;
    }
    const newEntry = new Entry(null, applicant, description, datetime_submitted, score);
    try{
      newEntry.create(result => res.send(result) );
    }
    catch(e){
      res.status(500).send({message: e});
    }

  },

  getById: function(req, res){
    const id = req.params.id;
    try{
      Entry.getById(id, function(entry){
        if (entry==null)
          res.status(404).send({message: `Entry with id ${id} does not exist`});
        else
          res.send(entry);
      });
    }
    catch(e){
      res.status(500).send({message: e});
    }
  },

  updateById: function(req, res){
    const id = req.params.id;
    const {applicant, description, datetime_submitted, score} = req.body;
    if (!applicant || !description || !datetime_submitted){
      res.status(400).send({message: "The fields applicant, description and datetime_submitted are all required to update an entry"});
    }
    const newEntry = new Entry(id, applicant, description, datetime_submitted, score);
    try{
      newEntry.update(function(results){
        if (results.affectedRows==0)
          res.status(404).send({message: `Entry with id ${id} does not exist`});
        else
          res.send(newEntry);
      });
    }
    catch(e){
      res.status(500).send({message: e});
    }

  },

  deleteById: function(req, res){
    const id = req.params.id;
    try{
      Entry.deleteById(id, function(results){
        if (results.affectedRows==0)
          res.status(404).send({message: `Entry with id ${id} does not exist`});
        else
          res.send({message: `Entry with id ${id} successfully deleted`});
      });
    }
    catch(e){
      res.status(500).send({message: e});
    }
  }

};

module.exports = EntryController;
