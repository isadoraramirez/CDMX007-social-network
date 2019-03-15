    window.libreria.getID('vista').enrutar()
    .ruta('/', './vistas/inicio.html', null, null)
    .ruta('/crear-contacto', './vistas/contactos/crear.html', null, null)
    .ruta('/listar-contactos', 'vistas/contactos/listar.html', null, null)
    .ruta('/actualizar-contacto', 'vistas/contactos/actualizar.html', null, null);        

// window.libreria.getID('vista').enrutar().ruta('#/crear-contacto', './vistas/contactos/crear.html', null, null)