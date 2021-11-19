import {currentPath, reloadPage, gameIds} from "../stores.js";

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
    let notifGameIds = []
    for (const notification of notifications) {
        notifReqRefresh = notification.type === 'GAME_STARTED' || notification.type === 'MOVE_DONE'
            || notification.type === 'GAME_FINISHED'
        notifGameIds.push(notification.body.gameId)
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
}
