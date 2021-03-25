const apiKey = 'AIzaSyDktTs0LYQw10kXFNOsAZUWkBdkMuIVRSg';
const databaseUrl=`https://movies-40bc7-default-rtdb.firebaseio.com`;

const request= async(url , method,body)=>{
    let options = {
    method,
};

if (body) {
    Object.assign(options,{
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify(body)
    });
}

let response = await fetch(url,options);

let data =await response.json();

return data;
}

const authService = {
    async login(email,password){
       let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method:'POST',
    headers: {
        'content-type':'application/json'
    },
    body: JSON.stringify({
        email,
        password,
    })
       });

    let data =await response.json();

    localStorage.setItem('auth',JSON.stringify(data));

    return data;

    },

    getData(){
        try {
            let data = JSON.parse(localStorage.getItem('auth'));
            
            return {
            isAuthenticated: Boolean(data.idToken),
            email:data.email 
        };
        } catch (error) {
            return {
                isAuthenticated: false,
                email:'' 
            };
        }
        
    },
    logout(){
        localStorage.setItem('auth','');
    }
};

const movieService ={
    async add(movieData){
         let res = await request(`${databaseUrl}/movies.json`, 'POST',movieData);
         
         return res;
    },
    async getAll(){
        let res = await request(`${databaseUrl}/movies.json`, 'GET');
                                                     //({key,...res[key]})
        return Object.keys(res).map(key => Object.assign(res[key],{key})); 
    }
}