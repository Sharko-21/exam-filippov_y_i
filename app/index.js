const { Client } = require('pg')
const client = new Client({
    user: 'filippov',
    host: 'ws-db',
    database: 'music_shop',
    password: 'qwerty1234',
    port: 5432,
});

return client.connect().then(() => {
    console.log("connected!");
}).catch(res => console.log(res));
