var Knowledge = {};
var moment = require('moment');

const renderError = require('../lib/renderError');
const Document = require('../models/knowledge/document');

Knowledge.index = (req, res)=> {
    Document.run().then((docs)=> {

        docs = docs.sort(function (a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });

        return res.render('knowledge/index', {docs, moment});
    }).catch(err => renderError(err, res));
};

Knowledge.show = (req, res)=> {
    var id = req.params.id;
    Document.get(id).then((doc)=> {
        // console.log(doc);
        return res.render('knowledge/show', {doc});
    }).catch(err => renderError(err, res));
};

Knowledge.new = (req, res) => {
    return res.render('knowledge/edit');
};

Knowledge.edit = (req, res) => {
    var id = req.params.id;
    Document.get(id).then((doc)=> {
        return res.render('knowledge/edit', {id, doc});
    });
};

Knowledge.save = (req, res) => {

    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.content;
    var username = req.user.username;

    if (id) {
        Document.get(id).then((doc)=> {
            doc.title = title;
            doc.body = body;
            doc.username = username;
            doc.save().then((doc)=> {
                return res.redirect(`/knowledge/${doc.id}`)
            })
                .catch(err => renderError(err, res));
        }).catch(err => renderError(err, res));
    } else {
        new Document({title, body}).save()
            .then((doc)=> {
                return res.redirect(`/knowledge/${doc.id}`)
            })
            .catch(err => renderError(err, res));
    }


};


module.exports = Knowledge;