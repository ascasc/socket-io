const mysql = require('mysql');

const env = require('../../env');
const pool = mysql.createConnection(env.db);

let model ={};

model.GetAll_IOChatAPI=()=>{//GetAll IOChat API
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM chat', (err, results)=>{
            if(err) return reject(err);
            return resolve(results);
        });
    });
};

model.GetOne_IOChatAPI=(id)=>{//GetOne IOChat API
    return new Promise((resolve, reject)=>{

        pool.query('SELECT * FROM chat WHERE ?', id,(err, results)=>{
            if(err) return reject(err);
            return resolve(results);
        });
    });
};

model.Post_IOChatAPI=(sql)=>{//Post IOChat API
    return new Promise((resolve, reject)=>{
        
        pool.query('INSERT INTO chat SET ?', sql,(err, results)=>{
            if(err) return reject(err);
            return resolve(results.insertId);
        });
    });
};

model.Patch_IOChatAPI=(id ,sql)=>{//Patch IOChat API
    return new Promise((resolve, reject)=>{
        
        pool.query('UPDATE chat SET ? WHERE ?', [sql, id],(err, results)=>{
            if(err) return reject(err);
            return resolve(results);
        });
    });
};

model.Delete_IOChatAPI=(id)=>{//Patch IOChat API
    return new Promise((resolve, reject)=>{
        
        pool.query('DELETE FROM chat WHERE ?', [id],(err, results)=>{
            if(err) return reject(err);
            return resolve(results);
        });
    });
};


module.exports =model;