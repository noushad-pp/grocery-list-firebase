const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
});

admin.initializeApp();

exports.getGroceryList = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
    return admin.database().ref('/list').orderByChild('id').once('value').then(snapshot => {
        console.log(snapshot.val());
        return response.send({
            data: snapshot.val(),
            success: true
        });
    });
});
