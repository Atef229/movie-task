import './app/configs/database';
import params from './app/configs/params';
import http from 'http';
import App from './app/app';

const server = http.createServer(App());



server.listen(params.apiPort, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at http://localhost:${params.apiPort}`);
});

export default server;
