const thinky = require('../../lib/thinky');
const type = thinky.type;
const r = thinky.r;


const Upload = thinky.createModel('Upload', {
    id: type.string(),
    name: type.string().required(),
    createdAt: type.date().default(r.now()),
    path: type.string().required(),
    documentID: type.string().required()
});

module.exports = Upload;


const Document = require('./document');
Document.belongsTo(Document, 'document', 'documentID', 'id');