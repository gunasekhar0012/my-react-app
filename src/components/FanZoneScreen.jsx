import React, { useState } from "react";
import { quizQuestions, fanPollsData } from "../data/heroes";
import { Flame, Sparkles, MessageCircle, Send, CheckCircle2, RotateCcw, Share2, Award } from "lucide-react";

export default function FanZoneScreen({ heroes, onSelectHero }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // Poll state
  const [polls, setPolls] = useState(fanPollsData);
  const [userVoted, setUserVoted] = useState({});

  // Fan Wall state
  const [fanMessages, setFanMessages] = useState([
    { name: "Suresh (Hyderabad)", heroName: "Prabhas", message: "Darling's screen presence in Salaar & Kalki is peak international cinema! TFI proud!", time: "10 mins ago" },
    { name: "Ramesh (Vijayawada)", heroName: "Chiranjeevi", message: "Megastar's breakdance in the 90s inspired an entire generation! Boss is always Boss!", time: "25 mins ago" },
    { name: "Divya (Bangalore)", heroName: "Allu Arjun", message: "Pushpa 2 booking records are going to be insane! Bunny's dance and swag unmatched!", time: "1 hour ago" },
    { name: "Karthik (USA)", heroName: "Jr. NTR", message: "Naatu Naatu Oscar moment will forever remain golden history for Telugu cinema!", time: "3 hours ago" }
  ]);
  const [inputName, setInputName] = useState("");
  const [inputHero, setInputHero] = useState("Prabhas");
  const [inputMsg, setInputMsg] = useState("");

  // Quiz Option Click
  const handleAnswerSelect = (heroId) => {
    const updatedScores = { ...scores, [heroId]: (scores[heroId] || 0) + 1 };
    setScores(updatedScores);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate winner hero
      let winnerId = heroes[0].id;
      let maxScore = -1;
      Object.entries(updatedScores).forEach(([hId, score]) => {
        if (score > maxScore) {
          maxScore = score;
          winnerId = hId;
        }
      });

      const matchedHero = heroes.find((h) => h.id === winnerId) || heroes[0];
      setQuizResult(matchedHero);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setScores({});
    setQuizResult(null);
  };

  // Vote in Poll
  const handleVote = (pollId, optionId) => {
    if (userVoted[pollId]) return;

    setUserVoted((prev) => ({ ...prev, [pollId]: optionId }));

    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          return {
            ...poll,
            totalVotes: poll.totalVotes + 1,
            options: poll.options.map((opt) =>
              opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            )
          };
        }
        return poll;
      })
    );
  };

  // Add Fan Message
  const handlePostMessage = (e) => {
    e.preventDefault();
    if (!inputName.trim() || !inputMsg.trim()) return;

    setFanMessages([
      {
        name: inputName,
        heroName: inputHero,
        message: inputMsg,
        time: "Just now"
      },
      ...fanMessages
    ]);

    setInputName("");
    setInputMsg("");
  };

  return (
    <div className="fanzone-screen">
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="badge-tag" style={{ margin: "0 auto 0.75rem auto" }}>
          <Flame size={14} /> Ultimate Tollywood Fan Arena
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "#fff" }}>
          FAN HUB & HERO MATCH QUIZ
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0.5rem auto 0 auto" }}>
          Discover your inner TFI Superstar persona, cast your votes in mass polls, and write on the Fan Wall of Fame!
        </p>
      </div>

      {/* QUIZ SECTION */}
      <div className="quiz-container">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-gold)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
            TFI Persona Finder Quiz
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", color: "#fff", marginTop: "0.2rem" }}>
            Which TFI Superstar Are You?
          </h2>
        </div>

        {!quizResult ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>Progress: {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
            </div>

            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", marginBottom: "1.75rem", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                  background: "linear-gradient(90deg, #ffd700, #ff4500)",
                  transition: "width 0.4s ease"
                }}
              />
            </div>

            <h3 className="quiz-question-title">
              {quizQuestions[currentQuestion].question}
            </h3>

            <div className="quiz-options">
              {quizQuestions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  className="quiz-opt-btn"
                  onClick={() => handleAnswerSelect(opt.heroId)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-result-box">
            <div style={{ fontSize: "0.85rem", color: "var(--text-gold)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
              🎉 YOUR PERFECT MATCH FOUND!
            </div>
            <div className="quiz-result-title">{quizResult.name}</div>
            <div style={{ color: quizResult.color, fontWeight: "700", fontSize: "1.2rem", marginBottom: "1rem" }}>
              "{quizResult.title}" • {quizResult.tag}
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.6", maxWidth: "550px", margin: "0 auto 1.5rem auto" }}>
              {quizResult.bio}
            </p>

            <div style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${quizResult.color}`, padding: "1.25rem", borderRadius: "14px", fontStyle: "italic", color: "#fff", marginBottom: "2rem" }}>
              "{quizResult.iconicDialogues[0].text}"
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                style={{ background: `linear-gradient(135deg, ${quizResult.color}, #f59e0b)` }}
                onClick={() => onSelectHero(quizResult.id)}
              >
                View {quizResult.name}'s Full Profile
              </button>
              <button className="btn-secondary" onClick={handleResetQuiz}>
                <RotateCcw size={16} /> Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MASS FAN POLLS */}
      <div style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-gold)", marginBottom: "1.5rem" }}>
          🔥 Mass Fan Polls
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {polls.map((poll) => {
            const hasVoted = userVoted[poll.id];

            return (
              <div key={poll.id} className="poll-card">
                <h3 style={{ fontSize: "1.15rem", color: "#fff", marginBottom: "0.25rem" }}>{poll.title}</h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                  Total Votes Cast: {poll.totalVotes.toLocaleString()}
                </div>

                {poll.options.map((opt) => {
                  const percent = Math.round((opt.votes / poll.totalVotes) * 100);
                  const isUserChoice = hasVoted === opt.id;

                  return (
                    <div
                      key={opt.id}
                      className="poll-option-bar"
                      onClick={() => handleVote(poll.id, opt.id)}
                      style={{
                        borderColor: isUserChoice ? "var(--text-gold)" : "var(--glass-border)"
                      }}
                    >
                      <div
                        className="poll-progress-overlay"
                        style={{ width: `${percent}%` }}
                      />
                      <div className="poll-opt-content">
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {isUserChoice && <CheckCircle2 size={16} color="var(--text-gold)" />}
                          {opt.text}
                        </span>
                        <span style={{ color: "var(--text-gold)" }}>{percent}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* FAN WALL OF FAME */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-gold)", borderRadius: "24px", padding: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "#fff", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <MessageCircle size={22} color="var(--text-gold)" /> Fan Wall of Fame
        </h2>

        <form onSubmit={handlePostMessage} style={{ marginBottom: "2rem", display: "grid", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <input
              type="text"
              className="search-input"
              placeholder="Your Name / City"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              required
            />

            <select
              className="custom-select"
              value={inputHero}
              onChange={(e) => setInputHero(e.target.value)}
            >
              {heroes.map((h) => (
                <option key={h.id} value={h.name}>{h.name} ({h.title})</option>
              ))}
            </select>
          </div>

          <textarea
            className="search-input"
            rows={3}
            placeholder="Write a message/shoutout for your favorite TFI Superstar..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            required
            style={{ resize: "none" }}
          />

          <button type="submit" className="btn-primary" style={{ justifySelf: "start" }}>
            <Send size={16} /> Post Shoutout on Fan Wall
          </button>
        </form>

        <div style={{ display: "grid", gap: "1rem" }}>
          {fanMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "1rem 1.25rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontWeight: "700", color: "#fff" }}>{msg.name}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{msg.time}</span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-gold)", fontWeight: "600", marginBottom: "0.4rem" }}>
                Shoutout for: {msg.heroName}
              </div>
              <p style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}>"{msg.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
