const thinky = require('../../lib/thinky');
const type = thinky.type;
const r = thinky.r;


const Document = thinky.createModel('Document', {
    id: type.string(),
    title: type.string().required(),
    body: type.string().required().default('# New Document'),
    username: type.string().required().default('Unknown'),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date()

});

Document.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = Document;

const Upload = require('./upload');
Document.hasMany(Upload, 'uploads', 'id', 'documentID');