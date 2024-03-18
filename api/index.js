const axios = require("axios");
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { loadPokemonsInDb, loadTypesInDb } = require('./src/helpers/helpersPokemons.js');
const PORT = 3001;

const startServer = async () => {
  try {
    await conn.sync({ alter: true });
    console.log('Database modeling ready');

    await loadPokemonsInDb();
    await loadTypesInDb();

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

// // Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
//   server.listen(3001, () => {
//     console.log("                               ,'\\");
//     console.log("    _.----.        ____         ,'  _\\   ___    ___     ____");
//     console.log("_,-'       `.     |    |  /`.   \\,-'    |   \\  /   |   |    \\  |`.");
//     console.log("\\      __    \\    '-.  | /   `.  ___    |    \\/    |   '-.   \\ |  |");
//     console.log(" \\.    \\ \\   |  __  |  |/    ,','_  `.  |          | __  |    \\|  |");
//     console.log("   \\    \\/   /,' _`.|      ,' / / / /   |          ,' _`.|     |  |");
//     console.log("    \\     ,-'/  /   \\    ,'   | \\/ / ,`.|         /  /   \\  |     |");
//     console.log("     \\    \\ |   \\_/  |   `-.  \\    `'  /|  |    ||   \\_/  | |\\    |");
//     console.log("      \\    \\ \\      /       `-.`.___,-' |  |\\  /| \\      /  | |   |");
//     console.log("       \\    \\ `.__,'|  |`-._    `|      |__| \\/ |  `.__,'|  | |   |");
//     console.log("        \\_.-'       |__|    `-._ |              '-.|     '-.| |   |");
//     console.log("                                `'                            '-._|");
//     console.log('Active Pokemon Server listening on port 3001'); // eslint-disable-line no-console
//     getPokemonPage(initialUrl);
//     console.log("pokemons cargdos correctamente")
//   });
// });
//                  ."-,.__
//                  `.     `.  ,
//               .--'  .._,'"-' `.
//              .    .'         `'
//              `.   /          ,'
//                `  '--.   ,-"'
//                 `"`   |  \
//                    -. \, |
//                     `--Y.'      ___.
//                          \     L._, \
//                _.,        `.   <  <\                _
//              ,' '           `, `.   | \            ( `
//           ../, `.            `  |    .\`.           \ \_
//          ,' ,..  .           _.,'    ||\l            )  '".
//         , ,'   \           ,'.-.`-._,'  |           .  _._`.
//       ,' /      \ \        `' ' `--/   | \          / /   ..\
//     .'  /        \ .         |\__ - _ ,'` `        / /     `.`.
//     |  '          ..         `-...-"  |  `-'      / /        . `.
//     | /           |L__           |    |          / /          `. `.
//    , /            .   .          |    |         / /             ` `
//   / /          ,. ,`._ `-_       |    |  _   ,-' /               ` \
//  / .           \"`_/. `-_ \_,.  ,'    +-' `-'  _,        ..,-.    \`.
// .  '         .-f    ,'   `    '.       \__.---'     _   .'   '     \ \
// ' /          `.'    l     .' /          \..      ,_|/   `.  ,'`     L`
// |'      _.-""` `.    \ _,'  `            \ `.___`.'"`-.  , |   |    | \
// ||    ,'      `. `.   '       _,...._        `  |    `/ '  |   '     .|
// ||  ,'          `. ;.,.---' ,'       `.   `.. `-'  .-' /_ .'    ;_   ||
// || '              V      / /           `   | `   ,'   ,' '.    !  `. ||
// ||/            _,-------7 '              . |  `-'    l         /    `||
// . |          ,' .-   ,' ||               | .-.        `.      .'     ||
//  `'        ,'    `".'    |               |    `.        '. -.'       `'
//           /      ,'      |               |,'    \-.._,.'/'
//           .     /        .               .       \    .''
//         .`.    |         `.             /         :_,'.'
//           \ `...\   _     ,'-.        .'         /_.-'
//            `-.__ `,  `'   .  _.>----''.  _  __  /
//                 .'        /"'          |  "'   '_
//                /_|.-'\ ,".             '.'`__'-( \
//                  / ,"'"\,'               `/  `-.|" 