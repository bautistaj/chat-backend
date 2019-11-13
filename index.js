const express = require('express');
const app = express();

const { config } = require('./config/index');
const userApi = require('./routes/user');
const chatApi = require('./routes/chat');
const messageApi = require('./routes/message');
const authApi = require('./routes/auth');

const { logError, wrapError, errorHandler } = require('./util/middleware/errorHandler');
const notFoundHandler = require('./util/middleware/notFoundHandler');

//body parser
app.use(express.json());

//routes
authApi(app);
userApi(app);
chatApi(app);
messageApi(app);

//Not foun handler
app.use(notFoundHandler);

//Manejador de errores
app.use(logError);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function(){
  console.log(`Listening http://localhost:${config.port}`);
});
