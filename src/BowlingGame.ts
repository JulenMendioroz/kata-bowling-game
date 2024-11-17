export class BowlingGame {
  private rolls: number[] = []
  private startOfFrame = 0

  getScore = () => {
    return 0
  }

  roll = (pins: number) => {
    this.assertRoll(pins)
    this.rolls.push(pins)
    this.updateStartOfFrame()
  }

  private updateStartOfFrame = () => {
    const { isStrike, isComplete } = this.getCurrentFrameInfo()

    if (!isComplete) return

    const startOfNextFrame = this.startOfFrame + (isStrike ? 1 : 2)

    this.startOfFrame = startOfNextFrame
  }

  private getCurrentFrameInfo = () => {
    const { rolls, startOfFrame } = this

    const frame = rolls.slice(startOfFrame)
    const isStrike = frame[0] === 10
    const isNormal = frame.length === 2
    const isComplete = isStrike || isNormal

    return { isStrike, isComplete }
  }

  private assertRoll = (pins: number) => {
    if (pins < 0 || 10 < pins) throw new Error()

    const firstRollOfFrame = this.rolls[this.startOfFrame] ?? 0
    const pinsRolledInFrame = firstRollOfFrame + pins

    if (pinsRolledInFrame > 10) throw new Error()
  }
}
