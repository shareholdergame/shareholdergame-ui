export const SHARES = [
    1,
    2,
    3,
    4
]

export const MAX_PRICE = 250
export const MIN_PRICE = 10
export const PRICE_STEP = 10

export function hasOperationForShare(card, shareId) {
    for (const operation of card.operations) {
        if (operation.shareId === shareId) {
            return true
        }
    }
    return false
}

export function getOperationsForShare(card, shareId) {
    let operations = []
    for (const operation of card.operations) {
        if (operation.shareId === shareId) {
            operations.push(operation)
        }
    }
    return operations
}

export function formatOperation(operation) {
    let operatorStr = operation.operator === 'ADD'
        ? (operation.operand < 0 ? '-' : '+') : (operation.operand < 1 ? ': ' : 'x')
    let operandStr = operation.operand < 0
        ? Math.abs(operation.operand) : (operation.operand === 1/2 ? 2 : operation.operand)
    return operatorStr + operandStr
}

export function getCardName(cardId) {
    let name = ''
    for (const operation of CARD_SET[cardId].operations) {
        if (operation.shareId !== 0) {
            name = formatOperation(operation)
        }
    }
    return name
}

export function getShareId(cardId) {
    for (const operation of CARD_SET[cardId].operations) {
        if (operation.shareId !== 0) {
            return operation.shareId
        }
    }
    return 0
}

export function isMajorCard(cardId) {
    return CARD_SET[cardId].group === 'major'
}

