const express = require('express') // seria o que foi instalado com o npm install express --save
const app = express()
const port = 3000
const config = {
    host: 'db',  // nome do container q tem o mysql
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql') // seria o que foi instalado com npm install mysql --save
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Fred')` 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
connection.query(sql)
// connection.end()


app.get('/', (req,res) => {
    get_names(function(results){
        var names = '';
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].name);
            names += results[i].name + '; '
        }
    
        res.send(
            '<h1>Full Cycle!</h1>' +
            '<h2>- Lista de nomes cadastrados no banco de dados:</h2>' + 
            '<p>' + names + '</p>'
        )
     });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})

// ref.: https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node
function get_names(callback){
    var sql = "SELECT name from people";

    connection.query(sql, function(err, results){
          if (err){ 
            throw err;
          }
          return callback(results);
  })
}

