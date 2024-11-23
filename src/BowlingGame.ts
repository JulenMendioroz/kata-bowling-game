export class BowlingGame {
  private rolls: number[] = []
  private startOfCurrentFrame = 0
  private playedFrames = 0

  getScore = () => {
    return 0
  }

  roll = (pins: number) => {
    this.assertRoll(pins)
    this.rolls.push(pins)
    this.prepareNextFrame()
  }

  private prepareNextFrame = () => {
    if (this.isCurrentFrameLast() || !this.isCurrentFrameComplete()) return

    const { length: rollsInCurrentFrame } = this.getCurrentFrame()

    this.startOfCurrentFrame += rollsInCurrentFrame
    this.playedFrames += 1
  }

  private getCurrentFrame = () => {
    return this.rolls.slice(this.startOfCurrentFrame)
  }

  private isCurrentFrameLast = () => {
    return this.playedFrames === 9
  }

  private isCurrentFrameComplete = () => {
    const currentFrame = this.getCurrentFrame()
    const { length: rollsInCurrentFrame } = currentFrame
    const [first = 0, second = 0] = currentFrame
    const isStrike = first === 10

    if (!this.isCurrentFrameLast()) {
      return isStrike || rollsInCurrentFrame === 2
    }

    const isSpare = first + second
    const hasExtraRoll = isStrike || isSpare
    const rollsToCompleteLastFrame = hasExtraRoll ? 3 : 2

    return rollsInCurrentFrame === rollsToCompleteLastFrame
  }

  private isFinished = () => {
    return this.isCurrentFrameLast() && this.isCurrentFrameComplete()
  }

  private assertRoll = (pins: number) => {
    if (this.isFinished()) throw new Error()
    const maxAllowedPinAmount = this.getMaxAllowedPinAmountForCurrentRoll()
    if (pins < 0 || maxAllowedPinAmount < pins) throw new Error()
  }

  private getMaxAllowedPinAmountForCurrentRoll = () => {
    const [first, second] = this.getCurrentFrame()

    if (first === undefined) return 10

    if (!this.isCurrentFrameLast()) {
      return 10 - first
    }

    if (second === undefined) {
      return 10 - first || 10
    }

    if (first + second === 10) return 10
    if (second === 10) return 10
    return 10 - second
  }
}