export const CARD_SET = {
    1: {
        cardId: 1,
        group: 'major',
        quantity: 3,
        displayName: '+100',
        baseShareId: 1,
        displayOrder: 1,
        operations: [
            {
                priceOperationId: 1,
                shareId: 1,
                operand: 100,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            },
            {
                priceOperationId: 10,
                shareId: 0,
                operand: -20,
                operator: 'ADD'
            },
            {
                priceOperationId: 11,
                shareId: 0,
                operand: -10,
                operator: 'ADD'
            }
        ]
    },
    2: {
        cardId: 2,
        group: 'major',
        quantity: 3,
        displayName: '+100',
        baseShareId: 2,
        displayOrder: 2,
        operations: [
            {
                priceOperationId: 1,
                shareId: 2,
                operand: 100,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            },
            {
                priceOperationId: 10,
                shareId: 0,
                operand: -20,
                operator: 'ADD'
            },
            {
                priceOperationId: 11,
                shareId: 0,
                operand: -10,
                operator: 'ADD'
            }
        ]
    },
    3: {
        cardId: 3,
        group: 'major',
        quantity: 3,
        displayName: '+100',
        baseShareId: 3,
        displayOrder: 3,
        operations: [
            {
                priceOperationId: 1,
                shareId: 3,
                operand: 100,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            },
            {
                priceOperationId: 10,
                shareId: 0,
                operand: -20,
                operator: 'ADD'
            },
            {
                priceOperationId: 11,
                shareId: 0,
                operand: -10,
                operator: 'ADD'
            }
        ]
    },
    4: {
        cardId: 4,
        group: 'major',
        quantity: 3,
        displayName: '+100',
        baseShareId: 4,
        displayOrder: 4,
        operations: [
            {
                priceOperationId: 1,
                shareId: 4,
                operand: 100,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            },
            {
                priceOperationId: 10,
                shareId: 0,
                operand: -20,
                operator: 'ADD'
            },
            {
                priceOperationId: 11,
                shareId: 0,
                operand: -10,
                operator: 'ADD'
            }
        ]
    },
    5: {
        cardId: 5,
        group: 'major',
        quantity: 1,
        displayName: 'x2',
        baseShareId: 1,
        displayOrder: 5,
        operations: [
            {
                priceOperationId: 12,
                shareId: 1,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 0,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    7: {
        cardId: 7,
        group: 'major',
        quantity: 1,
        displayName: 'x2',
        baseShareId: 2,
        displayOrder: 6,
        operations: [
            {
                priceOperationId: 12,
                shareId: 2,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 0,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    9: {
        cardId: 9,
        group: 'major',
        quantity: 1,
        displayName: 'x2',
        baseShareId: 3,
        displayOrder: 7,
        operations: [
            {
                priceOperationId: 12,
                shareId: 3,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 0,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    11: {
        cardId: 11,
        group: 'major',
        quantity: 1,
        displayName: 'x2',
        baseShareId: 4,
        displayOrder: 8,
        operations: [
            {
                priceOperationId: 12,
                shareId: 4,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 0,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    6: {
        cardId: 6,
        group: 'major',
        quantity: 1,
        displayName: ':2',
        baseShareId: 1,
        displayOrder: 9,
        operations: [
            {
                priceOperationId: 12,
                shareId: 0,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 1,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    8: {
        cardId: 8,
        group: 'major',
        quantity: 1,
        displayName: ':2',
        baseShareId: 2,
        displayOrder: 10,
        operations: [
            {
                priceOperationId: 12,
                shareId: 0,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 2,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    10: {
        cardId: 10,
        group: 'major',
        quantity: 1,
        displayName: ':2',
        baseShareId: 3,
        displayOrder: 11,
        operations: [
            {
                priceOperationId: 12,
                shareId: 0,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 3,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    12: {
        cardId: 12,
        group: 'major',
        quantity: 1,
        displayName: ':2',
        baseShareId: 4,
        displayOrder: 12,
        operations: [
            {
                priceOperationId: 12,
                shareId: 0,
                operand: 2,
                operator: 'MULT'
            },
            {
                priceOperationId: 13,
                shareId: 4,
                operand: 1/2,
                operator: 'MULT'
            }
        ]
    },
    13: {
        cardId: 13,
        group: 'minor',
        quantity: 1,
        displayName: '+30',
        baseShareId: 1,
        displayOrder: 13,
        operations: [
            {
                priceOperationId: 5,
                shareId: 1,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 0,
                operand: -60,
                operator: 'ADD'
            }
        ]
    },
    21: {
        cardId: 21,
        group: 'minor',
        quantity: 1,
        displayName: '+40',
        baseShareId: 1,
        displayOrder: 14,
        operations: [
            {
                priceOperationId: 4,
                shareId: 1,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 0,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    29: {
        cardId: 29,
        group: 'minor',
        quantity: 1,
        displayName: '+50',
        baseShareId: 1,
        displayOrder: 15,
        operations: [
            {
                priceOperationId: 3,
                shareId: 1,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 0,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    37: {
        cardId: 37,
        group: 'minor',
        quantity: 1,
        displayName: '+60',
        baseShareId: 1,
        displayOrder: 16,
        operations: [
            {
                priceOperationId: 2,
                shareId: 1,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    15: {
        cardId: 15,
        group: 'minor',
        quantity: 1,
        displayName: '+30',
        baseShareId: 2,
        displayOrder: 17,
        operations: [
            {
                priceOperationId: 5,
                shareId: 2,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 0,
                operand: -60,
                operator: 'ADD'
            }
        ]
    },
    23: {
        cardId: 23,
        group: 'minor',
        quantity: 1,
        displayName: '+40',
        baseShareId: 2,
        displayOrder: 18,
        operations: [
            {
                priceOperationId: 4,
                shareId: 2,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 0,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    31: {
        cardId: 31,
        group: 'minor',
        quantity: 1,
        displayName: '+50',
        baseShareId: 2,
        displayOrder: 19,
        operations: [
            {
                priceOperationId: 3,
                shareId: 2,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 0,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    39: {
        cardId: 39,
        group: 'minor',
        quantity: 1,
        displayName: '+60',
        baseShareId: 2,
        displayOrder: 20,
        operations: [
            {
                priceOperationId: 2,
                shareId: 2,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    17: {
        cardId: 17,
        group: 'minor',
        quantity: 1,
        displayName: '+30',
        baseShareId: 3,
        displayOrder: 21,
        operations: [
            {
                priceOperationId: 5,
                shareId: 3,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 0,
                operand: -60,
                operator: 'ADD'
            }
        ]
    },
    25: {
        cardId: 25,
        group: 'minor',
        quantity: 1,
        displayName: '+40',
        baseShareId: 3,
        displayOrder: 22,
        operations: [
            {
                priceOperationId: 4,
                shareId: 3,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 0,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    33: {
        cardId: 33,
        group: 'minor',
        quantity: 1,
        displayName: '+50',
        baseShareId: 3,
        displayOrder: 23,
        operations: [
            {
                priceOperationId: 3,
                shareId: 3,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 0,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    41: {
        cardId: 41,
        group: 'minor',
        quantity: 1,
        displayName: '+60',
        baseShareId: 3,
        displayOrder: 24,
        operations: [
            {
                priceOperationId: 2,
                shareId: 3,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    19: {
        cardId: 19,
        group: 'minor',
        quantity: 1,
        displayName: '+30',
        baseShareId: 4,
        displayOrder: 25,
        operations: [
            {
                priceOperationId: 5,
                shareId: 4,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 0,
                operand: -60,
                operator: 'ADD'
            }
        ]
    },
    27: {
        cardId: 27,
        group: 'minor',
        quantity: 1,
        displayName: '+40',
        baseShareId: 4,
        displayOrder: 26,
        operations: [
            {
                priceOperationId: 4,
                shareId: 4,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 0,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    35: {
        cardId: 35,
        group: 'minor',
        quantity: 1,
        displayName: '+50',
        baseShareId: 4,
        displayOrder: 27,
        operations: [
            {
                priceOperationId: 3,
                shareId: 4,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 0,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    43: {
        cardId: 43,
        group: 'minor',
        quantity: 1,
        displayName: '+60',
        baseShareId: 4,
        displayOrder: 28,
        operations: [
            {
                priceOperationId: 2,
                shareId: 4,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 0,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    38: {
        cardId: 38,
        group: 'minor',
        quantity: 1,
        displayName: '-30',
        baseShareId: 1,
        displayOrder: 29,
        operations: [
            {
                priceOperationId: 2,
                shareId: 0,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 1,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    30: {
        cardId: 30,
        group: 'minor',
        quantity: 1,
        displayName: '-40',
        baseShareId: 1,
        displayOrder: 30,
        operations: [
            {
                priceOperationId: 3,
                shareId: 0,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 1,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    22: {
        cardId: 22,
        group: 'minor',
        quantity: 1,
        displayName: '-50',
        baseShareId: 1,
        displayOrder: 31,
        operations: [
            {
                priceOperationId: 4,
                shareId: 0,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 1,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    14: {
        cardId: 14,
        group: 'minor',
        quantity: 1,
        displayName: '-60',
        baseShareId: 1,
        displayOrder: 32,
        operations: [
            {
                priceOperationId: 5,
                shareId: 0,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 1,
                operand: -60,
                operator: 'ADD'
            }
        ]
    },
    40: {
        cardId: 40,
        group: 'minor',
        quantity: 1,
        displayName: '-30',
        baseShareId: 2,
        displayOrder: 33,
        operations: [
            {
                priceOperationId: 2,
                shareId: 0,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 2,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    32: {
        cardId: 32,
        group: 'minor',
        quantity: 1,
        displayName: '-40',
        baseShareId: 2,
        displayOrder: 34,
        operations: [
            {
                priceOperationId: 3,
                shareId: 0,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 2,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    24: {
        cardId: 24,
        group: 'minor',
        quantity: 1,
        displayName: '-50',
        baseShareId: 2,
        displayOrder: 35,
        operations: [
            {
                priceOperationId: 4,
                shareId: 0,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 2,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    16: {
        cardId: 16,
        group: 'minor',
        quantity: 1,
        displayName: '-60',
        baseShareId: 2,
        displayOrder: 36,
        operations: [
            {
                priceOperationId: 5,
                shareId: 0,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 2,
                operand: -60,
                operator: 'ADD'
            }
        ]
    },
    42: {
        cardId: 42,
        group: 'minor',
        quantity: 1,
        displayName: '-30',
        baseShareId: 3,
        displayOrder: 37,
        operations: [
            {
                priceOperationId: 2,
                shareId: 0,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 3,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    34: {
        cardId: 34,
        group: 'minor',
        quantity: 1,
        displayName: '-40',
        baseShareId: 3,
        displayOrder: 38,
        operations: [
            {
                priceOperationId: 3,
                shareId: 0,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 3,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    26: {
        cardId: 26,
        group: 'minor',
        quantity: 1,
        displayName: '-50',
        baseShareId: 3,
        displayOrder: 39,
        operations: [
            {
                priceOperationId: 4,
                shareId: 0,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 3,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    18: {
        cardId: 18,
        group: 'minor',
        quantity: 1,
        displayName: '-60',
        baseShareId: 3,
        displayOrder: 40,
        operations: [
            {
                priceOperationId: 5,
                shareId: 0,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 3,
                operand: -60,
                operator: 'ADD'
            }
        ]
    },
    44: {
        cardId: 44,
        group: 'minor',
        quantity: 1,
        displayName: '-30',
        baseShareId: 4,
        displayOrder: 41,
        operations: [
            {
                priceOperationId: 2,
                shareId: 0,
                operand: 60,
                operator: 'ADD'
            },
            {
                priceOperationId: 9,
                shareId: 4,
                operand: -30,
                operator: 'ADD'
            }
        ]
    },
    36: {
        cardId: 36,
        group: 'minor',
        quantity: 1,
        displayName: '-40',
        baseShareId: 4,
        displayOrder: 42,
        operations: [
            {
                priceOperationId: 3,
                shareId: 0,
                operand: 50,
                operator: 'ADD'
            },
            {
                priceOperationId: 8,
                shareId: 4,
                operand: -40,
                operator: 'ADD'
            }
        ]
    },
    28: {
        cardId: 28,
        group: 'minor',
        quantity: 1,
        displayName: '-50',
        baseShareId: 4,
        displayOrder: 43,
        operations: [
            {
                priceOperationId: 4,
                shareId: 0,
                operand: 40,
                operator: 'ADD'
            },
            {
                priceOperationId: 7,
                shareId: 4,
                operand: -50,
                operator: 'ADD'
            }
        ]
    },
    20: {
        cardId: 20,
        group: 'minor',
        quantity: 1,
        displayName: '-60',
        baseShareId: 4,
        displayOrder: 44,
        operations: [
            {
                priceOperationId: 5,
                shareId: 0,
                operand: 30,
                operator: 'ADD'
            },
            {
                priceOperationId: 6,
                shareId: 4,
                operand: -60,
                operator: 'ADD'
            }
        ]
    }
}
