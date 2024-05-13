import King from '../../../src/models/pieces/king.js'
import Pawn from '../../../src/models/pieces/pawn.js'
import Board from '../../../src/models/board.js'
import Player from '../../../src/models/player.js'
import Square from '../../../src/models/square.js'

describe('King', () => {
  let board
  beforeEach(() => (board = new Board()))

  it('can move to adjacent squares', () => {
    const king = new King(Player.WHITE)
    board.setPiece(Square.at(3, 4), king)

    const moves = king.getAvailableMoves(board)

    const expectedMoves = [
      Square.at(2, 3),
      Square.at(2, 4),
      Square.at(2, 5),
      Square.at(3, 5),
      Square.at(4, 5),
      Square.at(4, 4),
      Square.at(4, 3),
      Square.at(3, 3),
    ]

    assert.deepEqual(new Set(moves), new Set(expectedMoves))
  })

  it('cannot make any other moves', () => {
    const king = new King(Player.WHITE)
    board.setPiece(Square.at(3, 4), king)

    const moves = king.getAvailableMoves(board)

    assert.equal(moves.length, 8, '`moves` does not have length 8')
  })

  it('cannot leave the board', () => {
    const king = new King(Player.WHITE)
    board.setPiece(Square.at(0, 0), king)

    const moves = king.getAvailableMoves(board)

    const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)]

    assert.deepEqual(new Set(moves), new Set(expectedMoves))
  })

  it('can take opposing pieces', () => {
    const king = new King(Player.WHITE)
    const opposingPiece = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), king)
    board.setPiece(Square.at(5, 5), opposingPiece)

    const moves = king.getAvailableMoves(board)

    assert(
      moves.some(Square.at(5, 5)),
      '`moves` does not contain the square (5, 5)'
    )
  })

  it('cannot take the opposing king', () => {
    const king = new King(Player.WHITE)
    const opposingKing = new King(Player.BLACK)
    board.setPiece(Square.at(4, 4), king)
    board.setPiece(Square.at(5, 5), opposingKing)

    const moves = king.getAvailableMoves(board)

    assert(!moves.some(Square.at(5, 5)), '`moves` contains the square (5, 5)')
  })

  it('cannot take friendly pieces', () => {
    const king = new King(Player.WHITE)
    const friendlyPiece = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), king)
    board.setPiece(Square.at(5, 5), friendlyPiece)

    const moves = king.getAvailableMoves(board)

    assert(!moves.some(Square.at(5, 5)), '`moves` contains the square (5, 5)')
  })
})
