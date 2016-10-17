var Wiki = {};

const renderError = require('../lib/renderError');
const Document = require('../models/wiki/document');

Wiki.index = (req, res)=> {
    Document.run().then((docs)=> {
        return res.render('wiki/index', {docs});
    }).catch(err => renderError(err, res));
};

Wiki.show = (req, res)=> {
    var id = req.params.id;
    Document.get(id).then((doc)=> {
        // console.log(doc);
        return res.render('wiki/show', {doc});
    }).catch(err => renderError(err, res));
};

Wiki.new = (req, res) => {
    return res.render('wiki/edit');
};

Wiki.edit = (req, res) => {
    var id = req.params.id;
    Document.get(id).then((doc)=> {
        return res.render('wiki/edit', {id, doc});
    });
};

Wiki.save = (req, res) => {

    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.content;
    var username = req.signedInUser.username;

    if (id) {
        Document.get(id).then((doc)=> {
            doc.title = title;
            doc.body = body;
            doc.username = username;
            doc.save().then((doc)=> {
                return res.redirect(`/wiki/${doc.id}`)
            })
                .catch(err => renderError(err, res));
        }).catch(err => renderError(err, res));
    } else {
        new Document({title, body}).save()
            .then((doc)=> {
                return res.redirect(`/wiki/${doc.id}`)
            })
            .catch(err => renderError(err, res));
    }


};


module.exports = Wiki;