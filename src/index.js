//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
import server from './server/index.js';

//TODO: add error handling
try{
    server.listen(3001,()=>{
        console.log('Server is running on port 3001');
    })
}catch(err){
    console.error(`server crash with error: ${err}`);
}
