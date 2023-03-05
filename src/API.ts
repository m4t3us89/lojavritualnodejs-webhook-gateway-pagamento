import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import axios from 'axios'
import path from 'node:path';
const app = express()


app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')))


app.post('/webhook-gateway-pagamento', async function (req, res) {

  try{
    
    /*
    Lojas = [
      "Loja Up Life Oficial"
      ]
    */

    const {appKey, loja} = req.query
    if(!appKey || (appKey !== process.env.APP_KEY_NOTIFICATION) ) throw new Error('API KEY não informado ou incorreto.')

    
    const data = req.body


    switch(data['type']) {
      case "payment":

        await axios({
          url: `https://www.uplifeoriginal.com.br/webhook-gateway-pagamento?appKey=${appKey}`,
          method: 'post',
          data,
          headers:{
            'Content-Type' : 'application/json'
          }
        })
    
      
        break;
      default:
        return res.status(200).json({
          ok: true
        })
    }


    return res.status(200).json({
      ok: true
    })
  }catch(err : any){
    console.log('err', err.message)
    res.status(500).json({
      ok : false
    })
  }
})

app.listen(process.env.PORT || 3000)