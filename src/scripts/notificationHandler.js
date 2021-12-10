import {currentPath, reloadPage, newChatMessages, gameIds} from "../stores.js";

let _currentPath

currentPath.subscribe(value => {
    _currentPath = value
})

const refreshablePages = [
    'home',
    'playgame',
    'gamesarchive'
]

export function handleNotifications(notifications) {
    let pageNeedRefresh = false
    let notifReqRefresh = false
    let messageNotifications = []
    let notifGameIds = []
    for (const notification of notifications) {
        if (notification.type === 'GAME_STARTED' || notification.type === 'MOVE_DONE'
            || notification.type === 'GAME_FINISHED') {
            notifReqRefresh = true
            notifGameIds.push(notification.body.gameId)
        } else if (notification.type === 'MESSAGE_RECEIVED') {
            messageNotifications.push(notification.body)
        }
    }
    for (const page of refreshablePages) {
        if (_currentPath.includes(page)) {
            pageNeedRefresh = true
        }
    }
    if (pageNeedRefresh && notifReqRefresh) {
        reloadPage.set(true)
        gameIds.set(notifGameIds)
    }
    if (messageNotifications.length > 0) {
        newChatMessages.set(messageNotifications)
    }
}
