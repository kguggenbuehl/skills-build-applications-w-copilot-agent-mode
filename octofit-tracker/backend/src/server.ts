import './config/database.js';
import app from './app.js';

const port = Number(process.env.PORT) || 8000;

app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  console.log(`OctoFit backend listening on ${baseUrl}`);
});
