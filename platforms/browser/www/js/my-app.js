// Initialize app
var myApp = new Framework7();
  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/login/',
        url: 'login.html',
      },
      {
        path: '/home/',
        url: 'home.html',
      },      
    ]
    // ... other parameters
  });





var mainView = app.views.create('.view-main');

function start_app(){
	if (localStorage.getItem("jwt_token") === null) {
	  //...
	   	return 'Notoken';
	}else{
		return 'token';
	}	
}

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e,page) {
    // Do something here when page loaded and initialized
    console.log(page);
    var user = start_app();
    if(user === 'token'){
		app.request.get('home.html', function (data) {
		  $$('.page').html(data);
		});
    }
    console.log(user);
})	

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="login"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);  
    
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="home"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);  
    
})




function login(){

  app.request.post('http://localhost/editor/workspace/wordpress/wp-content/plugins/bodukwpapi/', { username:'root', password: 'admin' }, function (data) {
    //$$('.login').html(data);
    console.log(data);
    localStorage.setItem("jwt_token", data);
  });

} 