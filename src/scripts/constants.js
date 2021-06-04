//export const API_BASE_URL = 'https://stockholdergame.com/stockholdergame'
export const API_BASE_URL = 'http://localhost/stockholdergame'

export const GAME_OPTIONS = {
    game_4x6: {
        cardOption: {
            major: 4,
            minor: 6
        },
        title: '4 x 6',
        description: 'Good for regular play and tournaments'
    },
    game_3x5: {
        cardOption: {
            major: 3,
            minor: 5
        },
        title: '3 x 5',
        description: 'Good for learning'
    }
}

export const InvitationStatus = {
    PENDING: 'PENDING'
}

export const InvitationAction = {
    ACCEPT: 'accept',
    REJECT: 'reject',
    CANCEL: 'cancel'
}

export const GameStatus = {
    CREATED: 'CREATED',
    RUNNING: 'RUNNING',
    FINISHED: 'FINISHED'
}

export const Colors = {
    1: '#4285F4',
    2: '#EA4335',
    3: '#FBBC05',
    4: '#34A853',
    0: '#FFFFFF'
}

export const AltColors = {
    1: '#c9dcf8',
    2: '#eac6c2',
    3: '#fcf0cd',
    4: '#bceccf'
}

export const StepType = {
    ZERO_STEP: 'ZERO_STEP',
    FIRST_BUY_SELL_STEP: 'FIRST_BUY_SELL_STEP',
    PRICE_CHANGE_STEP: 'PRICE_CHANGE_STEP',
    LAST_BUY_SELL_STEP: 'LAST_BUY_SELL_STEP',
    COMPENSATION_STEP: 'COMPENSATION_STEP',
    REPURCHASE_STEP: 'REPURCHASE_STEP'
}

export const REFRESH_INTERVAl = 10000
