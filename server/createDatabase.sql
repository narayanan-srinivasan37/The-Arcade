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

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Spider-Man (2018) No DLC',
        1200,
        'When a villain threatens New York City, Peter Parker and Spider-Man''s worlds collide. To save the city and those he loves, he must rise up and be greater.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/0711719416371_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'God Of War (2018) No DLC ',
        600,
        'Kratos returns for a bold new chapter in Sony Santa Monica''s savage action series.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/711719810919_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Horizon Zero Dawn: Complete Edition  ',
        450,
        'In an era where machines roam the land and mankind is no longer the dominant species, a young hunter named Aloy embarks on a journey to discover her destiny.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/711719959267_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Uncharted 4: A Thief''s End  ',
        600,
        'Several years after his last adventure, retired fortune hunter, Nathan Drake, is forced back into the world of thieves.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/711719455219_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Grand Theft Auto V (5) ',
        1500,
        'Los Santos - a sprawling sun-soaked metropolis full of self-help gurus, starlets, and fading celebrities, once the envy of the Western world, now struggling to stay afloat in an era of economic uncertainty and cheap reality TV.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/5026555416986_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Gran Turismo Sport (No DLC) ',
        500,
        'Discover the full throttle future of racing.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/711719828358_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Uncharted - The Nathan Drake Collection',
        800,
        'From the groundbreaking storytellers at Naughty Dog, comes the genre-defining epic that revolutionized adventure storytelling.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/0711719866039_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Days Gone (No DLC)',
        1000,
        'Step into the dirt flecked shoes of former outlaw biker Deacon St. John, a bounty hunter trying to find a reason to live in a land surrounded by death.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/711719983897_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Red Dead Redemption 2 (2 Disc) (No DLC)',
        1800,
        'America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Those who will not surrender or succumb are killed.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/8904171315258_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Ratchet & Clank (2016)',
        300,
        'Join everyones favourite Lombax and his robotic sidekick in a brand new game that retells the plucky pairs adrenaline charged origins story.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/0711719847731_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Uncharted: The Lost Legacy (No DLC)',
        900,
        'From the critically acclaimed developer behind hits such as The Last of Us and Uncharted 4: A Thief’s End, comes a thrilling new voyage of high-octane action and pulse-pounding peril.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/0711719846963_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Watch Dogs 2',
        600,
        'Explore a massive and dynamic open-world offering an incredible variety of gameplay possibilities. Hack your way through traffic while you engage in dangerous car chases through the winding streets of San Francisco, traverse the rooftops of the colorful & vibrant neighborhoods of Oakland, and infiltrate the cutting edge offices of Silicon Valley companies. There are many secrets to uncover in the birthplace of the tech revolution.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/3307215966655_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Last Of Us Part II (2)',
        1600,
        'Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming. Living amongst a thriving community of survivors has allowed them peace and stability, despite the constant threat of the infected and other, more desperate survivors.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/711719339700_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'FIFA 21',
        '1100',
        'Win as one in EA SPORTS FIFA 21, powered by Frostbite. Whether it''s on the streets or in the stadium, FIFA 21 has more ways to play than ever before.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/5030935124422_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Call of Duty: Infinite Warfare (No DLC)',
        '500',
        'Call of Duty: Infinite Warfare delivers something for every Call of Duty fan with three unique game modes: Campaign, Multiplayer, and Zombies. Delivering a rich and engaging narrative in a setting unlike anything to date in a Call of Duty game, the campaign is a return to the franchise’s gritty, military roots throughout new environments never before seen in the franchise.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/5030917197680_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Spider-Man: Miles Morales (No DLC)',
        2800,
        'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/711719818823_l.jpg'
    );

INSERT INTO
    products(
        name,
        price,
        description,
        quantity,
        availability,
        image_url
    )
VALUES (
        'Hitman 2',
        2000,
        'Make the world your weapon and improvise each assassination as Agent 47',
        50,
        'InStock',
        'https://in.static.webuy.com/product_images/Gaming/Playstation4%20Software/8904171316217_l.jpg'
    );

 SELECT u.id, u.total, json_agg(json_build_object('name',o.name,
'price', o.price,'quantity', o.qty,'description', o.description)) as orderItems from orders u
join orderitems o on u.id = o.orderid where o.userid = 1 group by u.id