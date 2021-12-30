const errMap = {
    401: "Vous devez d'abord vérifier votre identité.",
    403: "Vous n'êtes pas autorisé à effectuer cette opération.",
    404: "Impossible de trouver les ressources associées.",
    408: "La demande a expiré."
}

export default function (c) {
    return errMap[c] || (c < 500
        ? "Erreur de demande du clients, Vous devrez peut-être vérifier si l'entrée est incorrecte."
        : "Une exception s'est produite côté serveur, Des e-mails ont été envoyés pour informer l'administrateur système de traiter, Vous pouvez réessayer plus tard.")
}