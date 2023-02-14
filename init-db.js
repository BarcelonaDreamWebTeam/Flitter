// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos
const User = require('./models/User');
const Tweet = require('./models/Tweet')

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
  await initTweets();


  // desconectamos de la base de datos
  connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initUsers() {
  // borrar 
  const result = await User.deleteMany();
  console.log(`Eliminados ${result.deletedCount} users.`);

  // crear users
  const inserted = await User.insertMany([
    { email: "emily@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2", username: 'Emily', passwordResetToken: '', passwordResetExpires: '' },
    { email: "dani@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2", username: 'Dani', passwordResetToken: '', passwordResetExpires: ''},
    { email: "ewe@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2", username: 'Ewelina', passwordResetToken: '', passwordResetExpires: ''},
    { email: "nati@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2", username: 'Natalia', passwordResetToken: '', passwordResetExpires: '' },
    { email: "helen@gmail.com", password: "$2a$12$jMQX5Ll/2kL5Af.LsAEruuY02xfgODq3nyDwfQKDd2hi.EcKkj8D2", username: 'Helen', passwordResetToken: '', passwordResetExpires: ''},
  ]);
  console.log(`Creados ${inserted.length} users.`)
}

async function initTweets(){
  //borrar todos los documentos de la coleccion de anuncios
  const result= await Tweet.deleteMany();
  console.log(`Eliminados ${result.deletedCount} Tweets.  `);

  //crear tweets iniciales
  const inserted= await Tweet.insertMany([

      {
          tweet_id: 1,
          text: "Tal día como hoy, 4 de febrero de 1616, el gobernador Juan de Silva partió de Manila con una fuerza expedicionaria de 16 naves y 500 soldados para erradicar la piratería holandesa y de los moros filipinos que atacaban las rutas comerciales y puertos españoles de las Filipinas.",
          img: "shipsImage.jpg",
          author: "Guillermo Nicieza",
          user: "Guille_Nicieza",
          date: '2023-01-14T19:55:11+01:00',
          likes: 254,
          hashtags: [
              "history",
              "today"
          ]
      },
      
      {
          tweet_id: 2,
          text: "Hoy 4 de febrero es el Día Mundial contra el Cáncer, te invitamos a usar tus redes sociales para hablar de cómo prevenir esta enfermedad y el aumento de la calidad de vida de los pacientes. ",
          img: "UnivisionImage.jpg",
          author: "Univisión Washinton DC",
          user: "UnivisionDC",
          date: '2023-01-11T19:54:10+01:00',
          likes: 540,
          hashtags: [
              "PorUnosCuidadosMásJustos",  "Díamundialcontraelcáncer"
          ]
      },

      {
          tweet_id: 3,
          text: "El Pentágono descubre un segundo globo espía. El primero sobrevuela EEUU y el segundo América Latina. El Secretario de EEUU cancela su visita a China. ¿Debería el Presidente Petro seguir con su plan de visitar ese país? ",
          img: "NoticeImage.jpg",
          author: "Luis Carlos Vélez",
          user: "lcvelez",
          date: '2022-01-14T19:54:10+01:00',
          likes: 300,
          hashtags: [
              "pentagono",
              "space",
              "secret"
          ]
      },
      {
          tweet_id: 4,
          text: "Hay dos formas de comportarse frente a Chat GPT:1. Llorar porque te va a quitar tu trabajo 2. Usarlo como una herramienta para que te haga mas fácil el trabajo antes de que te lo quite. ",
          img: "chicoImage.jpg",
          author: "Juanjo",
          user: "juanjo_es1",
          date: '2023-02-14T19:54:10+01:00',
          likes: 50,
          hashtags: [
              "chatGPT",
              "TEC",
              "jobs, new"
          ]
      },
      {
          user: "EFEdeportes",
          tweet_id: 5,
          text: "El fútbol español da el último adiós a Marcos Alonso.\n\nEntre los asistentes al funeral en el tanatorio de Tres Cantos estuvo una delegación del Barcelona, que arropó a su jugador.\n\nRepresentantes del Atlético, Real Madrid y Sevilla, entre otros, también mostraron sus respetos.",
          likes: 15,
          img: "futbol.jpg",
          hashtags: [
              "futbol", 
              "deportes", 
              "españa"],
          date: '2023-01-14T19:54:10+01:00',
          author: "EFE Deportes",
          
      }
  ]);
  console.log(`Insertados ${inserted.length} Tweets` )
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
