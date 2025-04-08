const express = require ('express')
const cors = require('cors')

const app = express();

//Esto solo deja entrar a los orígenes definidos en whitelist.
const whitelist = ['http://localhost:3000', 'https://tudominio.com'];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
 

app.use(cors(corsOptionsDelegate))
app.use(express.json());

let articles = [
    {
        title: 'Se ha ido la luz',
        content: 'esta noche ha habido una incidencia',
    },
    {
        title: 'Enedis al tanto',
        content: 'Los operarios estan trabajando en ello',
    }
]

app.listen(3000, ()=>{
    console.log ('Serveur lancé')
})

app.get('/', (req,res)=>{
    res.json(articles);
})