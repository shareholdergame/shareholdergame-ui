import {currentPath} from "../stores.js";

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
    for (const notification of notifications) {
        notifReqRefresh = notification.type === 'MOVE_DONE'
    }
    for (const page of refreshablePages) {
        if (_currentPath.includes(page)) {
            pageNeedRefresh = true
        }
    }
    if (pageNeedRefresh && notifReqRefresh) {
        location.reload()
    }
}
