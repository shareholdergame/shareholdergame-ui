import {StepType} from './constants'
import {MAX_PRICE, MIN_PRICE, PRICE_STEP, CARD_SET, SHARES} from './gameDescription'
import {isMe} from '../auth.js';

export function buildGameHeader(gameSet) {
    return '' //todo - implement
}

export function getCurrentPosition(game, options) {
    let players = game.players
    let rounds = game.rounds
    let roundsCount = options.cardOption.minor + options.cardOption.major

    let playersCount = players.length
    let lastRoundNumber = -1
    let lastTurnNumber = 0
    let myTurnOrder = 0
    let lastSteps = {}
    let playerPositions = {}
    let currentPrices = {}

    for (const round of rounds) {
        if (round.round > lastRoundNumber) {
            lastRoundNumber = round.round
            lastTurnNumber = round.turns.length
            for (const turn of round.turns) {
                lastSteps[turn.turn] = lastRoundNumber === 0
                    ? turn.steps[StepType.ZERO_STEP]
                    : roundsCount === round.round ? turn.steps[StepType.PRICE_CHANGE_STEP] : turn.steps[StepType.LAST_BUY_SELL_STEP]
                if (turn.turn === lastTurnNumber) {
                    currentPrices = buildCurrentPrices(lastRoundNumber === 0
                        ? turn.steps[StepType.ZERO_STEP].sharePrices
                        : turn.steps[StepType.PRICE_CHANGE_STEP].sharePrices)
                }
            }
        }
    }

    for (const player of players) {
        if (isMe(player.name)) {
            myTurnOrder = player.turnOrder
        }
        playerPositions[player.turnOrder] = buildPlayerPosition(player, lastSteps[player.turnOrder], currentPrices)
    }

    let currentRoundNumber = lastTurnNumber === playersCount ? lastRoundNumber + 1 : lastRoundNumber
    let currentTurnNumber = lastTurnNumber === playersCount ? 1 : lastTurnNumber + 1

    return {
        currentRound: currentRoundNumber,
        currentTurn: currentTurnNumber,
        myTurnOrder: myTurnOrder,
        sharePrices: currentPrices,
        playerPositions: playerPositions
    }
}

export function calculateTotal(shares, cash, prices) {
    let total = cash
    for (const shareId in shares) {
        if (shares.hasOwnProperty(shareId) && prices.hasOwnProperty(shareId)) {
            total = total + (shares[shareId].amount * prices[shareId].price)
        }
    }
    return total
}

export function calculateCanBuy(cash, price) {
    return Math.floor(cash / price)
}

export function applyCard(cardId, operations, currentPosition) {
    calculatePrices(operations, currentPosition)
}

export function resetPrices(currentPosition) {
    let sharePrices = currentPosition.sharePrices
    for (const shareId in sharePrices) {
        if (sharePrices.hasOwnProperty(shareId)) {
            sharePrices[shareId].price = sharePrices[shareId].initialPrice
        }
    }
}

export function recalculateTotal(currentPosition) {
    for (const turnOrder in currentPosition.playerPositions) {
        if (currentPosition.playerPositions.hasOwnProperty(turnOrder)) {
            let playerPosition = currentPosition.playerPositions[turnOrder]
            playerPosition.total = calculateTotal(playerPosition.shares, playerPosition.cash, currentPosition.sharePrices)
            for (const shareId of SHARES) {
                playerPosition.shares[shareId].canBuy = calculateCanBuy(playerPosition.cash, currentPosition.sharePrices[shareId].price)
            }
        }
    }
}

function calculatePrices(operations, currentPosition) {
    let priceDiff = 0
    let sharePrices = currentPosition.sharePrices
    let repurchases = []
    for (const shareId in sharePrices) {
        if (sharePrices.hasOwnProperty(shareId)) {
            let operation = operations[shareId]
            if (operation !== undefined) {
                let oldPrice = sharePrices[shareId].price
                let newPrice = calculatePrice(oldPrice, operation.operand, operation.operator)
                payCompensation(currentPosition, shareId, oldPrice, newPrice)
                if (newPrice > MAX_PRICE) {
                    priceDiff = newPrice - MAX_PRICE
                    newPrice = MAX_PRICE
                } else if (newPrice < MIN_PRICE) {
                    let repurchaseCost = calculateRepurchaseCost(oldPrice, newPrice);
                    repurchases.push({
                        shareId: shareId,
                        oldPrice: oldPrice,
                        cost: repurchaseCost,
                    })
                    newPrice = MIN_PRICE
                }
                sharePrices[shareId].price = newPrice
            }
        }
    }

    repurchases.sort((a, b) => {
        let result = a.cost - b.cost
        if (result === 0) {
            result = a.oldPrice - b.oldPrice
        }
        return result
    })

    repurchaseShares(currentPosition, repurchases)
    console.log(JSON.stringify(currentPosition))
}

