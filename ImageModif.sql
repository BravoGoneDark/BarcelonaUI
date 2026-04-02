-- ============================================================
-- Update ImageURL to use local public folder images
-- Run against barcadatabase (ensure it's the active schema)
-- ============================================================

SET SQL_SAFE_UPDATES = 0;

UPDATE PLAYER SET ImageURL = '/ter-stegen.jpg'        WHERE PlayerName = 'Marc-Andre ter Stegen';
UPDATE PLAYER SET ImageURL = '/pena.jpg'               WHERE PlayerName = 'Inaki Pena';
UPDATE PLAYER SET ImageURL = '/szczesny.webp'          WHERE PlayerName = 'Wojciech Szczesny';
UPDATE PLAYER SET ImageURL = '/astralaga.webp'         WHERE PlayerName = 'Ander Astralaga';
UPDATE PLAYER SET ImageURL = '/cubarsi.webp'           WHERE PlayerName = 'Pau Cubarsi';
UPDATE PLAYER SET ImageURL = '/balde.webp'             WHERE PlayerName = 'Alejandro Balde';
UPDATE PLAYER SET ImageURL = '/araujo.webp'            WHERE PlayerName = 'Ronald Araujo';
UPDATE PLAYER SET ImageURL = '/inigo-martinez.jpg'     WHERE PlayerName = 'Inigo Martinez';
UPDATE PLAYER SET ImageURL = '/kounde.webp'            WHERE PlayerName = 'Jules Kounde';
UPDATE PLAYER SET ImageURL = '/eric-garcia.webp'       WHERE PlayerName = 'Eric Garcia';
UPDATE PLAYER SET ImageURL = '/christensen.webp'       WHERE PlayerName = 'Andreas Christensen';
UPDATE PLAYER SET ImageURL = '/martin.webp'            WHERE PlayerName = 'Gerard Martin';
UPDATE PLAYER SET ImageURL = '/hector-fort.webp'       WHERE PlayerName = 'Hector Fort';
UPDATE PLAYER SET ImageURL = '/sergi-dominguez.webp'   WHERE PlayerName = 'Sergi Dominguez';
UPDATE PLAYER SET ImageURL = '/pedri.webp'             WHERE PlayerName = 'Pedri';
UPDATE PLAYER SET ImageURL = '/gavi.webp'              WHERE PlayerName = 'Gavi';
UPDATE PLAYER SET ImageURL = '/de-jong.webp'           WHERE PlayerName = 'Frenkie de Jong';
UPDATE PLAYER SET ImageURL = '/casado.webp'            WHERE PlayerName = 'Marc Casado';
UPDATE PLAYER SET ImageURL = '/fermin.webp'            WHERE PlayerName = 'Fermin Lopez';
UPDATE PLAYER SET ImageURL = '/olmo.webp'              WHERE PlayerName = 'Dani Olmo';
UPDATE PLAYER SET ImageURL = '/pablo-torre.jpg'        WHERE PlayerName = 'Pablo Torre';
UPDATE PLAYER SET ImageURL = '/bernal.webp'            WHERE PlayerName = 'Marc Bernal';
UPDATE PLAYER SET ImageURL = '/lewandowski.webp'       WHERE PlayerName = 'Robert Lewandowski';
UPDATE PLAYER SET ImageURL = '/raphinha.webp'          WHERE PlayerName = 'Raphinha';
UPDATE PLAYER SET ImageURL = '/yamal.webp'             WHERE PlayerName = 'Lamine Yamal';
UPDATE PLAYER SET ImageURL = '/ferran.webp'            WHERE PlayerName = 'Ferran Torres';
UPDATE PLAYER SET ImageURL = '/pau-victor.jpg'         WHERE PlayerName = 'Pau Victor';
UPDATE PLAYER SET ImageURL = '/fati.jpg'               WHERE PlayerName = 'Ansu Fati';