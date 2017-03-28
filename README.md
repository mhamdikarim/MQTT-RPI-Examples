##MQTT est un service de messagerie TCP/IP simple
Les messages sont envoyés par des publieurs (les publishers) sur un canal (une chaîne d’information) appelé Topic. Ces messages peuvent être lus par les souscripteurs (les subscribers) qui surveillent certains Topics.
Un serveur (Broker) se charge de faire la liaison entre les publieurs et les souscripteurs.
On peut évidemment installer un Broker sur notre Framboise, par exemple Mosquitto.

## Mosquitto est le serveur MQTT (Broker).
A la différence d’un serveur avec une base de données relationnelle qui conserve les données d’une façon permanente, un Broker est surtout prévu pour mettre en relation des objets, les messages ne sont en général pas conservés sur la base (Sauf demande de messages persistants).

## On the UI front: 

## On the data-access front:
The web application model of client/server data access — based on an always-available Internet connection — is unsuitable for mobile applications. A mobile device can be disconnected from network access for a sustained period. Endless retries can cause app stalls and user frustration. Cloudant, with mobile support currently through the JavaScript PouchDB library, solves this problem.