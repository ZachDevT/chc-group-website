import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiLoader } from 'react-icons/fi'
import { RiRobot2Fill } from 'react-icons/ri'
import { findBestMatch, knowledgeBase } from '../utils/chatbotKnowledge'
import './ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Bonjour! Je suis l\'assistant CHC Group. Comment puis-je vous aider?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const conversationContext = useRef([])

  const predefinedQuestions = [
    {
      id: 1,
      question: 'Quels sont vos services?',
      answer: knowledgeBase.services.map(s => s.title).join(', ')
    },
    {
      id: 2,
      question: 'Où êtes-vous situés?',
      answer: `CHC Group est un cabinet de droit congolais basé en ${knowledgeBase.company.location}.`
    },
    {
      id: 3,
      question: 'Comment puis-je vous contacter?',
      answer: 'Vous pouvez nous contacter via le formulaire de contact, par email, ou en utilisant le bouton WhatsApp sur notre site.'
    },
    {
      id: 4,
      question: 'Quels sont vos secteurs d\'activités?',
      answer: knowledgeBase.sectors.map(s => s.title).join(', ')
    },
    {
      id: 5,
      question: 'Proposez-vous des formations?',
      answer: 'Oui, nous proposons des programmes de formation et de coaching pour renforcer les capacités des professionnels du développement.'
    },
    {
      id: 6,
      question: 'Qui est CHC Group?',
      answer: knowledgeBase.company.description
    }
  ]

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Simulate typing delay for more natural conversation
  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true)
    setTimeout(() => {
      callback()
      setIsTyping(false)
    }, delay)
  }

  const handleQuickReply = (questionObj) => {
    const userMessage = {
      id: messages.length + 1,
      text: questionObj.question,
      sender: 'user',
      timestamp: new Date()
    }

    conversationContext.current.push(userMessage.text)

    simulateTyping(() => {
      const match = findBestMatch(questionObj.question, conversationContext.current)
      const botMessage = {
        id: messages.length + 2,
        text: match.response,
        sender: 'bot',
        timestamp: new Date()
      }

      conversationContext.current.push(match.response)
      setMessages(prev => [...prev, userMessage, botMessage])
      setShowQuickReplies(false)
    }, 800)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    conversationContext.current.push(userMessage.text)
    setInputValue('')
    setShowQuickReplies(false)

    // Simulate AI thinking/processing
    simulateTyping(() => {
      // Use intelligent matching
      const match = findBestMatch(userMessage.text, conversationContext.current)
      
      // Enhance response based on context
      let response = match.response
      
      // Add follow-up suggestions for certain types
      if (match.type === 'service' && match.service) {
        response += '\n\nSouhaitez-vous plus d\'informations sur ce service ou sur nos autres services?'
      } else if (match.type === 'sector' && match.sector) {
        response += '\n\nSouhaitez-vous connaître nos projets dans ce secteur?'
      } else if (match.type === 'services_list' || match.type === 'sectors_list') {
        // Already has suggestions
      } else if (match.type !== 'greeting' && match.type !== 'farewell' && match.type !== 'default') {
        response += '\n\nY a-t-il autre chose que je puisse vous aider?'
      }

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      conversationContext.current.push(botMessage.text)
      setMessages(prev => [...prev, botMessage])
    }, Math.min(1500, 500 + userMessage.text.length * 20)) // Dynamic delay based on message length
  }

  return (
    <>
      <motion.button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Chat avec l'assistant IA"
      >
        {isOpen ? (
          <FiX className="chatbot-icon-close" />
        ) : (
          <>
            <RiRobot2Fill className="chatbot-icon-robot" />
            <span className="pulse-ring"></span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-avatar">
                  <RiRobot2Fill className="avatar-robot-icon" />
                </div>
                <div className="chatbot-header-text">
                  <h3>Assistant IA CHC Group</h3>
                  <p className="status-indicator">
                    <span className={`status-dot ${isTyping ? 'typing' : 'online'}`}></span>
                    {isTyping ? 'En train d\'écrire...' : 'En ligne'}
                  </p>
                </div>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbot-message ${message.sender === 'user' ? 'user' : 'bot'}`}
                >
                  <div className="message-content">
                    <p style={{ whiteSpace: 'pre-line' }}>{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chatbot-message bot">
                  <div className="message-content typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              {showQuickReplies && messages.length === 1 && (
                <div className="quick-replies">
                  <p className="quick-replies-title">Questions fréquentes:</p>
                  <div className="quick-replies-list">
                    {predefinedQuestions.map((q) => (
                      <button
                        key={q.id}
                        className="quick-reply-btn"
                        onClick={() => handleQuickReply(q)}
                        disabled={isTyping}
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-input" onSubmit={handleSend}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tapez votre message..."
                className="chatbot-input-field"
                disabled={isTyping}
              />
              <button 
                type="submit" 
                className="chatbot-send-btn"
                disabled={isTyping || !inputValue.trim()}
              >
                {isTyping ? <FiLoader className="spinning" /> : <FiSend />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
