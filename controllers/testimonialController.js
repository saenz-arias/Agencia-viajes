import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    // Validar...
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre está vacío'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo está vacío'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje está vacío'});
    }
    
    if(errores.length > 0){

        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll()

        // Mostrar la vista de los errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            testimoniales: testimoniales
        })
    }else{
        // Almacenar en la base de datos
        try{
           await Testimonial.create({
               nombre, correo, mensaje
           });
           res.redirect('/testimoniales');
        }catch(error){
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}

