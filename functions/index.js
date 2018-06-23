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

exports.updateGroceryList = functions.https.onRequest((request, response) => {
    cors(request, response, () => { });
    const data = request.body;
    console.log(data);
    if (!data || (data && !data.item_name)) {
        return response.send(400, {
            data: "Invalid params",
            success: false
        });
    } else {
        return admin.database().ref('/list').child(data.item_name).update({
            name: data.item_name,
            links: data.links
        }, (error) => {
            if (error) {
                return response.send(400, {
                    data: error,
                    success: false
                });
            } else {
                return response.send({
                    data: "Success",
                    success: true
                });
            }
        });
    }
});
