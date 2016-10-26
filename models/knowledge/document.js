const thinky = require('../../lib/thinky');
const type = thinky.type;
const r = thinky.r;


const Document = thinky.createModel('Document', {
    id: type.string(),
    title: type.string().required(),
    body: type.string().required().default('# New Document'),
    username: type.string().required().default('Unknown'),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(null)

});

Document.on("saving", function () {
    this.updatedAt = new Date();
});

module.exports = Document;