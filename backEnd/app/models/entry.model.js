const db = require("./db");

function Entry(id, applicant, description, datetime_submitted, score){
    this.id = id;
    this.applicant = applicant;
    this.description = description;
    this.datetime_submitted = datetime_submitted;
    this.score = score;

    this.create = function(callback){
      db.query("INSERT INTO entries SET applicant=?, description=?, datetime_submitted=?, score=?",
            [this.applicant, this.description, this.datetime_submitted, this.score],
            (error, results) => {
              if (error) throw error;
              this.id = results.insertId;
              callback(this);
            }
      );
    };

    this.update = function(callback){
      db.query("UPDATE entries SET applicant=?, description=?, datetime_submitted=?, score=? WHERE id=?",
            [this.applicant, this.description, this.datetime_submitted, this.score, this.id],
            (error, results) => {
              if (error) throw error;
              callback(results);
            }
      );
    };

}

Entry.getById = function(id, callback){
  db.query("SELECT * FROM entries WHERE id=?",
        [id],
        (error, results) => {
          if (error) throw error;
          if (results.length==0)
            callback(null);
          else{
            const {applicant, description, datetime_submitted, score} = results[0];
            const entry = new Entry(id, applicant, description, datetime_submitted, score);
            callback(entry);
          }
        }
  );
}

Entry.deleteById = function(id, callback){
  db.query("DELETE FROM entries WHERE id=?",
        [id],
        (error, results) => {
          if (error) throw error;
          callback(results);
        }
  );
}

Entry.getAll = function(callback){
  db.query("SELECT * FROM entries",
        (error, results) => {
          if (error) throw error;
          const entries = results.map(entryData=>new Entry(entryData.id, entryData.applicant, entryData.description, entryData.datetime_submitted, entryData.score));
          callback(entries);
        }
  );
}


module.exports = Entry;
