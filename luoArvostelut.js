const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('arvostelut.db');

db.serialize(() => {

	let sql = "CREATE TABLE arvostelu (" +
		"id integer PRIMARY KEY NOT NULL, " +
		"nimi text NOT NULL, " +
		"tekija text NOT NULL, " +
		"julkaisuvuosi text NOT NULL, " +
		"genre text NOT NULL, " +
		"kuva text, " +
		"tahdet integer NOT NULL CHECK(tahdet >= 1 AND tahdet <= 5)" + 
		");";

	db.run(sql, (error) => {
		if (error) {
			return console.log(error.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, 'tahdet') " +
		" VALUES (1, 'Taipumaton', 'Kaija Koo', '2021', 'pop', 'kuva1.jpg', 5)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, 'tahdet') " +
		" VALUES (2, 'Neon Noir', 'VV', '2023', 'gothic rock', 'kuva2.jpg', 4)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, 'tahdet') " +
		" VALUES (3, 'Ei', 'Maija Vilkkumaa', '2003', 'rock', 'kuva3.jpg', 4)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

    sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, 'tahdet') " +
		" VALUES (4, 'Born in the U.S.A.', 'Bruce Springsteen', '1984', 'rock', 'kuva4.jpg', 3)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

    sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, 'tahdet') " +
		" VALUES (5, 'Plastic Hearts', 'Miley Cyrus', '2020', 'pop', 'kuva5.jpg', 3)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

    sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, 'tahdet') " +
		" VALUES (6, 'Merkittävät erot', 'Behm', '2023', 'pop', 'kuva6.jpg', 5)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

    sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, 'tahdet') " +
		" VALUES (7, 'Time Machine', 'ALMA', '2023', 'pop', 'kuva7.jpg', 4)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

    sql = "INSERT INTO `arvostelu` (`id`, `nimi`, `tekija`, `julkaisuvuosi`, `genre`, `kuva`, `tahdet`) " +
		" VALUES (8, 'Etsimässä rauhaa', 'Vesala', '2020', 'pop', 'kuva8.jpg', 5)";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});



	db.each("SELECT id, nimi, tahdet FROM arvostelu", function (err, row) {
		if (err) {
			return console.log(err.message);
		}
		console.log(row.id + ", " + row.nimi + ", " + row.tahdet);
	});

	db.close();
});
