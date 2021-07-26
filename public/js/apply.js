const express=require('express');
const app=express();
const path=require('path')
const router=express.Router();
const bodyParser=require('body-parser');
const { error } = require('console');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname,+'..'));
 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'../..'));

 

router.get('/(:id)',(req,res)=>{
      
     const id=req.params.id;
    
     res.render("bform", { data:id});
    //  console.log(data)
    // res.sendFile(path.join(__dirname,'../../application.html'));
})

router.get('/application/(:id)',(req,res)=>{
    const id=req.params.id;
    
     res.render("application", { data:id});
})


router.post('/apply/(:id)',(req,res)=>{
    const id=req.params.id;
    console.log('Application:)')
    const fname=req.body.Fname;
    const mname=req.body.Mname;
    const lname=req.body.Lname;
    const dob=req.body.DOB;
    const phno=req.body.PhNo;
    const edu=req.body.Edu;
    const email=req.body.Email;
    const college=req.body.College;
    const op=req.body.Op;
    const link=req.body.Link;
    const status=5;
    
    let applyData=[fname,mname,lname,dob,phno,edu,email,college,op,link,status,id]
    console.log(dob)
    var mysql=require('mysql');
    var connection=mysql.createConnection(
        {
            host:'localhost',
            user:'root',
            password:'',
            database:'ic1_db'
        }
    )
     
    connection.connect();
    connection.query('UPDATE applications SET First_Name=?,Middle_Name=?,Last_Name=?,DOB=?,PhNo=?,Education=?,Email=?,College=?,Op=?,Link=?,Status=? WHERE id=?',applyData,(error,results,fields)=>{
        if(error) throw error;
        console.log('succesful');
        res.send('Succesfull')
    })
    connection.end();
    
     
})

router.get('/status/(:id)',(req,res)=>{
    console.log('Running:)')
    var id=req.params.id;
    var mysql=require('mysql')
    var connection=mysql.createConnection({
        host:'localhost',
            user:'root',
            password:'',
            database:'ic1_db'
    })
    connection.connect()
    connection.query('SELECT Status FROM applications WHERE id=?',id,(error,results,fields)=>{
        if(error) throw error
        res.render("status", { data:results});
        console.log(results)
    })
    connection.end();
     
})


//..............................................................


// router.get("/admin",(req,res)=>{
//     var x=path.join(__dirname,'../..')
//     console.log(x)
//     var mysql=require("mysql")
//     var connection=mysql.createConnection({
//         host:'localhost',
//         user:'root',
//         password:'',
//         database:'ic1_db'
//     })
//     connection.connect()
//     console.log('connected')
//     connection.query("SELECT * FROM list", function (err, result) {
//         if (err) throw err;
//         res.render("home", { data: result });
//       });
//     })
  
// //delete data
// router.get("/users/delete/(:id)",(req,res)=>{
//     var did=req.params.id;
//     var mysql=require("mysql")
//     var connection=mysql.createConnection({
//         host:'localhost',
//         user:'root',
//         password:'',
//         database:'ic1_db'
//     })
//     connection.connect();
//     connection.query("DELETE FROM list WHERE id=?",did,(err,result)=>{
    
//     })
//     connection.end();
//     console.log('Deleted')
//     res.redirect(req.get("referer"))
// })

// //accept
// router.get("/user/edit/(:id)/(:s)",(req,res)=>{
//     var id=req.params.id;
//     var sel=req.params.s;
//     if(sel==0)
//     {
//         sel=1;
//     }
//     else
//     {
//         sel=0;
//     }
//     var mysql=require("mysql")
//     var connection=mysql.createConnection({
//         host:'localhost',
//         user:'root',
//         password:'',
//         database:'ic1_db'
//     })
//     connection.connect();
//     let udata=[sel,id];
//     connection.query("UPDATE list SET status=? WHERE id=?",udata,(err,res)=>{
//         if(err) throw err;
//         console.log('updated')
//     })
//     connection.end();
//     res.redirect(req.get("referer"))
    
// })





module.exports=router