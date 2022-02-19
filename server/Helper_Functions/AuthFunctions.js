const pool = require("../db");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENT_ID } = require("../config");
const { createCart, findOneByUserId } = require("./CartFunctions");
const hashedPassword = async (password, saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw createError("500", err);
  }
};

const verifyGoogleIdToken = async (token) => {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  return await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
};

const comparePasswords = async (password, hash) => {
  try {
    const matchFound = await bcrypt.compare(password, hash);
    return matchFound;
  } catch (err) {
    throw new Error("500", err);
  }
};

const findOneById = async (id) => {
  try {
    const user = await pool.query("SELECT *from users where  id=$1", [id]);
    if (user) {
      const cart = await findOneByUserId(user.rows[0].id);
      const value = {
        email: user.rows[0].email,
        id: user.rows[0].id,
        firstName: user.rows[0].firstname,
        lastName: user.rows[0].lastname,
        cart_id: cart.id,
      };
      return value;
    } else throw new Error(401, "Unauthorized");
  } catch (err) {
    throw createError(500, "Internal Server Error");
  }
};

const findOneByEmail = async (userEmail) => {
  try {
    const user = await pool.query("SELECT * from  users where email = $1", [
      userEmail,
    ]);

    return user.rows[0];
  } catch (err) {
    throw createError(500, "Internal Server Error");
  }
};

const authenticateUser = async (email, password) => {
  try {
    // Check if user exists
    const user = await findOneByEmail(email);

    // If no user found, reject
    if (!user) {
      throw createError(401, "Incorrect username or password");
    }
    // Check for matching passwords

    if (!(await comparePasswords(password, user.password))) {
      throw createError(401, "Incorrect username or password");
    } else {
      const cart = await findOneByUserId(user.id);
     
      return {
        email: user.email,
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        cartid: cart.id,
      };
    }
  } catch (err) {
    throw createError(500, err);
  }
};

const createUser = async (email, password, firstName, lastName) => {
  try {
    const user = await findOneByEmail(email);

    if (user.length !== 0) {
      throw createError(409, "Email already in use");
    }

    const hashpassword = await hashedPassword(password, 10);

    const roles = "admin";
    const addUser = await pool.query(
      "insert into users (email, password, firstname, lastname, roles) values($1, $2, $3, $4, $5) returning *",
      [email, hashpassword, firstName, lastName, roles]
    );
    if (addUser.rows !== undefined) {
      
      const cart = await createCart(addUser.rows[0].id);

      return {
        email: addUser.rows[0].email,
        id: addUser.rows[0].id,
        firstName: addUser.rows[0].firstname,
        lastName: addUser.rows[0].lastname,
        cart_id: cart.id,
      };
    } else {
      throw createError(401, "Unauthorized");
    }
  } catch (err) {
    throw createError(500, err);
  }
};

const googleLogin = async (token) => {
  try {
    const ticket = await verifyGoogleIdToken(token);
    const { name, family_name, email, picture, sub } = ticket.getPayload();

    const user = await findOneByEmail(email);
    const roles = "admin";
    if (!user?.google_id) {
      const user = await pool.query(
        `INSERT INTO users(google,firstname, lastname, email, roles) 
      VALUES($1, $2, $3, $4, $5) ON CONFLICT (email) 
      DO UPDATE SET google= $1 returning *`,
        [sub, name, family_name, email, roles]
      );
      const cart = await createCart(user.id);
    }
    const userData = await findOneByEmail(email);
    return {
      email: userData.email,
      id: userData.id,
      firstName: userData.firstname,
      lastName: userData.lastname,
      cart_id: cart.id,
    };
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = {
  authenticateUser,
  createUser,
  findOneByEmail,
  findOneById,
  googleLogin,
};
