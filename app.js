import { app, port } from './server/server';

app.listen(port, () => {
    console.log(`Live on ${port}`);
});