export class BowlingGame {
  getScore = () => {
    return 0
  }

  roll = (pins: number) => {
    this.assertPinAmount(pins)
  }

  private assertPinAmount = (pins: number) => {
    if (pins < 0 || 10 < pins) throw new Error()
  }
}
