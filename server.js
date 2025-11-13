const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 4000;

const data = JSON.parse(fs.readFileSync('./adatok/rock_albums.json', 'utf8'));

app.use(cors());

app.get('/api/albums', (req,res) => {
    console.log(`[${new Date().toLocaleTimeString()}] /api/albums hívás érkezett.`);
    res.json({data});
});

app.get('/api/album/:id', (req,res) => {
    console.log(`[${new Date().toLocaleTimeString()}] /api/album/${albumId} hívás érkezett.`);

    const albumId = parseInt(req.params.id);
    const album = data.results.find(a => a.id === albumId);

    if (!album) {
        res.status(404).json({error: 'Album nem található'});
        console.log(`Album nem található: ID ${albumId}`);
    } else {
        res.json({results: album});
    }
});

app.get('/api/osszbevetel', (req,res) => {
    console.log(`[${new Date().toLocaleTimeString()}] /api/osszbevetel hívás érkezett.`);

    const eredmeny = data.results.map(album => ({
        nev: album.nev, 
        eloado: album.eloado,
        osszBevetel: album.osszbevetel
    }));

   res.json({results: eredmeny});
   console.log(eredmeny);
});

app.get('/api/hetvenes', (req,res) => {
    console.log(`[${new Date().toLocaleTimeString()}] /api/hetvenes érkezett.`);

    const eredmeny = data.results.filter(a => a.megjelenes_eve >= 1970 && a.megjelenes_eve < 1980).map(results => ({
        nev: album.nev, 
        eloado: album.eloado,
        megjelenes_eve: album.megjelenes_eve
    }));

    res.json({results: eredmeny});
});

app.get('/api/ketezres', (req,res) => {
    console.log(`[${new Date().toLocaleTimeString()}] /api/ketezres érkezett.`);

    const eredmeny = data.results.filter(a => a.megjelenes_eve >= 2000 && a.megjelenes_eve < 2000).map(results => ({
        nev: album.nev, 
        eladott_peldany: album.eladott_peldany,
    }));

    res.json({results: eredmeny});
});

app.get('/api/pinkfloyd', (req,res) => {
    console.log(`[${new Date().toLocaleTimeString()}] /api/pinkfloyd érkezett.`);

    let pinkFloydAlbumok = [];
    data.results.forEach(element => {
        if (element.eloado == "Pink Floyd") {
            pinkFloydAlbumok.push(element);
        }
    });

    res.json(pinkFloydAlbumok);
});

app.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port}/`);
});