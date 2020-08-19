const bcrypt = require('bcryptjs');

// to encrypt passwords with hash + salt as pseudonynms within the seed file
// bcrypt.hash('test-string', 12).then(hash => console.log({ hash }))

bcrypt.hash('ping-password', 12).then(hash => console.log({ hash }));