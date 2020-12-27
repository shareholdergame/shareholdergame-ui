import { authenticated } from  './stores.js'

import SecuredLayout from './views/layout/Layout.svelte'
import HomePage from './views/secured/HomePage.svelte'
import GamesArchivePage from './views/secured/GamesArchivePage.svelte'
import SelectGameOptionPage from './views/secured/newgame/SelectGameOptionPage.svelte'
import InviteUserPage from './views/secured/newgame/InviteUserPage.svelte'
import PlayGamePage from './views/secured/PlayGamePage.svelte'
import LandingPage from './views/public/IndexPage.svelte'
import SignInPage from './views/public/SignInPage.svelte'
import SignUpPage from './views/public/SignUpPage.svelte'
import PlayersPage from './views/secured/PlayersPage.svelte'
import ProfilePage from './views/secured/ProfilePage.svelte'
import AchievementsPage from './views/secured/AchievementsPage.svelte'
import AboutPage from './views/public/AboutPage.svelte'
import ConfirmationPage from './views/public/ConfirmationPage.svelte'

let is_authenticated = false;

function isAuthenticated() {
    return is_authenticated;
}

function isNotAuthenticated() {
    return !is_authenticated;
}

authenticated.subscribe(value => {
    is_authenticated = value;
})

const routes = [
    {
        name: '/',
        component: LandingPage
    },
    {
        name: 'signin',
        component: SignInPage
    },
    {
        name: 'signup',
        component: SignUpPage
    },
    {
        name: 'about',
        component: AboutPage
    },
    {
        name: 'verification/:verificationcode',
        component: ConfirmationPage
    },
    {
        name: 'secure',
        component: SecuredLayout,
        onlyIf: { guard: isAuthenticated, redirect: '/signin' },
        nestedRoutes: [
            {
                name: 'home',
                component: HomePage,
                layout: SecuredLayout
            },
            {
                name: 'newgame',
                layout: SecuredLayout,
                nestedRoutes: [
                    {
                        name: 'index',
                        component: SelectGameOptionPage
                    },
                    {
                        name: 'inviteuser/:gameoption',
                        component: InviteUserPage
                    }
                ]
            },
            {
                name: 'gamesarchive',
                component: GamesArchivePage,
                layout: SecuredLayout
            },
            {
                name: 'playgame/:gameid',
                component: PlayGamePage,
                layout: SecuredLayout
            },
            {
                name: 'players',
                component: PlayersPage,
                layout: SecuredLayout
            },
            {
                name: 'profile',
                component: ProfilePage,
                layout: SecuredLayout
            },
            {
                name: 'player/:playername',
                component: AchievementsPage,
                layout: SecuredLayout
            }
        ]
    }
]

export {routes}
