## MQTT est un service de messagerie TCP/IP simple.
Les messages sont envoyés par des publieurs (les publishers) sur un canal (une chaîne d’information) appelé Topic. Ces messages peuvent être lus par les souscripteurs (les subscribers) qui surveillent certains Topics.
Un serveur (Broker) se charge de faire la liaison entre les publieurs et les souscripteurs.
On peut évidemment installer un Broker sur notre rasberryPi, par exemple Mosquitto.

## Mosquitto est le serveur MQTT (Broker).
A la différence d’un serveur avec une base de données relationnelle qui conserve les données d’une façon permanente, un Broker est surtout prévu pour mettre en relation des objets, les messages ne sont pas conservés sur la base (Sauf demande de messages persistants).
