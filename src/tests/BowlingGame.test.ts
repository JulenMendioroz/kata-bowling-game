import { BowlingGame } from '../BowlingGame'

describe('BowlingGame', () => {
  it('should have a starting score of 0', () => {
    const game = new BowlingGame()

    expect(game.getScore()).toBe(0)
  })

  describe('Roll', () => {
    it('should not allow a negative pin amount', () => {
      const game = new BowlingGame()

      expect(() => game.roll(-1)).toThrow()
    })

    it('should allow a pin amount of 0', () => {
      const game = new BowlingGame()

      expect(() => game.roll(0)).not.toThrow()
    })

    it('should allow a pin amount between 0 and 10', () => {
      const game = new BowlingGame()

      expect(() => game.roll(5)).not.toThrow()
    })

    it('should allow a pin amount of 10', () => {
      const game = new BowlingGame()

      expect(() => game.roll(10)).not.toThrow()
    })

    it('should not allow a pin amount greater than 10', () => {
      const game = new BowlingGame()

      expect(() => game.roll(11)).toThrow()
    })
  })

  describe('Frame', () => {
    it.each([
      // prettier-ignore
      { rolls: [7, 5] },
      { rolls: [10, 3, 8] },
      { rolls: [7, 3, 9, 4] },
      { rolls: [2, 8, 10, 5, 10] },
    ])('should not allow to roll more than 10 pins: $rolls', ({ rolls }) => {
      const game = new BowlingGame()

      expect(() => rolls.forEach(game.roll)).toThrow()
    })

    it('should allow to chain spares', () => {
      const game = new BowlingGame()

      expect(() => [7, 3, 2, 8].forEach(game.roll)).not.toThrow()
    })

    it('should allow to strike after a spare', () => {
      const game = new BowlingGame()

      expect(() => [7, 3, 10].forEach(game.roll)).not.toThrow()
    })

    it('should allow to spare after a strike', () => {
      const game = new BowlingGame()

      expect(() => [10, 9, 1].forEach(game.roll)).not.toThrow()
    })

    it('should allow to chain strikes', () => {
      const game = new BowlingGame()

      expect(() => [10, 10].forEach(game.roll)).not.toThrow()
    })
  })

  const worstGame = Array.from({ length: 20 }, () => 0)
  const gameWithMostRolls = [...Array.from({ length: 19 }, () => 0), 10, 0]
  const bestGame = Array.from({ length: 12 }, () => 10)

  it.each([
    { case: 'worst game', rolls: worstGame },
    { case: 'game with most rolls', rolls: gameWithMostRolls },
    { case: 'best game', rolls: bestGame },
  ])('should not allow to roll when $case is finished', ({ rolls }) => {
    const game = new BowlingGame()

    rolls.forEach(game.roll)

    expect(() => game.roll(0)).toThrow()
  })
})
