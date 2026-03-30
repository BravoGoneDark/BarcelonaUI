import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { getClubLogo, getCompLogo, API_URL } from '../constants';
import './CalendarView.css';

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 7)); // Starts August 2024
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/matches/all`)
      .then(res => res.json())
      .then(json => {
        if (json.ok) setMatches(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Helper to get the result letter and class
  const getResultInfo = (result) => {
    if (!result) return { letter: '', className: '' };
    const r = result.toLowerCase();
    if (r === 'win') return { letter: 'W', className: 'res-win' };
    if (r === 'loss') return { letter: 'L', className: 'res-loss' };
    return { letter: 'D', className: 'res-draw' };
  };

  return (
    <div className="calendar-view-wrapper">
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</button>
        <h2 className="month-title">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
      </div>

      {loading ? (
        <div className="loading-strip">Syncing Fixtures...</div>
      ) : (
        <div className="calendar-grid">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
            <div key={d} className="weekday-label">{d}</div>
          ))}
          
          {days.map(day => {
            const match = matches.find(m => isSameDay(new Date(m.MatchDate), day));
            const resultInfo = match ? getResultInfo(match.Result) : null;

            return (
              <div 
                key={day.toString()} 
                className={`calendar-day ${match ? 'has-match' : ''}`}
                onClick={() => match && setSelectedMatch(match)}
              >
                <span className="day-number">{format(day, 'd')}</span>
                
                {match && (
                  <div className="match-content">
                    {/* Competition Logo - Top Right */}
                    <img 
                      src={getCompLogo(match.competitionName)} 
                      alt="" 
                      className="comp-icon-top" 
                    />

                    {/* Opponent Logo - Center */}
                    <div className="team-logo-center-wrap">
                      <img 
                        src={getClubLogo(match.Opponent)} 
                        alt={match.Opponent} 
                        className="team-logo-center" 
                      />
                    </div>

                    {/* Result Tag - Bottom Center */}
                    <div className={`result-tag ${resultInfo.className}`}>
                      {resultInfo.letter}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* FIFA STYLE MODAL */}
      {selectedMatch && (
        <div className="fifa-modal-overlay" onClick={() => setSelectedMatch(null)}>
          <div className="fifa-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>{selectedMatch.competitionName}</span>
              <span className="venue-tag">{selectedMatch.Venue}</span>
            </div>
            
            <div className="modal-matchup">
              <div className="m-team">
                <img src="/crest.svg" alt="Barca" />
                <p>FC Barcelona</p>
              </div>
              
              <div className="m-score">
                {selectedMatch.GoalsFor} - {selectedMatch.GoalsAgainst}
              </div>

              <div className="m-team">
                <img src={getClubLogo(selectedMatch.Opponent)} alt={selectedMatch.Opponent} />
                <p>{selectedMatch.Opponent}</p>
              </div>
            </div>

            <div className="modal-date">
              {format(new Date(selectedMatch.MatchDate), 'EEEE, MMMM do, yyyy')}
            </div>
            
            <button className="modal-close" onClick={() => setSelectedMatch(null)}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;