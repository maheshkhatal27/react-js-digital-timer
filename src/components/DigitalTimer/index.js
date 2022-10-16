import {Component} from 'react'
import './index.css'

const initialState = {
  timerLimitValue: 25,
  isTimerRunning: false,
  timePassedInSec: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimer = () => {
    const {timerLimitValue, timePassedInSec} = this.state
    const isTimeComplete = timePassedInSec === timerLimitValue * 60

    if (isTimeComplete) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timePassedInSec: prevState.timePassedInSec + 1,
      }))
    }
  }

  clickStartOrPause = () => {
    const {timerLimitValue, timePassedInSec, isTimerRunning} = this.state
    const isTimerComplete = timePassedInSec === timerLimitValue * 60

    if (isTimerComplete) {
      this.setState({timePassedInSec: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimer, 1000)
    }

    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  lowerTimerLimit = () => {
    const {timerLimitValue} = this.state

    if (timerLimitValue > 1) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue - 1,
      }))
    }
  }

  increaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitValue: prevState.timerLimitValue + 1,
    }))
  }

  onResetClick = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getCurrentTime = () => {
    const {timePassedInSec, timerLimitValue} = this.state
    const remainingTimeInSecond = timerLimitValue * 60 - timePassedInSec

    const min = Math.floor(remainingTimeInSecond / 60)
    const sec = Math.floor(remainingTimeInSecond % 60)
    const stringifiedMinutes = min > 9 ? min : `0${min}`
    const stringifiedSeconds = sec > 9 ? sec : `0${sec}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, timePassedInSec, timerLimitValue} = this.state
    const runningOrPauseText = isTimerRunning ? 'Running' : 'Paused'
    const displayPauseOrStartImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    const displayStartOrPauseTxt = isTimerRunning ? 'Pause' : 'Start'

    const isBtnDisable = timePassedInSec > 0

    return (
      <div className="digital-timer-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="display-time-settings-container">
          <div className="display-container">
            <div className="circle-container">
              <h1 className="current-time">{this.getCurrentTime()}</h1>
              <p className="circle-text">{runningOrPauseText}</p>
            </div>
          </div>
          <div className="time-setting-container">
            <div className="start-reset-pause-container">
              <div className="start-container">
                <button
                  type="button"
                  className="setting-btn"
                  onClick={this.clickStartOrPause}
                >
                  <img
                    src={displayPauseOrStartImg}
                    className="img-icon"
                    alt={startOrPauseAltText}
                  />
                  <h1 className="label">{displayStartOrPauseTxt}</h1>
                </button>
              </div>
              <div className="reset-container">
                <button
                  type="button"
                  className="setting-btn"
                  onClick={this.onResetClick}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="img-icon"
                    alt="reset icon"
                  />
                  <h1 className="label">Reset</h1>
                </button>
              </div>
            </div>
            <div className="set-time-container">
              <p className="para">Set Timer limit</p>
              <div className="limit-container">
                <button
                  className="button"
                  type="button"
                  disabled={isBtnDisable}
                  onClick={this.lowerTimerLimit}
                >
                  -
                </button>
                <div className="limit-box">
                  <p className="limit-count">{timerLimitValue}</p>
                </div>
                <button
                  className="button"
                  type="button"
                  disabled={isBtnDisable}
                  onClick={this.increaseTimerLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
