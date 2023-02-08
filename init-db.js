// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos
const User = require('./models/User');

async function main() {

  // preguntar al usuario si está seguro
  const continuar = await preguntaSiNo('Estas seguro, seguro, seguro, que quieres borrar la base de datos? [n]')
  if (!continuar) {
    process.exit();
  }

  // conectar a la base de datos
  const connection = require('./lib/connectMongoose')

  // inicializar 
  await initUsers();

  // desconectamos de la base de datos
  connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initUsers() {
  // borrar 
  const result = await User.deleteMany();
  console.log(`Eliminados ${result.deletedCount} users.`);

  // crear 
  const inserted = await User.insertMany([
    { email: "emily@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2" },
    { email: "dani@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2" },
    { email: "ewe@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2" },
    { email: "nati@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2" },
    { email: "helen@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2" },
  ]);
  console.log(`Creados ${inserted.length} users.`)
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
