const argon2 = require('argon2');

module.exports = (database) => ({
  findAll: async () => {
    const [users] = await database.query('SELECT * FROM users');
    return users;
  },
  findOne: async (key, value) => {
    const [users] = await database.query('SELECT * FROM users WHERE ?? = ?', [
      key,
      value
    ]);
    return users[0];
  },
  create: async (user) => {
    const results = await database.query(
      `
        INSERT INTO users
          (username, email, contact, password, role, profile_pic_url)
        VALUES
          (?, ?, ?, ?, ?, ?);
      `,

      [
        user.username,
        user.email,
        user.contact,
        await argon2.hash(user.password),
        user.role,
        user.profile_pic_url
      ]
    );
    return results[0].insertId;
  },
  updateProfilePictureByUserId: async (userId, profilePicUrl) => {
    const results = await database.query(
      `
        UPDATE users
        SET profile_pic_url = ?
        WHERE userid = ?
      `,
      [profilePicUrl, userId]
    );
    return results[0].affectedRows;
  },

  updateOrCreateByUserid: async (userid, user) => {
    const results = await database.query(
      `
        INSERT INTO users
          (userid, username, email, contact, password, role, profile_pic_url)
        VALUES
          (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          username = VALUES(userid),
          username = VALUES(username),
          email = VALUES(email),
          contact = VALUES(contact),
          password = VALUES(password),
          role = VALUES(role),
          profile_pic_url = VALUES(profile_pic_url);
      `,
      [
        userid,
        user.username,
        user.email,
        user.contact,
        await argon2.hash(user.password),
        user.role,
        user.profile_pic_url,
        userid
      ]
    );
    return results[0].affectedRows;
  }
});
