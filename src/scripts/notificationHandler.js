import {currentPath, reloadPage, newChatMessagesCount, gameIds} from "../stores.js";

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
    let messageNotifCount = 0
    let notifGameIds = []
    for (const notification of notifications) {
        if (notification.type === 'GAME_STARTED' || notification.type === 'MOVE_DONE'
            || notification.type === 'GAME_FINISHED') {
            notifReqRefresh = true
            notifGameIds.push(notification.body.gameId)
        } else if (notification.type === 'MESSAGE_RECEIVED') {
            messageNotifCount++
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
    if (messageNotifCount > 0) {
        newChatMessagesCount.set(messageNotifCount)
    }
}
