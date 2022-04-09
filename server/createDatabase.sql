CREATE TABLE users(
    id SERIAL primary key,
    firstname varchar NOT NULL,
    lastname varchar NOT NULL,
    password varchar NOT NULL,
    roles varchar NOT NULL,
    email varchar NOT NULL
);

CREATE TYPE "status" AS ENUM (
  'Completed', 'Pending', 'Failed'
);
CREATE TYPE "available" AS ENUM (
  'InStock', 'OutofStock'
);
CREATE TABLE blog(
    id SERIAL primary key,
    title varchar NOT NULL,
    user_id INTEGER REFERENCES users(id),
    description varchar NOT NULL,
    blog_content varchar NOT NULL
);

CREATE TABLE carts(
id SERIAL primary key,
created TIMESTAMP NOT NULL,
modified TIMESTAMP NOT NULL,
userid INTEGER REFERENCES users(id)
);

CREATE TABLE products(
    id SERIAL primary key,
     name varchar NOT NULL,
    price INTEGER NOT NULL,
    description varchar NOT NULL,
    quantity INTEGER NOT NULL,
    availability available not null,
    image_url varchar not null
)


CREATE TABLE cartitems(
    id SERIAL primary key,
    qty INTEGER NOT NULL,
    cartid INTEGER NOT NULL ,
    productid INTEGER NOT NULL,
    UNIQUE(cartid, productid)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    total INTEGER NOT NULL,
    status status NOT NULL,
    created TIMESTAMP NOT NULL,
    modified TIMESTAMP NOT NULL,
    userid INTEGER REFERENCES users(id)
);

CREATE TABLE orderitems(
    id SERIAL PRIMARY KEY,
    created TIMESTAMP NOT NULL,
    qty INTEGER NOT NULL,
    price INTEGER NOT NULL,
    name varchar NOT NULL,
    description varchar NOT NULL,
    orderid INTEGER REFERENCES orders(id),
    productid INTEGER REFERENCES products(id)
);