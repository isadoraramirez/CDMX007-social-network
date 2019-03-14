(function(window,document){
    'use strict';
var inicio = function(){
    var libreria = {

    };
    return libreria;
}
if (typeof window.libreria === 'undefined'){
    window.libreria = inicio(); 
}else{
    console.log('Se está llamando la libreria nuevamente');
}
})(window,document);