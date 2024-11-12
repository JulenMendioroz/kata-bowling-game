import { BowlingGame } from '../BowlingGame'

describe('BowlingGame', () => {
  it('should have a starting score of 0', () => {
    const game = new BowlingGame()

    expect(game.getScore()).toBe(0)
  })

  describe('roll', () => {
    it('should not allow a negative pin amount', () => {
      const game = new BowlingGame()

      expect(() => game.roll(-1)).toThrow()
    })

    it('should not allow a pin amount greater than 10', () => {
      const game = new BowlingGame()

      expect(() => game.roll(11)).toThrow()
    })

    it("should allow a pin amount between 0 and 10", () => {
      const game = new BowlingGame()

      expect(() => game.roll(0)).not.toThrow()
      expect(() => game.roll(5)).not.toThrow()
      expect(() => game.roll(10)).not.toThrow()
    })
  })
})
