## On the UI front: 
Famo.us is a high-performance and flexible web UI layout and animation library that you can use to create a native-code-level user experience for your mobile apps.

## On the data-access front:
The web application model of client/server data access — based on an always-available Internet connection — is unsuitable for mobile applications. A mobile device can be disconnected from network access for a sustained period. Endless retries can cause app stalls and user frustration. Cloudant, with mobile support currently through the JavaScript PouchDB library, solves this problem.

~~~
npm install dotenv                               # Install ./node_modules/dotenv
echo "/.env"                       >> .gitignore # Do not track .env in the revision history
echo "cloudant_username=myaccount" >  .env       # Replace myaccount with your account name
echo "cloudant_password='secret'"  >> .env       # Replace secret with your password
~~~
