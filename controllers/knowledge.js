const Knowledge = {};
const moment = require('moment');
const r = require('../lib/thinky').r;

const renderError = require('../lib/renderError');
const Document = require('../models/knowledge/document');
const Upload = require('../models/knowledge/upload');

Knowledge.index = (req, res) => {
    Document.filter(r.row.hasFields('versionOf').not()).then((docs) => {

        docs = docs.sort(function (a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });

        return res.render('./knowledge/index', {docs, moment});
    }).catch(err => renderError(err, res));
};

Knowledge.show = (req, res) => {
    const id = req.params.id;
    Document.get(id).getJoin({uploads: true, versions: true}).then((doc) => {
        return res.render('./knowledge/show', {doc, moment});
    }).catch(err => renderError(err, res));
};

Knowledge.new = (req, res) => {
    return res.render('./knowledge/edit');
};

Knowledge.edit = (req, res) => {
    const id = req.params.id;
    Document.get(id).then((doc) => {
        return res.render('./knowledge/edit', {id, doc});
    });
};

Knowledge.upload = (req, res) => {

    const id = req.params.id;

    new Upload({
        name: req.file.originalname,
        path: req.file.path,
        documentID: id
    })
        .save()
        .then(saved => {
            return res.redirect(`.//knowledge/${id}`);
        })
        .catch(err => renderError(err, res));


};

Knowledge.download = (req, res) => {

    const id = req.params.id;

    Upload.get(id)
        .then(download => {
            return res.download(download.path, download.name);
        })
        .catch(err => renderError(err, res));
};

Knowledge.save = (req, res) => {

    const body = req.body.editor;
    const id = req.body.id;
    const title = req.body.title;
    const username = req.user.username || res.locals.signedInUser.username;

    console.log(body);

    if (id) {
        Document.get(id).then((doc) => {

            doc.title = title;
            doc.body = body;
            doc.username = username;
            doc.save().then((doc) => {
                return res.redirect(`./knowledge/${doc.id}`)
            })
                .catch(err => renderError(err, res));
        }).catch(err => renderError(err, res));
    } else {
        new Document({title, body, username}).save()
            .then((doc) => {
                return res.redirect(`.//knowledge/${doc.id}`)
            })
            .catch(err => renderError(err, res));
    }


};


module.exports = Knowledge;