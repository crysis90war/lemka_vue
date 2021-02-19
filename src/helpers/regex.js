export const REGEX = {
    email: '/^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/',
    alpha: '/^[A-Za-z]+$/',
    alphaNum: '/^[0-9a-zA-Z]+$/',
    integer: '/^[-+]?[0-9]+$/',
    decimalPlusMinReq: '/[-+][0-9]+\\.[0-9]+$/', // Culture variante ".". Plus et moins requis
    decimalPlusMinOpt: '^[-+]?[0-9]+\\.[0-9]+$', // Culture séparateur ".". Plus et moins optionnel
    date: '/^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$/', //  dd/mm/yyyy or dd-mm-yyyy format
}