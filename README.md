## Conditions
Pour le développement, vous aurez besoin de "Node.js" et d'un package global "node", NPM ou Yarn, installé dans votre environnement ainsi qu'un éditeur de texte de votre choix.

### Node

- **Installation de "Node" sur Windows ou Mac OS :**

  La version minimale de "node" requise est la v14.x.

  Il suffit d'aller sur le site officiel de node js et de télécharger le programme d'installation.

  Assurez-vous également que `git` est disponible dans votre chemin, NPM pourrait en avoir besoin

  (Vous pouvez télécharger git sur la page web officielle)

- **Installation de "Node" sur Ubuntu :**
  
  ##### Installer NVM
  
  ```shell
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  ```
  
  ou
  
  ```shell
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  ```
        
  Pour vérifier que nvm est installé, tapez
  ```shell
  nvm --version
  0.38.0
  ```
  
  Puis exécutez la commande suivante
  ```shell
  nvm install 14.16.0
  ```
  
  Cette commande installe automatiquement Node.js ainsi que la dernière version de npm

- #### Autres systèmes d'exploitation

  Vous pouvez trouver plus d'informations sur l'installation sur le Node.js et le npm

#### Si l'installation a réussi, vous devriez pouvoir exécuter la commande suivante.

```shell
$ node --version
v14.16.0

$ npm --version
6.14.8
```


## Instructions de téléchargement et de configuration :

Clonez le projet. Cela téléchargera les fichiers du référentiel GitHub sur votre ordinateur local.

```shell
git clone https://github.com/crysis90war/lemka_vue.git
```

### Instructions frontend (Créer une application vue) :

---> Accédez au répertoire `lemka_vue/`

```shell
cd lemka_vue
```

---> Installer les dépendances du projet

```shell
npm install
```

---> Démarrez le serveur de développement sur `localhost:8080`

```shell
npm run start
```

---> Ouvrez votre navigateur et accédez à l'un ou l'autre `http://localhost:8080` or `http://127.0.0.1:8080`
