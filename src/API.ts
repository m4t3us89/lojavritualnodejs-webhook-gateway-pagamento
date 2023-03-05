import express from 'express'
import axios from 'axios'
const app = express()

app.use(express.json());

app.post('/webhook-gateway-pagamento', async function (req, res) {


  
  try{
    const data = req.body


    switch(data['type']) {
      case "payment":

        await axios({
          url: 'https://www.uplifeoriginal.com.br/webhook-gateway-pagamento',
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