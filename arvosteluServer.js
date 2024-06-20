const express = require('express');
const app = express();

let helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }))

app.use(express.urlencoded({ limit: '5mb', extended: true }));

const cors = require('cors');
app.use(cors());

app.use(express.json());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('arvostelut.db', (error) => {
    if (error) {
        console.log(error.message);
        return ({ message: 'Kantaa ei voida avata ' + error.message });
    }
});

app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Toimii' });
});

app.get('/arvostelu/all', (req, res) => {
    db.all('select * from arvostelu', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.get('/arvostelu/one/:id', (req, res) => {
    let id = req.params.id;

    db.get('select * from arvostelu where id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        // Jos haku ei tuottanut yhtään riviä
        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'Haettua arvostelua ei ole' });
        }

        return res.status(200).json(result);
    });
});

// Lisätään reitti hakua varten, joka ottaa vastaan hakuehdon ja arvon
app.get('/arvostelu/search/:hakuehto/:arvo', (req, res) => {
    const hakuehto = req.params.hakuehto;
    const arvo = req.params.arvo;

    let sql = 'SELECT * FROM arvostelu WHERE ';
    let params = [];

    // Lisätään hakuehto kyselyyn riippuen käyttäjän antamasta hakuehdosta
    if (hakuehto === 'nimi') {
        sql += 'nimi = ?';
    } else if (hakuehto === 'tekija') {
        sql += 'tekija = ?';
    } else if (hakuehto === 'julkaisuvuosi') {
        sql += 'julkaisuvuosi = ?';
    } else if (hakuehto === 'genre') {
        sql += 'genre = ?';
    }

    // Suorita kysely
    db.all(sql, [arvo], (error, result) => {
        if (error) {
            console.error(error.message);
            return res.status(400).json({ message: error.message });
        }
        return res.status(200).json(result);
    });
});

app.get('/arvostelu/kuvat', (req, res) => {
    db.all('select kuva from arvostelu where kuva IS NOT NULL', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.delete('/arvostelu/delete/:id', (req, res) => {
    let id = req.params.id;

    // Huomaa, että ei nuolinotaatiofunktioina kuten muissa kohdassa
    db.run('delete from arvostelu where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Ei poistettavaa');
            return res.status(404).json({ message: 'Ei poistettavaa arvostelua' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images'); // Mihin kansioon ladataan
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);  // Millä tiedostonimellä
    }
});

const upload = multer({ storage: storage })

app.post('/arvostelu/add', upload.single('kuva'), (req, res) => {
    let arvostelu = req.body;

    let kuvaNimi = null;
    if (req.file) {
        kuvaNimi = req.file.originalname;
    }

    db.run('insert into arvostelu (nimi,tekija,julkaisuvuosi,genre,kuva,tahdet) values (?, ?, ?, ?, ?, ?)',
        [arvostelu.nimi, arvostelu.tekija, arvostelu.julkaisuvuosi, arvostelu.genre, kuvaNimi, arvostelu.tahdet], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

app.get('/download/:nimi', (req, res) => {
    let file = './images/' + req.params.nimi;
    res.download(file);
});


// Lisätään muokkaustoiminto
app.put('/arvostelu/edit/:id', async (req, res) => {
    let id = req.params.id;
    const { nimi, tekija, julkaisuvuosi, genre, tahdet } = req.body;

    // Hakee nykyisen arvostelun kuvan
    db.get('SELECT kuva FROM arvostelu WHERE id = ?', [id], (error, row) => {
        if (error) {
            console.error('Virhe arvostelun hakemisessa:', error);
            return res.status(500).send('Virhe arvostelun hakemisessa');
        }
        if (!row) {
            return res.status(404).send('Arvostelua ei löydetty');
        }

        const kuva = row.kuva;

        // Päivitetään muut tiedot, mutta säilytetään kuva ennallaan
        db.run('UPDATE arvostelu SET nimi = ?, tekija = ?, julkaisuvuosi = ?, genre = ?, tahdet = ? WHERE id = ?',
            [nimi, tekija, julkaisuvuosi, genre, tahdet, id],
            function (error) {
                if (error) {
                    console.error('Virhe arvostelun päivittämisessä:', error);
                    return res.status(500).send('Virhe arvostelun päivittämisessä');
                }
                if (this.changes === 0) {
                    return res.status(404).send('Arvostelua ei löydetty');
                }
                return res.status(200).send('Arvostelu päivitetty onnistuneesti');
            }
        );
    });
});


app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Ei pyydettyä palvelua' });
});
