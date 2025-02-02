import {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import RulesModal from '../../GlobalRulesModal'
import {emojiRulesSet} from '../../GlobalRules'
import EmojiWinRLose from '../WinOrLossCard'
import './index.css'

const EmojiGame = props => {
  const {emojisList} = props
  const [clickedEmojiList, setClicked] = useState([])
  const [falseClick, setFalseClick] = useState(false)
  const [topScore, setTopScore] = useState(0)
  const [modalShow, setModalShow] = useState(false)

  const history = useHistory()

  const shuffledEmojisList = useCallback(
    () => emojisList.sort(() => Math.random() - 0.5),
    [emojisList],
  )
  useEffect(() => {
    shuffledEmojisList()
  }, [shuffledEmojisList])

  const onEmojiClick = id => {
    if (!clickedEmojiList.includes(id)) {
      setClicked(prevClicked => [...prevClicked, id])
    } else {
      setFalseClick(true)
    }
  }

  useEffect(() => {
    if (falseClick) {
      if (clickedEmojiList.length > topScore) {
        setTopScore(clickedEmojiList.length)
      }
    }
  }, [falseClick, clickedEmojiList.length, topScore])

  const onPlayAgain = () => {
    setClicked([])
    setFalseClick(false)
  }

  return (
    <div>
      <NavBar
        score={clickedEmojiList.length}
        topScore={topScore}
        falseClicked={falseClick}
      />
      <div className="emoji-main-container">
        {falseClick || clickedEmojiList.length === 12 ? (
          <EmojiWinRLose
            score={clickedEmojiList.length}
            onPlayAgain={onPlayAgain}
          />
        ) : (
          <>
            <div className="emoji-rules-back-container">
              <div className="back-rule-header-emoji">
                <div className="back-container">
                  <img
                    src="/Images/black-back-arrow.png"
                    alt="arrow-leftarrowback"
                    className="black-back-arrow"
                  />
                  <p
                    className="back-text"
                    onClick={() => history.push('/emoji-game')}
                  >
                    Back
                  </p>
                </div>

                <button
                  type="button"
                  className="rules-btn-emoji"
                  onClick={() => setModalShow(true)}
                >
                  Rules
                </button>

                <RulesModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  rulesset1={emojiRulesSet}
                />
              </div>
            </div>

            <div className="emoji-icons-container">
              <div className="emoji_button">
                {emojisList.map(emoji => (
                  <EmojiCard
                    emoji={emoji}
                    key={emoji.id}
                    onEmojiClick={onEmojiClick}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EmojiGame
