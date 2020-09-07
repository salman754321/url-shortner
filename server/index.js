const express=require("express")
const cors= require("cors");
const morgan=require("morgan")
const helmet=require("helmet")
const {nanoid} = require("nanoid")
const yup = require("yup");
const  monk= require("monk");

require("dotenv").config();
const app=express();
const db=monk(process.env.MONGO_URI||"mongodb+srv://TestUser:TestUser1@cluster0-kp50x.gcp.mongodb.net/UrlShortner?retryWrites=true&w=majority");
const urls=db.get("urls");
urls.createIndex({"slug":1},{unique:true});


app.use(helmet())
app.use(morgan('tiny'));
app.use(cors())
 
app.use(express.json());
app.use(express.static('./public'))

const Schema=yup.object().shape({
    slug:yup.string().trim().matches(/[\w\-]/i),
    url:yup.string().trim().url().required(),
});

app.get('/:id',async(req,res)=>{
  const {id:slug}=req.params;
  try {
      const url= await urls.findOne({slug});
      if(url){
          res.redirect(url.url);
      }
      res.redirect(`/?error=${slug} not found`)
  } catch (error) {
    res.redirect(`/?error=Link not found`)
  }
    });

app.post('/url',async(req,res,next)=>{
   let {slug,url}=req.body;
   console.log(url)
   try {
      
       await Schema.validate({
           slug,
           url,
       });
       if(!slug){
        slug=nanoid(6);
    }
    slug=slug.toLowerCase();
const newUrl={
    url,
    slug
};

const created=await urls.insert(newUrl);
res.json(created);
console.log(created)
   } catch (error) {
       if(error.message.startsWith("E11000")){
           error.message="Slug Already in Use"
       }
       next(error)
   }
   });


   app.use((error,req,res,next)=>{
       if(error.status){
           res.status(error.status)
       }
       res.json({
           message:error.message,
           stack:process.env.NODE_ENV==="production" ? 'stack' :error.stack
       })
   })
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listning At Port ${port}`)
})
 