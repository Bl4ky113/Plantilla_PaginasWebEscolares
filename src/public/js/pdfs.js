const inputArchivo = document.querySelector('#seleccionarArchivo')

inputArchivo.addEventListener('change', ()=>{
    let archivo = inputArchivo.value.split('.');
    let extension = archivo[archivo.length -1];

    if(extension.toLowerCase() == 'pdf'){
        console.log('archivo valido :D');
    }else{
        inputArchivo.value = '';
        console.log('Archivo invalido coño !!!');
    }
});