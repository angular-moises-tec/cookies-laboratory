const express = require('express')
const app = express()
const  cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cookieParser('rescret'))
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }))

app.get('/', function(req, res) {
    res.send({ respuesta: 'Cookie is set' });
});


//creo una cookie
app.get('/set', function(req, res) {
    res.cookie('cookie_name', 'cookie_value', {
   
  httpOnly: true
}).send({ respuesta: 'Cookie is set' });
});


//modificar cookie uno
app.get('/setmodificarcookieuno', function(req, res) {
    res.cookie('cookie_name', 'cookie', {
   
  httpOnly: true
}).send({ respuesta: 'Cookie is set' });
});

//una firmada
app.get('/setsigned', function(req, res) {
    res.cookie('signed', 'cookie_value', {
    signed:true,
    httpOnly: true
}).send({ respuesta: 'Cookie is set' });
});


//creo otra cookie, y es de sesion, se elimina al cerrar el navegador,
// ya que no le estableci tiempo
app.get('/setothercookiesession', function(req, res) {
    res.cookie('name', 'pepe').send({ respuesta: 'Cookie is set' });
});


// establece una cookie llamada 'miCookie' que expira en 30 segundos (30000 milisegundos)
app.get('/setcookieexpired', (req, res) => {
  res.cookie('miCookie', 'valorDeLaCookie', { maxAge: 30000, httpOnly: true });
  res.send('Cookie establecida y expira en 30 segundos');
});


//elimino una cookie llamada cookie_name
app.get('/clear', function(req, res) {
    res.clearCookie('cookie_name').send({ respuesta: 'Cookie is not ' });

});

//obtengo la cookie que llega del frontend y la imrpimo en consola
app.get('/leer',function(req, res){
    console.log(req.cookies);
     res.send({respuesta:'Cookie fue leida'});
});


//server escuchando
app.listen(process.env.PORT || 3000,()=>{
	console.log('programa almacen andando en el puerto '+ (process.env.PORT || 3000))
})