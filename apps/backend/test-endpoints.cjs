const http = require('http');

const makeRequest = (opts, data) => new Promise((resolve, reject) => {
  const req = http.request(opts, (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => { 
      try { resolve({status:res.statusCode, body:JSON.parse(body)})} 
      catch { resolve({status:res.statusCode, body:body})} 
    });
  });
  req.on('error', reject);
  if(data) req.write(JSON.stringify(data));
  req.end();
});

(async()=>{
  console.log('=== PRUEBA COMPLETA DE ENDPOINTS ===\n');
  
  // 1. Register
  console.log('1. Register:');
  const r = await makeRequest({
    hostname:'127.0.0.1', port:3000, 
    path:'/api/auth/register', method:'POST',
    headers:{'Content-Type':'application/json'}
  }, {email:'admin@test.com', password:'test123', nombre:'Admin', rol:'ADMINISTRADOR'});
  console.log('   Status:', r.status, '| ID:', r.body?.id || 'ERROR');
  
  // 2. Login
  console.log('\n2. Login:');
  const l = await makeRequest({
    hostname:'127.0.0.1', port:3000,
    path:'/api/auth/login', method:'POST',
    headers:{'Content-Type':'application/json'}
  }, {email:'admin@test.com', password:'test123'});
  console.log('   Status:', l.status, '| Token:', l.body?.token ? 'RECIBIDO' : 'ERROR');
  const token = l.body?.token;
  
  if(token){
    // 3. Get Members
    console.log('\n3. Get Members:');
    const m = await makeRequest({
      hostname:'127.0.0.1', port:3000,
      path:'/api/miembros', method:'GET',
      headers:{'Authorization':'Bearer '+token}
    }, null);
    console.log('   Status:', m.status, '| Count:', Array.isArray(m.body)?m.body.length:'N/A');
    
    // 4. Analysis
    console.log('\n4. Analysis:');
    const a = await makeRequest({
      hostname:'127.0.0.1', port:3000,
      path:'/api/analisis', method:'POST',
      headers:{'Authorization':'Bearer '+token, 'Content-Type':'application/json'}
    }, {});
    console.log('   Status:', a.status);
    console.log('   Response:', JSON.stringify(a.body, null, 2).substring(0, 2500));
  }
})().catch(e => console.error('Error:', e.message));