// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos
const Agente = require('./models/Anuncio');

async function main() {

  // preguntar al usuario si está seguro
  const continuar = await preguntaSiNo('Estas seguro, seguro, seguro, que quieres borrar la base de datos? [n]')
  if (!continuar) {
    process.exit();
  }

  // conectar a la base de datos
  const connection = require('./lib/connectMongoose')

  // inicializar 
  await initAnuncios();

  // desconectamos de la base de datos
  connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initAnuncios() {
  // borrar 
  const result = await Anuncio.deleteMany();
  console.log(`Eliminados ${result.deletedCount} anuncios.`);

  // crear 
  const inserted = await Anuncio.insertMany([
    { nombre: "bicileta", venta: false, precio: 230.15, foto: "bici.jpg", tags: ["lifestyle","bici"] },
    { nombre: "iPhone", venta: false, precio: 600, foto: "iphone.jpg", tags: ["mobile"]},
    { nombre: "tesla", venta: false, precio: 35000, foto: "tesla.jpg", tags: ["motor"] },
  ]);
  console.log(`Creados ${inserted.length} anuncios.`)
}

function preguntaSiNo(texto) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(texto, respuesta => {
      interface.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
}
