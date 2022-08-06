const argon2 = require('argon2');
const { isEmpty } = require('lodash');

const USER_SELECT = {
  userId: 'u.user_id',
  username: 'u.username',
  email: 'u.email',
  contact: 'u.contact',
  password: 'u.password',
  role: 'u.role',
  profilePicUrl: 'u.profile_pic_url',
  createdOn: 'u.created_on',
  lastModifiedOn: 'u.last_modified_on'
};

const UserModel = (database) => ({
  findAll: async (filters) => {
    const { page, limit, query, exclude } = filters;
    const [users] = await database.query(
      `
        SELECT
          ${Object.entries(USER_SELECT)
            .map(([key, value]) => {
              if (exclude.includes(key)) {
                return '';
              }
              return `${value} AS ${key}`;
            })
            .filter(Boolean)
            .join(', ')}
        FROM users AS u
        WHERE
          u.username REGEXP ?
          OR u.email REGEXP ?
        LIMIT ?
        OFFSET ?
      `,
      [query, query, limit, (page - 1) * limit]
    );
    return users;
  },
  findOne: async (key, value) => {
    const [users] = await database.query(
      `
      SELECT
        user_id AS userId,
        username,
        email,
        contact,
        password,
        role,
        profile_pic_url AS profilePicUrl,
        created_on AS createdOn,
        last_modified_on AS lastModifiedOn
      FROM users
      WHERE ?? = ?
    `,
      [key, value]
    );
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
        user.profilePicUrl
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
  updateOrCreateByUserid: async (userId, user) => {
    const results = await database.query(
      `
        INSERT INTO users
          (user_id, username, email, contact, password, role, profile_pic_url)
        VALUES
          (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          user_id = VALUES(user_id),
          username = VALUES(username),
          email = VALUES(email),
          contact = VALUES(contact),
          password = VALUES(password),
          role = VALUES(role),
          profile_pic_url = VALUES(profile_pic_url);
      `,
      [
        userId,
        user.username,
        user.email,
        user.contact,
        await argon2.hash(user.password),
        user.role,
        user.profilePicUrl,
        userId
      ]
    );
    return results[0].affectedRows;
  },
  patchByUserid: async (userId, user) => {
    if (isEmpty(user)) {
      return false;
    }
    if (user.password) {
      user.password = await argon2.hash(user.password);
    }
    const results = await database.query(
      `
        UPDATE users
        SET
        ${Object.keys(user)
          .map((key) => `${key} = ?`)
          .join(', ')}
        WHERE user_id = ?
      `,
      [...Object.values(user), userId]
    );
    return results[0].affectedRows;
  }
});

module.exports = { UserModel, USER_SELECT };
