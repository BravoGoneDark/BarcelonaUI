DROP TABLE IF EXISTS PLAYER;
DROP TABLE IF EXISTS MATCHES;
DROP TABLE IF EXISTS COMPETITION;
DROP TABLE IF EXISTS STATS;

CREATE TABLE STATS (
    StatsID INT PRIMARY KEY AUTO_INCREMENT,
    Goals INT,
    Assists INT,
    AvgRating DECIMAL(4,2),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE COMPETITION (
    CompetitionID INT PRIMARY KEY AUTO_INCREMENT,
    CompName VARCHAR(100),
    Season VARCHAR(20),
    Country VARCHAR(100),
    CompType VARCHAR(50),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MATCHES (
    MatchID INT PRIMARY KEY AUTO_INCREMENT,
    MatchDate DATE,
    Opponent VARCHAR(100),
    GoalsFor INT,
    GoalsAgainst INT,
    Result VARCHAR(10),
    Venue VARCHAR(10),
    CompetitionID INT,
    StatsID INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CompetitionID) REFERENCES COMPETITION(CompetitionID),
    FOREIGN KEY (StatsID) REFERENCES STATS(StatsID)
);

CREATE TABLE PLAYER (
    PlayerID INT PRIMARY KEY AUTO_INCREMENT,
    PlayerName VARCHAR(100),
    Age INT,
    Skill INT,
    Position VARCHAR(50),
    Nationality VARCHAR(100),
    JerseyNumber INT,
    StatsID INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (StatsID) REFERENCES STATS(StatsID)
);

INSERT INTO STATS (Goals, Assists, AvgRating) VALUES
(42, 17, 9.20),
(17, 14, 8.80),
(6, 8, 8.50),
(4, 3, 7.90),
(0, 0, 7.50),
(34, 22, 8.70),
(11, 6, 7.80),
(0, 1, 7.10),
(4, 5, 7.80),
(2, 2, 7.40),
(1, 4, 7.60),
(2, 4, 7.50),
(3, 3, 7.80),
(8, 7, 7.70),
(1, 3, 7.50),
(2, 2, 7.30),
(18, 11, 8.10),
(0, 0, 6.90),
(5, 3, 7.50),
(1, 0, 7.00),
(0, 0, 7.20),
(2, 3, 7.60),
(4, 3, 7.50),
(7, 4, 7.80),
(0, 2, 7.20),
(0, 0, 6.80),
(0, 0, 6.90),
(0, 0, 6.70);

INSERT INTO COMPETITION (CompName, Season, Country, CompType) VALUES
('La Liga', '2024-25', 'Spain', 'League'),
('UEFA Champions League', '2024-25', 'Europe', 'Knockout'),
('Copa del Rey', '2024-25', 'Spain', 'Knockout'),
('Supercopa de Espana', '2024-25', 'Spain', 'Final');

INSERT INTO MATCHES (MatchDate, Opponent, GoalsFor, GoalsAgainst, Result, Venue, CompetitionID, StatsID) VALUES
('2024-08-17', 'Valencia CF', 2, 1, 'Win', 'Away', 1, 6),
('2024-08-24', 'Athletic Bilbao', 2, 1, 'Win', 'Home', 1, 2),
('2024-08-27', 'Rayo Vallecano', 2, 1, 'Win', 'Away', 1, 3),
('2024-08-31', 'Real Valladolid', 7, 0, 'Win', 'Home', 1, 1),
('2024-09-15', 'Girona', 4, 1, 'Win', 'Away', 1, 6),
('2024-09-22', 'Villarreal', 5, 1, 'Win', 'Away', 1, 6),
('2024-09-25', 'Getafe', 1, 0, 'Win', 'Home', 1, 1),
('2024-09-28', 'Osasuna', 2, 4, 'Loss', 'Away', 1, 2),
('2024-10-06', 'Alaves', 3, 0, 'Win', 'Away', 1, 6),
('2024-10-20', 'Sevilla', 5, 1, 'Win', 'Home', 1, 6),
('2024-10-26', 'Real Madrid', 4, 0, 'Win', 'Away', 1, 1),
('2024-11-03', 'Espanyol', 3, 1, 'Win', 'Home', 1, 7),
('2024-11-10', 'Real Sociedad', 0, 1, 'Loss', 'Away', 1, 3),
('2024-11-23', 'Celta Vigo', 2, 2, 'Draw', 'Away', 1, 12),
('2024-11-30', 'Las Palmas', 1, 2, 'Loss', 'Home', 1, 3),
('2024-12-03', 'Mallorca', 5, 1, 'Win', 'Away', 1, 6),
('2024-12-07', 'Real Betis', 2, 2, 'Draw', 'Away', 1, 12),
('2024-12-15', 'Leganes', 0, 1, 'Loss', 'Home', 1, 8),
('2024-12-21', 'Atletico Madrid', 1, 2, 'Loss', 'Home', 1, 5),
('2025-01-18', 'Getafe', 1, 1, 'Draw', 'Away', 1, 14),
('2025-01-26', 'Valencia CF', 7, 1, 'Win', 'Home', 1, 6),
('2025-02-02', 'Alaves', 1, 0, 'Win', 'Home', 1, 1),
('2025-02-09', 'Sevilla', 4, 1, 'Win', 'Away', 1, 6),
('2025-02-16', 'Real Valladolid', 7, 0, 'Win', 'Away', 1, 1),
('2025-02-22', 'Rayo Vallecano', 1, 0, 'Win', 'Home', 1, 1),
('2025-03-08', 'Atletico Madrid', 1, 0, 'Win', 'Away', 1, 1),
('2025-03-16', 'Osasuna', 4, 0, 'Win', 'Home', 1, 6),
('2025-04-05', 'Celta Vigo', 3, 2, 'Win', 'Home', 1, 17),
('2025-04-12', 'Mallorca', 3, 1, 'Win', 'Home', 1, 6),
('2025-04-19', 'Girona', 2, 0, 'Win', 'Home', 1, 3),
('2025-04-27', 'Real Madrid', 4, 3, 'Win', 'Home', 1, 1),
('2025-05-04', 'Real Sociedad', 3, 1, 'Win', 'Home', 1, 6),
('2025-05-11', 'Espanyol', 2, 1, 'Win', 'Away', 1, 6),
('2025-05-14', 'Villarreal', 2, 3, 'Loss', 'Home', 1, 7),
('2025-05-18', 'Real Betis', 4, 1, 'Win', 'Away', 1, 6),
('2025-05-22', 'Las Palmas', 5, 1, 'Win', 'Away', 1, 6),
('2025-05-25', 'Leganes', 3, 1, 'Win', 'Home', 1, 1),
('2025-05-25', 'Athletic Bilbao', 3, 0, 'Win', 'Away', 1, 1);

INSERT INTO MATCHES (MatchDate, Opponent, GoalsFor, GoalsAgainst, Result, Venue, CompetitionID, StatsID) VALUES
('2024-09-19', 'Monaco', 1, 2, 'Loss', 'Away', 2, 5),
('2024-10-01', 'Young Boys', 5, 0, 'Win', 'Home', 2, 6),
('2024-10-23', 'Bayern Munich', 4, 1, 'Win', 'Home', 2, 6),
('2024-11-06', 'Red Star Belgrade', 5, 2, 'Win', 'Away', 2, 6),
('2024-11-26', 'Brest', 3, 0, 'Win', 'Home', 2, 6),
('2024-12-11', 'Borussia Dortmund', 3, 2, 'Win', 'Away', 2, 2),
('2025-01-21', 'Benfica', 5, 4, 'Win', 'Away', 2, 1),
('2025-01-29', 'Atalanta', 2, 2, 'Draw', 'Home', 2, 12),
('2025-03-05', 'Benfica', 1, 0, 'Win', 'Away', 2, 2),
('2025-03-11', 'Benfica', 3, 1, 'Win', 'Home', 2, 6),
('2025-04-09', 'Borussia Dortmund', 4, 0, 'Win', 'Home', 2, 6),
('2025-04-15', 'Borussia Dortmund', 1, 3, 'Loss', 'Away', 2, 7),
('2025-04-30', 'Inter Milan', 3, 3, 'Draw', 'Home', 2, 1),
('2025-05-06', 'Inter Milan', 3, 4, 'Loss', 'Away', 2, 6);

INSERT INTO MATCHES (MatchDate, Opponent, GoalsFor, GoalsAgainst, Result, Venue, CompetitionID, StatsID) VALUES
('2025-01-04', 'Barbastro', 4, 0, 'Win', 'Away', 3, 14),
('2025-01-15', 'Real Betis', 5, 1, 'Win', 'Home', 3, 6),
('2025-02-06', 'Valencia CF', 5, 0, 'Win', 'Away', 3, 6),
('2025-02-25', 'Atletico Madrid', 2, 1, 'Win', 'Home', 3, 17),
('2025-03-05', 'Atletico Madrid', 1, 0, 'Win', 'Away', 3, 3),
('2025-04-26', 'Real Madrid', 3, 2, 'Win', 'Neutral', 3, 6);

INSERT INTO MATCHES (MatchDate, Opponent, GoalsFor, GoalsAgainst, Result, Venue, CompetitionID, StatsID) VALUES
('2025-01-09', 'Athletic Bilbao', 2, 0, 'Win', 'Neutral', 4, 6),
('2025-01-12', 'Real Madrid', 5, 2, 'Win', 'Neutral', 4, 1);

INSERT INTO PLAYER (PlayerName, Age, Skill, Position, Nationality, JerseyNumber, StatsID) VALUES
('Marc-Andre ter Stegen', 32, 88, 'Goalkeeper', 'Germany', 1, 5),
('Inaki Pena', 25, 76, 'Goalkeeper', 'Spain', 13, 8),
('Wojciech Szczesny', 34, 83, 'Goalkeeper', 'Poland', 25, 21),
('Ander Astralaga', 20, 68, 'Goalkeeper', 'Spain', 26, 27),
('Pau Cubarsi', 17, 82, 'Defender', 'Spain', 2, 4),
('Alejandro Balde', 21, 82, 'Defender', 'Spain', 3, 11),
('Ronald Araujo', 25, 84, 'Defender', 'Uruguay', 4, 10),
('Inigo Martinez', 33, 80, 'Defender', 'Spain', 5, 22),
('Jules Kounde', 26, 85, 'Defender', 'France', 23, 9),
('Eric Garcia', 23, 78, 'Defender', 'Spain', 24, 19),
('Andreas Christensen', 28, 82, 'Defender', 'Denmark', 15, 16),
('Gerard Martin', 23, 74, 'Defender', 'Spain', 35, 25),
('Hector Fort', 18, 74, 'Defender', 'Spain', 32, 20),
('Sergi Dominguez', 20, 67, 'Defender', 'Spain', 36, 28),
('Pedri', 22, 90, 'Midfielder', 'Spain', 8, 3),
('Gavi', 20, 87, 'Midfielder', 'Spain', 6, 13),
('Frenkie de Jong', 27, 86, 'Midfielder', 'Netherlands', 21, 12),
('Marc Casado', 21, 79, 'Midfielder', 'Spain', 17, 15),
('Fermin Lopez', 21, 80, 'Midfielder', 'Spain', 16, 14),
('Dani Olmo', 26, 84, 'Midfielder', 'Spain', 20, 7),
('Pablo Torre', 22, 78, 'Midfielder', 'Spain', 14, 23),
('Marc Bernal', 17, 75, 'Midfielder', 'Spain', 28, 26),
('Robert Lewandowski', 36, 89, 'Forward', 'Poland', 9, 1),
('Raphinha', 28, 88, 'Forward', 'Brazil', 11, 6),
('Lamine Yamal', 17, 88, 'Forward', 'Spain', 19, 2),
('Ferran Torres', 24, 82, 'Forward', 'Spain', 7, 17),
('Pau Victor', 23, 79, 'Forward', 'Spain', 18, 24),
('Ansu Fati', 22, 81, 'Forward', 'Spain', 10, 18);

DROP TRIGGER IF EXISTS before_match_insert;

DELIMITER $$
CREATE TRIGGER before_match_insert
BEFORE INSERT ON MATCHES
FOR EACH ROW
BEGIN
    DECLARE existingMatch INT DEFAULT 0;

    SELECT COUNT(*) INTO existingMatch
    FROM MATCHES
    WHERE MatchDate = NEW.MatchDate;

    IF existingMatch > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'A match is already scheduled on this date.';
    END IF;

    IF NEW.GoalsFor > NEW.GoalsAgainst THEN
        SET NEW.Result = 'Win';
    ELSEIF NEW.GoalsFor < NEW.GoalsAgainst THEN
        SET NEW.Result = 'Loss';
    ELSE
        SET NEW.Result = 'Draw';
    END IF;
END$$
DELIMITER ;