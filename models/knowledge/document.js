const thinky = require('../../lib/thinky');
const type = thinky.type;
const r = thinky.r;


const Document = thinky.createModel('Document', {
    id: type.string(),
    title: type.string().required(),
    body: type.string().required().default('# New Document'),
    username: type.string().required().default('Unknown'),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    versionOf: type.string()
});

module.exports = Document;

Document.pre('save', function (next) {
    const self = this;
    //TODO if isn't new!

    if (self.createdAt) {
        new Document({
            title: self.title, body: self.body, versionOf: self.id
        }).save();
    }

    // .then(backupDoc => {
    // })
    // .catch(err => {
    // });

    this.updatedAt = new Date();
    next();
});

const Upload = require('./upload');
Document.hasMany(Upload, 'uploads', 'id', 'documentID');
Document.hasMany(Document, 'versions', 'id', 'versionOf');