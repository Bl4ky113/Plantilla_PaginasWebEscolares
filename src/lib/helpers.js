
function validarSimbolosString (string){
    if(string.indexOf('!') > 0 ||
    string.indexOf('"') > 0 ||
    string.indexOf('#') > 0 ||
    string.indexOf('$') > 0 ||
    string.indexOf('%') > 0 ||
    string.indexOf('&') > 0 ||
    string.indexOf('/') > 0 ||
    string.indexOf('(') > 0 ||
    string.indexOf(')') > 0 ||
    string.indexOf('=') > 0 ||
    string.indexOf('?') > 0 ||
    string.indexOf('¡') > 0 ||
    string.indexOf("'") > 0 ||
    string.indexOf('¿') > 0 ||
    string.indexOf('|') > 0 ||
    string.indexOf('+') > 0 ||
    string.indexOf('*') > 0 ||
    string.indexOf('}') > 0 ||
    string.indexOf('{') > 0 ||
    string.indexOf('`') > 0 ||
    string.indexOf('>') > 0 ||
    string.indexOf('<') > 0 ){
        return false;
    }else{
        return true;
    }
}

function validarEmail (email){ 
if(email.indexOf(".") > 0 && email.indexOf("@")){
    return true; //le dejo la cosa esta abierta pa que pueda programar, ahora si byee
}else{
    return false;
}
};

module.exports = {
    validarSimbolosString,
    validarEmail
}