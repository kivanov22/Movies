const routes = {
    'home': 'home-template',
    'login':'login-form-template',
    'register':'register-form-template',
    'add-movie':'add-movie-template',
    'details':'movie-details-template',
}

const router = async (path) => {
    console.log(path);
    
    let app =document.getElementById('app');
    let templateData =authService.getData();
    

  switch(path){
      case 'home':
          templateData.movies=await movieService.getAll();
          break;
     case 'logout':
         authService.logout();

         return navigate('home');
         default:
             break;
        
  } 


let templateId =routes[path];

let template =Handlebars.compile(document.getElementById(templateId).innerHTML);

app.innerHTML=template(templateData);

 
};

const navigate = (path) => {
    history.pushState({},'', path);//changes url to the selected login,logout,register when click
    
    router(path);
}

