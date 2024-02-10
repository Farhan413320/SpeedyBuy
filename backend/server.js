const app  = require('./app');
const dotenv = require('dotenv');

dotenv.config({path:'backend/config/config.env'});


const connectDatabase = require('./config/database');
connectDatabase();

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is working on http://127.0.0.1:${process.env.PORT}`);
})

///unhandle promise rejection....
process.on('unhandledRejection', (err)=>{
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to unhandled promise rejection`);

   server.close(()=>{
    process.exit(1);
   });
});