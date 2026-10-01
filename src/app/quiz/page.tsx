'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { 
  CheckSquare, Clock, Trophy, RotateCcw, ArrowRight, CheckCircle2, 
  XCircle, ArrowLeft, BookOpen, Sparkles, Filter, Play, Check, 
  AlertCircle, HelpCircle, Flame, Layers, Award, BarChart3, ChevronRight,
  Code2, Zap, Settings2
} from 'lucide-react';
import TechLogo from '../../components/TechLogo';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  QUIZ_TOPICS, 
  ALL_QUIZ_QUESTIONS, 
  QuizQuestion, 
  QuizTopicMeta,
  getTopicQuestionCount 
} from '../../data/quizBank';

type QuizMode = 'exam' | 'practice';
type CategoryFilter = 'all' | 'fe' | 'be' | 'devops';

export default function QuizPage() {
  const { t, isEn } = useLanguage();

  // Topic Hub state
  const [filterGroup, setFilterGroup] = useState<CategoryFilter>('all');
  const [selectedTopic, setSelectedTopic] = useState<QuizTopicMeta | null>(null);
  
  // Quiz configuration settings
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizMode, setQuizMode] = useState<QuizMode>('exam');
  const [useTimer, setUseTimer] = useState<boolean>(true);

  // Active Quiz state
  const [inQuiz, setInQuiz] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(600); // in seconds
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered topics list for hub
  const filteredTopics = useMemo(() => {
    if (filterGroup === 'all') return QUIZ_TOPICS;
    return QUIZ_TOPICS.filter(t => t.categoryGroup === filterGroup || t.categoryGroup === 'all');
  }, [filterGroup]);

  // Total available questions in entire bank
  const totalBankQuestions = ALL_QUIZ_QUESTIONS.length;

  // Start Quiz handler
  const handleStartQuiz = (topic: QuizTopicMeta, countOverride?: number) => {
    setSelectedTopic(topic);
    
    // Get candidate questions
    let pool: QuizQuestion[] = [];
    if (topic.id === 'all') {
      pool = [...ALL_QUIZ_QUESTIONS];
    } else {
      pool = ALL_QUIZ_QUESTIONS.filter(q => q.topic.toLowerCase() === topic.id.toLowerCase());
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const countToPick = countOverride !== undefined ? countOverride : questionCount;
    const finalQuestions = countToPick > 0 && countToPick < shuffled.length 
      ? shuffled.slice(0, countToPick) 
      : shuffled;

    setQuestions(finalQuestions);
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
    setInQuiz(true);

    // Set timer: 1 minute per question if timer enabled
    const initialSeconds = finalQuestions.length * 60;
    setTimeLeft(initialSeconds);
    setTimeElapsed(0);
  };

  // Timer effect
  useEffect(() => {
    if (inQuiz && !showResult && useTimer) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Auto submit when time runs out
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inQuiz, showResult, useTimer]);

  // Handle selecting an option
  const handleSelectOption = (optionIdx: number) => {
    if (quizMode === 'practice' && selectedAnswers[currentIdx] !== undefined) {
      // In practice mode, once answered, lock option to preserve feedback
      return;
    }
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleQuitQuiz = () => {
    if (window.confirm(t.quiz.confirmQuit)) {
      setInQuiz(false);
      setShowResult(false);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Score statistics
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correct ? acc + 1 : acc;
  }, 0);
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  // Current question object
  const currentQ = questions[currentIdx];

  const filterTabs = [
    { id: 'all', label: t.quiz.tabAll, icon: Sparkles },
    { id: 'fe', label: t.quiz.tabFe, icon: Layers },
    { id: 'be', label: t.quiz.tabBe, icon: Code2 },
    { id: 'devops', label: t.quiz.tabDevops, icon: Flame },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 80px', maxWidth: inQuiz ? '880px' : '1100px' }}>
      
      {/* ======================================================== */}
      {/* VIEW 1: TOPIC SELECTION HUB                              */}
      {/* ======================================================== */}
      {!inQuiz && !showResult && (
        <div>
          {/* Header section */}
          <div style={{ marginBottom: '32px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--ink-muted)',
                fontSize: '0.85rem',
                marginBottom: '16px',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={16} /> {t.category.homeBreadcrumb}
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: 'var(--accent-subtle)',
                    color: 'var(--accent)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    <Zap size={13} /> {totalBankQuestions}+ {t.quiz.bankBadge}
                  </span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--ink)',
                  lineHeight: 1.2
                }}>
                  {t.quiz.pageTitle}
                </h1>
                <p style={{ color: 'var(--ink-secondary)', fontSize: '0.96rem', marginTop: '6px', maxWidth: '680px', lineHeight: 1.5 }}>
                  {t.quiz.pageSubtitle}
                </p>
              </div>

              <Link
                href="/quiz/dap-an"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius)',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border)',
                  color: 'var(--ink)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <BookOpen size={17} color="var(--accent)" />
                <span>{t.quiz.browseAnswersBtn}</span>
              </Link>
            </div>
          </div>

          {/* Settings & Mode Control Bar */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 24px',
            marginBottom: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink)' }}>
              <Settings2 size={18} color="var(--accent)" />
              <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{t.quiz.configTitle}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              {/* Question Count Option */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{t.quiz.countLabel}</span>
                <div style={{ display: 'flex', background: 'var(--surface-raised)', borderRadius: 'var(--radius)', padding: '2px', border: '1px solid var(--border)' }}>
                  {[10, 15, 0].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setQuestionCount(cnt)}
                      style={{
                        padding: '4px 10px',
                        border: 'none',
                        borderRadius: 'var(--radius)',
                        background: questionCount === cnt ? 'var(--accent-solid)' : 'transparent',
                        color: questionCount === cnt ? '#fff' : 'var(--ink-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: questionCount === cnt ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {cnt === 0 ? t.quiz.allQuestions : `${cnt} ${t.quiz.questionsUnit}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Option */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{t.quiz.modeLabel}</span>
                <div style={{ display: 'flex', background: 'var(--surface-raised)', borderRadius: 'var(--radius)', padding: '2px', border: '1px solid var(--border)' }}>
                  <button
                    onClick={() => setQuizMode('exam')}
                    style={{
                      padding: '4px 10px',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      background: quizMode === 'exam' ? 'var(--accent-solid)' : 'transparent',
                      color: quizMode === 'exam' ? '#fff' : 'var(--ink-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: quizMode === 'exam' ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {t.quiz.examMode}
                  </button>
                  <button
                    onClick={() => setQuizMode('practice')}
                    style={{
                      padding: '4px 10px',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      background: quizMode === 'practice' ? 'var(--accent-solid)' : 'transparent',
                      color: quizMode === 'practice' ? '#fff' : 'var(--ink-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: quizMode === 'practice' ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {t.quiz.practiceMode}
                  </button>
                </div>
              </div>

              {/* Timer Toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--ink)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={useTimer}
                  onChange={(e) => setUseTimer(e.target.checked)}
                  style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                />
                <Clock size={14} color="var(--ink-muted)" />
                <span>{t.quiz.timerToggle}</span>
              </label>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            {filterTabs.map(tab => {
              const TabIcon = tab.icon;
              const isActive = filterGroup === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterGroup(tab.id as CategoryFilter)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius)',
                    background: isActive ? 'var(--accent-solid)' : 'var(--surface)',
                    color: isActive ? '#fff' : 'var(--ink)',
                    border: `1px solid ${isActive ? 'transparent' : 'var(--border)'}`,
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Topic Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '18px'
          }}>
            {filteredTopics.map((topic) => {
              const qCount = getTopicQuestionCount(topic.id);
              return (
                <div
                  key={topic.id}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
                    position: 'relative'
                  }}
                  className="topic-quiz-card"
                >
                  {/* Topic Card Top */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        background: 'var(--surface-raised)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                      }}>
                        {topic.id === 'all' ? (
                          <Trophy size={28} color="var(--accent)" />
                        ) : (
                          <TechLogo slug={topic.iconSlug} size={30} />
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {topic.badge && (
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            background: topic.badge === 'HOT' ? '#f59e0b20' : 'var(--accent-subtle)',
                            color: topic.badge === 'HOT' ? '#f59e0b' : 'var(--accent)',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em'
                          }}>
                            {topic.badge}
                          </span>
                        )}
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '999px',
                          background: 'var(--surface-raised)',
                          border: '1px solid var(--border)',
                          color: 'var(--ink-secondary)',
                          fontSize: '0.72rem',
                          fontWeight: 600
                        }}>
                          {qCount} {t.quiz.questionsUnit}
                        </span>
                      </div>
                    </div>

                    <h2 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      marginBottom: '8px'
                    }}>
                      {topic.name}
                    </h2>

                    <p style={{
                      color: 'var(--ink-secondary)',
                      fontSize: '0.86rem',
                      lineHeight: 1.5,
                      marginBottom: '20px',
                      minHeight: '42px'
                    }}>
                      {topic.description}
                    </p>
                  </div>

                  {/* Topic Card Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                    <button
                      onClick={() => handleStartQuiz(topic)}
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 16px',
                        borderRadius: 'var(--radius)',
                        background: 'var(--accent-solid)',
                        color: '#fff',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px var(--accent-subtle)'
                      }}
                    >
                      <Play size={15} fill="currentColor" />
                      <span>{questionCount === 0 ? `${t.quiz.startBtn} (${qCount} ${t.quiz.questionsUnit})` : `${t.quiz.startBtn} (${Math.min(questionCount, qCount)} ${t.quiz.questionsUnit})`}</span>
                    </button>

                    {qCount > 10 && questionCount !== 10 && (
                      <button
                        onClick={() => handleStartQuiz(topic, 10)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius)',
                          background: 'var(--surface-raised)',
                          border: '1px solid var(--border)',
                          color: 'var(--ink)',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {t.quiz.quick10Btn}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: ACTIVE QUIZ ARENA                                */}
      {/* ======================================================== */}
      {inQuiz && !showResult && currentQ && (
        <div>
          {/* Quiz Top bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <button
              onClick={handleQuitQuiz}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius)',
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                color: 'var(--ink-secondary)',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={14} /> {t.quiz.exitBtn}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--ink)'
              }}>
                {selectedTopic?.id === 'all' ? (
                  <Trophy size={14} color="var(--accent)" />
                ) : (
                  <TechLogo slug={selectedTopic?.iconSlug || ''} size={14} />
                )}
                <span>{selectedTopic?.name}</span>
              </div>

              {quizMode === 'practice' && (
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: '#10b98120',
                  color: '#10b981',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {t.quiz.practiceBadge}
                </span>
              )}
            </div>

            {useTimer && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius)',
                background: timeLeft < 60 ? '#ef444420' : 'var(--surface-raised)',
                border: `1px solid ${timeLeft < 60 ? '#ef4444' : 'var(--border)'}`,
                color: timeLeft < 60 ? '#ef4444' : 'var(--ink)',
                fontSize: '0.9rem',
                fontWeight: 700,
                fontFamily: 'monospace'
              }}>
                <Clock size={16} />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '8px' }}>
              <span>{t.quiz.questionCounter} <strong>{currentIdx + 1}</strong> / {questions.length}</span>
              <span>{t.quiz.answeredCounter}: <strong>{answeredCount}</strong> / {questions.length}</span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              borderRadius: '999px',
              background: 'var(--surface-raised)',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${((currentIdx + 1) / questions.length) * 100}%`,
                height: '100%',
                background: 'var(--accent-solid)',
                transition: 'width 0.25s ease'
              }} />
            </div>
          </div>

          {/* Question Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px 28px',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '24px'
          }}>
            {/* Question Header & Level Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                padding: '2px 8px',
                borderRadius: 'var(--radius)',
                background: currentQ.level === 'beginner' 
                  ? '#10b98120' 
                  : currentQ.level === 'intermediate' 
                    ? '#3b82f620' 
                    : '#8b5cf620',
                color: currentQ.level === 'beginner' 
                  ? '#10b981' 
                  : currentQ.level === 'intermediate' 
                    ? '#3b82f6' 
                    : '#8b5cf6',
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {currentQ.level === 'beginner' ? t.common.beginner : currentQ.level === 'intermediate' ? t.common.intermediate : t.common.advanced}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                {t.quiz.topicLabel} {currentQ.topicName}
              </span>
            </div>

            {/* Question text */}
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.5,
              marginBottom: currentQ.codeSnippet ? '16px' : '24px'
            }}>
              {currentQ.question}
            </h2>

            {/* Optional Code Snippet block */}
            {currentQ.codeSnippet && (
              <div style={{
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 'var(--radius)',
                padding: '14px 16px',
                marginBottom: '24px',
                overflowX: 'auto',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.88rem',
                color: '#e6edf3',
                lineHeight: 1.5
              }}>
                <pre style={{ margin: 0 }}><code>{currentQ.codeSnippet}</code></pre>
              </div>
            )}

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const isPracticeMode = quizMode === 'practice';
                const hasAnsweredThis = selectedAnswers[currentIdx] !== undefined;
                const isCorrectOpt = optIdx === currentQ.correct;

                let optBg = 'var(--surface-raised)';
                let optBorder = 'var(--border)';
                let optColor = 'var(--ink)';

                if (isPracticeMode && hasAnsweredThis) {
                  if (isCorrectOpt) {
                    optBg = '#10b98115';
                    optBorder = '#10b981';
                    optColor = '#10b981';
                  } else if (isSelected && !isCorrectOpt) {
                    optBg = '#ef444415';
                    optBorder = '#ef4444';
                    optColor = '#ef4444';
                  }
                } else if (isSelected) {
                  optBg = 'var(--accent-subtle)';
                  optBorder = 'var(--accent)';
                  optColor = 'var(--accent)';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius)',
                      background: optBg,
                      border: `1.5px solid ${optBorder}`,
                      color: optColor,
                      textAlign: 'left',
                      fontSize: '0.94rem',
                      cursor: (isPracticeMode && hasAnsweredThis) ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                      width: '100%',
                      lineHeight: 1.45
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--accent-solid)' : 'var(--surface)',
                      border: `1px solid ${isSelected ? 'transparent' : 'var(--border)'}`,
                      color: isSelected ? '#fff' : 'var(--ink-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span style={{ flex: 1, fontWeight: isSelected ? 600 : 400 }}>{opt}</span>
                    
                    {isPracticeMode && hasAnsweredThis && isCorrectOpt && (
                      <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />
                    )}
                    {isPracticeMode && hasAnsweredThis && isSelected && !isCorrectOpt && (
                      <XCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* In Practice Mode: Immediate Explanation Reveal */}
            {quizMode === 'practice' && selectedAnswers[currentIdx] !== undefined && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                borderRadius: 'var(--radius)',
                background: selectedAnswers[currentIdx] === currentQ.correct ? '#10b98110' : '#ef444410',
                border: `1px solid ${selectedAnswers[currentIdx] === currentQ.correct ? '#10b98140' : '#ef444440'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {selectedAnswers[currentIdx] === currentQ.correct ? (
                    <CheckCircle2 size={18} color="#10b981" />
                  ) : (
                    <XCircle size={18} color="#ef4444" />
                  )}
                  <strong style={{
                    fontSize: '0.92rem',
                    color: selectedAnswers[currentIdx] === currentQ.correct ? '#10b981' : '#ef4444'
                  }}>
                    {selectedAnswers[currentIdx] === currentQ.correct ? t.quiz.practiceCorrect : t.quiz.practiceWrong}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
                    {t.quiz.correctAnswerIs} <strong>{String.fromCharCode(65 + currentQ.correct)}</strong>
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: 'var(--radius)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: currentIdx === 0 ? 'var(--ink-muted)' : 'var(--ink)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: currentIdx === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ArrowLeft size={16} /> {t.quiz.prevBtn}
            </button>

            {/* Quick jump dots */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = selectedAnswers[idx] !== undefined;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isCurrent 
                        ? 'var(--accent-solid)' 
                        : isAnswered 
                          ? 'var(--surface-raised)' 
                          : 'transparent',
                      border: `1px solid ${isCurrent ? 'transparent' : isAnswered ? 'var(--accent)' : 'var(--border)'}`,
                      color: isCurrent ? '#fff' : isAnswered ? 'var(--accent)' : 'var(--ink-muted)',
                      fontSize: '0.78rem',
                      fontWeight: isCurrent || isAnswered ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 22px',
                  borderRadius: 'var(--radius)',
                  background: 'var(--accent-solid)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>{t.quiz.nextBtn}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setShowResult(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 24px',
                  borderRadius: 'var(--radius)',
                  background: '#10b981',
                  color: '#fff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)'
                }}
              >
                <CheckCircle2 size={16} />
                <span>{t.quiz.submitBtn}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: SCORE & DETAILED REVIEW                          */}
      {/* ======================================================== */}
      {showResult && (
        <div>
          {/* Result Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '36px'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: scorePercent >= 80 ? '#10b98120' : scorePercent >= 50 ? '#3b82f620' : '#ef444420',
              color: scorePercent >= 80 ? '#10b981' : scorePercent >= 50 ? '#3b82f6' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Trophy size={36} />
            </div>

            <span style={{
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'var(--surface-raised)',
              border: '1px solid var(--border)',
              color: 'var(--ink-secondary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              {t.quiz.topicLabel} {selectedTopic?.name}
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--ink)',
              marginBottom: '8px'
            }}>
              {t.quiz.scoreTitle}: {scorePercent}% ({correctCount}/{questions.length} {t.quiz.questionsUnit})
            </h2>

            <p style={{
              color: 'var(--ink-secondary)',
              maxWidth: '560px',
              margin: '0 auto 28px',
              fontSize: '0.96rem',
              lineHeight: 1.5
            }}>
              {scorePercent === 100
                ? t.quiz.scoreSubtitle100
                : scorePercent >= 80
                ? t.quiz.scoreSubtitle80
                : scorePercent >= 50
                ? t.quiz.scoreSubtitle50
                : t.quiz.scoreSubtitleLow}
            </p>

            {/* Metrics Breakdown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              maxWidth: '560px',
              margin: '0 auto 28px'
            }}>
              <div style={{ background: 'var(--surface-raised)', padding: '14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{t.quiz.correctCount}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>{correctCount}</div>
              </div>
              <div style={{ background: 'var(--surface-raised)', padding: '14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{t.quiz.wrongCount}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444', marginTop: '2px' }}>{questions.length - correctCount}</div>
              </div>
              <div style={{ background: 'var(--surface-raised)', padding: '14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{t.quiz.timeElapsed}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>{formatTime(timeElapsed)}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => selectedTopic && handleStartQuiz(selectedTopic)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: 'var(--radius)',
                  background: 'var(--accent-solid)',
                  color: '#fff',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                <RotateCcw size={16} /> {t.quiz.retakeBtn}
              </button>

              <button
                onClick={() => {
                  setInQuiz(false);
                  setShowResult(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: 'var(--radius)',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border)',
                  color: 'var(--ink)',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Layers size={16} /> {t.quiz.changeTopicBtn}
              </button>
            </div>
          </div>

          {/* Full Question Breakdown & In-Depth Technical Explanations */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--ink)',
              marginBottom: '20px'
            }}>
              {t.quiz.detailedReviewTitle}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correct;
                const isSkipped = userAns === undefined;

                return (
                  <div
                    key={q.id || idx}
                    style={{
                      background: 'var(--surface)',
                      border: `1.5px solid ${isCorrect ? '#10b98140' : '#ef444440'}`,
                      borderRadius: 'var(--radius-lg)',
                      padding: '24px',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: isCorrect ? '#10b98120' : '#ef444420',
                          color: isCorrect ? '#10b981' : '#ef4444',
                          fontWeight: 800,
                          fontSize: '0.82rem'
                        }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', fontWeight: 600 }}>
                          {q.topicName}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isCorrect ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#10b981',
                            fontSize: '0.82rem',
                            fontWeight: 700
                          }}>
                            <CheckCircle2 size={16} /> {t.quiz.statusCorrect}
                          </span>
                        ) : (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#ef4444',
                            fontSize: '0.82rem',
                            fontWeight: 700
                          }}>
                            <XCircle size={16} /> {isSkipped ? t.quiz.statusSkipped : t.quiz.statusWrong}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <h4 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      marginBottom: q.codeSnippet ? '12px' : '16px',
                      lineHeight: 1.45
                    }}>
                      {q.question}
                    </h4>

                    {/* Code snippet if any */}
                    {q.codeSnippet && (
                      <div style={{
                        background: '#0d1117',
                        border: '1px solid #30363d',
                        borderRadius: 'var(--radius)',
                        padding: '12px 14px',
                        marginBottom: '16px',
                        overflowX: 'auto',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: '0.85rem',
                        color: '#e6edf3'
                      }}>
                        <pre style={{ margin: 0 }}><code>{q.codeSnippet}</code></pre>
                      </div>
                    )}

                    {/* Options status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      {q.options.map((opt, optIdx) => {
                        const isThisCorrect = optIdx === q.correct;
                        const isThisUserSelected = optIdx === userAns;

                        let rowBg = 'var(--surface-raised)';
                        let rowBorder = 'var(--border)';
                        let labelColor = 'var(--ink-secondary)';

                        if (isThisCorrect) {
                          rowBg = '#10b98115';
                          rowBorder = '#10b981';
                          labelColor = '#10b981';
                        } else if (isThisUserSelected && !isThisCorrect) {
                          rowBg = '#ef444415';
                          rowBorder = '#ef4444';
                          labelColor = '#ef4444';
                        }

                        return (
                          <div
                            key={optIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 14px',
                              borderRadius: 'var(--radius)',
                              background: rowBg,
                              border: `1px solid ${rowBorder}`,
                              fontSize: '0.88rem',
                              color: 'var(--ink)'
                            }}
                          >
                            <span style={{
                              fontWeight: 700,
                              color: labelColor,
                              width: '20px'
                            }}>
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span style={{ flex: 1 }}>{opt}</span>
                            {isThisCorrect && (
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>{t.quiz.correctBadge}</span>
                            )}
                            {isThisUserSelected && !isThisCorrect && (
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444' }}>{t.quiz.userBadge}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius)',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      lineHeight: 1.55,
                      color: 'var(--ink)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--accent)', fontWeight: 700 }}>
                        <HelpCircle size={15} />
                        <span>{t.quiz.explanationTitle}</span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--ink-secondary)' }}>
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
