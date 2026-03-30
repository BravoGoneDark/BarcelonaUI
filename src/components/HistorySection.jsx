import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLUB_HISTORY } from '../constants';
import './HistorySection.css';

const HistorySection = () => {
  const [index, setIndex] = useState(0);

  const nextCard = () => setIndex((prev) => (prev + 1) % CLUB_HISTORY.length);
  const prevCard = () => setIndex((prev) => (prev - 1 + CLUB_HISTORY.length) % CLUB_HISTORY.length);

  const current = CLUB_HISTORY[index];
  
  // Logic to alternate title colors: Card 0 is Red, Card 1 is Blue, Card 2 is Red...
  const titleColorClass = index % 2 === 0 ? "title-red" : "title-blue";

  return (
    <section className="history-wrapper">
      <h2 className="section-title">Club History</h2>
      
      <div className="history-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, backgroundColor: "#000" }}
            animate={{ opacity: 1, backgroundColor: "transparent" }}
            exit={{ opacity: 0, backgroundColor: "#000" }}
            transition={{ duration: 0.8 }}
            className="history-card"
          >
            <div className="history-left">
              {/* Title now alternates between Red and Blue classes */}
              <h3 className={`history-main-title ${titleColorClass}`}>
                {current.title}
              </h3>
              
              <div className="history-desc">
                {current.description.map((line, i) => (
                  /* Descriptions are now strictly Gold */
                  <p key={i} className="text-gold">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="history-right">
              <img src={current.img} alt={current.title} className="history-image" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="history-controls">
        <button className="nav-btn" onClick={prevCard}>&lt;</button>
        <div className="history-pagination">
          {index + 1} / {CLUB_HISTORY.length}
        </div>
        <button className="nav-btn" onClick={nextCard}>&gt;</button>
      </div>
    </section>
  );
};

export default HistorySection;