function repurchaseShares(currentPosition, repurchases) {
    for (const turnOrder in currentPosition.playerPositions) {
        if (currentPosition.playerPositions.hasOwnProperty(turnOrder)) {
            if (currentPosition.playerPositions[turnOrder].turnOrder !== currentPosition.myTurnOrder) {
                let playerPosition = currentPosition.playerPositions[turnOrder]
                for (const repurchase of repurchases) {
                    if (playerPosition.shares[repurchase.shareId].amount > 0) {
                        let oldAmount = playerPosition.shares[repurchase.shareId].amount
                        playerPosition.shares[repurchase.shareId].amount = 0
                        playerPosition.shares[repurchase.shareId].repurchased = true
                        let repurchasedSharesAmount = Math.abs(Math.floor(playerPosition.cash / repurchase.cost))
                        if (repurchasedSharesAmount > 0) {
                            if (repurchasedSharesAmount > oldAmount) {
                                repurchasedSharesAmount = oldAmount
                            }
                            playerPosition.shares[repurchase.shareId].amount = repurchasedSharesAmount
                            playerPosition.cash = playerPosition.cash - (repurchase.cost * repurchasedSharesAmount)
                        }
                    }
                }
            }
        }
    }
}

function calculateRepurchaseCost(oldPrice, newPrice) {
    return MIN_PRICE - newPrice
}

function payCompensation(currentPosition, shareId, oldPrice, newPrice) {
    if (newPrice < oldPrice) {
        let playerPosition = currentPosition.playerPositions[currentPosition.currentTurn]
        let compensationSum = (oldPrice - (newPrice < MIN_PRICE ? MIN_PRICE : newPrice)) * playerPosition.shares[shareId].amount
        playerPosition.cash = playerPosition.cash + compensationSum
    } else if (newPrice > MAX_PRICE) {
        for (const turnOrder in currentPosition.playerPositions) {
            if (currentPosition.playerPositions.hasOwnProperty(turnOrder)) {
                let playerPosition = currentPosition.playerPositions[turnOrder]
                let compensationSum = (newPrice - MAX_PRICE) * playerPosition.shares[shareId].amount
                playerPosition.cash = playerPosition.cash + compensationSum
            }
        }
    }
}

function calculatePrice(oldPrice, operand, operator) {
    let result = 0
    if (operator === 'ADD') {
        result = oldPrice + operand
    } else if (operator === 'MULT') {
        result = oldPrice * operand
        if (operand < 1) {
            let reminder = result % PRICE_STEP
            result = (result === PRICE_STEP / 2 ? result : (reminder > 0 ? result + (PRICE_STEP - reminder) : result))
        }
    } else {
        throw "Unknown operand"
    }
    return result
}

function buildPlayerPosition(player, step, sharePrices) {
    let playerName = player.name
    let playerTurnOrder = player.turnOrder
    let shares = buildShares(step, sharePrices)
    return {
        name: playerName,
        turnOrder: playerTurnOrder,
        cash: step.cash,
        initialCash: step.cash,
        shares: shares,
        total: calculateTotal(shares, step.cash, sharePrices),
        playerCards: sortCards(player.playerCards)
    }
}

export function sortCards(playerCards) {
    playerCards.sort((pc, pc1) => { return CARD_SET[pc.cardId].displayOrder - CARD_SET[pc1.cardId].displayOrder})
    return playerCards
}

function buildShares(step, sharePrices) {
    let _shares = {}
    for (const shareId in step.shares) {
        if (step.shares.hasOwnProperty(shareId)) {
            _shares[shareId] = {
                id: step.shares[shareId].shareId,
                amount: step.shares[shareId].amount,
                canBuy: calculateCanBuy(step.cash, sharePrices[shareId].price),
                initialAmount: step.shares[shareId].amount,
                lockedAmount: 0,
                repurchased: false
            }
        }
    }
    return _shares
}

function buildCurrentPrices(sharePrices) {
    let sp = {}
    for (const shareId in sharePrices) {
        if (sharePrices.hasOwnProperty(shareId)) {
            sp[sharePrices[shareId].shareId] = {
                price: sharePrices[shareId].price,
                initialPrice: sharePrices[shareId].price
            }
        }
    }
    return sp
}
