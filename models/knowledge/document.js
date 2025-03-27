const thinky = require("../../lib/thinky");
const type = thinky.type;
const r = thinky.r;

const Document = thinky.createModel("Document", {
  id: type.string(),
  title: type.string().required(),
  body: type.string().required().default("# New Document"),
  username: type.string().required().default("Unknown"),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date(),
  versionOf: type.string(),
  archived: type.boolean().default(false),
});

module.exports = Document;

Document.pre("save", function (next) {
  const self = this;

  if (self.id) {
    Document.get(self.id).then((oldDoc) => {
      new Document({
        title: oldDoc.title,
        body: oldDoc.body,
        versionOf: oldDoc.id,
      }).save();
    });
  }

  this.updatedAt = new Date();
  next();
});

const Upload = require("./upload");
Document.hasMany(Upload, "uploads", "id", "documentID");
Document.hasMany(Document, "versions", "id", "versionOf");
