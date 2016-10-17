const thinky = require('../../lib/thinky');
const type = thinky.type;


const Document = thinky.createModel('Document', {
    id: type.string(),
    title: type.string().required(),
    body: type.string().required().default('# New Document'),
    username: type.string().required().default('Unknown')
});

module.exports = Document;