const bcrypt = require('bcryptjs');

// to hash + salt passwords in seed file
// bcrypt.hash('test-string', 12).then(hash => console.log({ hash }))

bcrypt.hash('ping-password', 12).then(hash => console.log({ hash }))