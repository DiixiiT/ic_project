const express = require('express')
const path=require('path')
const router = express.Router();
const bodyParser=require('body-parser')
const { error } = require('console')
const { endianness } = require('os');
const { join } = require('path');

const app = express()
app.set("view engine", "ejs");
app.set("views", __dirname);

app.use("/", router);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname,+'/public'))

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
})

router.get('/sign', function (req, res) {
    res.sendFile(path.join(__dirname,'sign.html'))
  })


app.post('/save',(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const data={
        SignEmail:email,
        Password:password
    }
    res.sendFile(path.join(__dirname,'login.html'))
    var mySql=require('mysql')
    var connection=mySql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })
    connection.connect();
    connection.query('INSERT INTO applications SET?',data,(error,results,fields)=>{
        if(error) throw error;
        console.log('succesful');
    })
    connection.end();
     
    console.log(data)
    console.log('Respose sign in')
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
})

app.get('/alogin',(req,res)=>{
    res.sendFile(path.join(__dirname,'alogin.html'))
})

app.use('/loginCheck',(req,res)=>{
    const SignEmail=req.body.email
    const Password=req.body.password
    const data2={
        SignEmail:SignEmail,
        Password:Password
    }
    var mySql=require('mysql')
    var connection=mySql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })
    connection.connect();
    connection.query('SELECT * FROM applications WHERE SignEmail=?',SignEmail,(error,results,fields)=>{
        if(error)throw error;
        else if(results.length==0)
        {
            res.send('Email not found')
         console.log('Email not found')
        }
        else if(results[0].Password==Password)
          {
            // res.sendFile(path.join(__dirname,'main.html'))
            res.render("main", { data: results });
            console.log(results)

          }
        else
        {
            res.send('Invalid password or email')
          console.log('invalid email and password')
        }
    })
    connection.end();
    console.log(data2);
    console.log('login')
})


app.get('/admin',(req,res)=>{
    var mysql=require("mysql")
    var connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })
    connection.connect()
    console.log('connected')
    connection.query("SELECT * FROM applications", function (err, result) {
        if (err) throw err;
        res.render("home", { data: result });
      });
      connection.end();
})


app.post('/Ladmin',(req,res)=>{
    const Aid=req.body.Aid
    const Password=req.body.password
    console.log(Aid)
    const data2={
        SignEmail:Aid,
        Password:Password
    }
    var mySql=require('mysql')
    var connection=mySql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })

    var connection1=mySql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })

    connection.connect();
    connection.query('SELECT * FROM admin WHERE Admin_id=?',Aid,(error,results,fields)=>{
        if(error)throw error;
        else if(results.length==0)
        {
            res.send('Email not found')
         console.log('Email not found')
        }
        else if(results[0].Password==Password)
          {
              connection1.connect();
               
            connection1.query("SELECT * FROM applications", function (err, result) {
                     if (err) throw err;
                     res.render("home", { data: result });
                     console.log('succesful');
                  });
                  connection1.end()    
          }
        else
        {
            res.send('Invalid password or email')
          console.log('invalid email and password')
        }
    })
    connection.end();
    console.log(data2);
    console.log('login')
    })
  
//delete data
app.get("/users/delete/(:id)",(req,res)=>{
    var did=req.params.id;
    var mysql=require("mysql")
    var connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })
    connection.connect();
    connection.query("DELETE FROM applications WHERE id=?",did,(err,result)=>{
    
    })
    connection.end();
    console.log('Deleted')
    res.redirect(req.get("referer"))
})

//accept
app.get("/user/edit/(:id)/(:Status)",(req,res)=>{
    var id=req.params.id;
    var sel=req.params.Status;
    if(sel==0||sel==5)
    {
        sel=1;
    }
    else
    {
        sel=0;
    }
    var mysql=require("mysql")
    var connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })
    connection.connect();
    let udata=[sel,id];
    connection.query("UPDATE applications SET Status=? WHERE id=?",udata,(err,res)=>{
        if(err) throw err;
        console.log('updated')
    })
    connection.end();
    res.redirect(req.get("referer"))

})


//Details to be displated in more.ejs
app.get('/details/(:id)',(req,res)=>{
    var id=req.params.id;
    var mysql=require('mysql')
    var connerction=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'

    })
    connerction.connect()
    connerction.query("SELECT * FROM applications WHERE id=?",id, function (err, result) {
        if (err) throw err;
        res.render("more", { data: result });
        console.log(result);
      });
      connerction.end();
})


app.get('/selected',(req,res)=>{
    var mysql=require('mysql')
    var connection= mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })
    connection.connect()
    
    connection.query('SELECT * FROM applications',(error,results,fields)=>{
        if(error) throw error;
        console.log(results)
        res.render("selectedApp",{data:results});
    })
        connection.query('SELECT * FROM mentors ,applications ',(error,results,fields)=>{
        if(error) throw error
        console.log(results)
    //     res.render("selectedApp",{data:results});
     })
    connection.end()
})


app.get('/mentorList',(req,res)=>{
    var mysql=require('mysql')
    var connection= mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'
    })
    connection.connect()
    connection.query('SELECT * FROM mentors',(error,results,fields)=>{
        if(error) throw error;
        console.log(results)
        res.render("mentor",{data:results});
    })
     connection.end()

})

app.get('/Mdetails/(:id)',(req,res)=>{
    var id=req.params.id;
    var mysql=require('mysql')
    var connerction=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ic1_db'

    })
    connerction.connect()
    connerction.query("SELECT * FROM mentors WHERE m_id=?",id, function (err, result) {
        if (err) throw err;
        res.render("mentorDetail", { data: result });
        console.log(result);
      });
      connerction.end();
})

var apply=require('./public/js/apply')
app.use('/form',apply);

 



 

 console.log('running')
app.listen(3000)