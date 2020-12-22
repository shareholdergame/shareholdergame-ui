<script>
    import { getCardName, getShareId } from '../scripts/gameDescription'
    import {sortCards} from "../scripts/playGamePageMediator";
    import {GameStatus} from "../scripts/constants";
    import PlayerNameLink from './PlayerNameLink.svelte'

    export let gameStatus = GameStatus.FINISHED
    export let players = []
</script>

{#each players as player}
    <div class="row mb-1">
        <div class="col-md-2 text-right">
            <PlayerNameLink name="{player.name}"/>
        </div>
        {#each sortCards(player.playerCards) as playerCard}
            <div class="pr-1 pl-5 mr-1 text-right game-card-cell-color rounded share-color-{getShareId(playerCard.cardId)}"
                 style="width: 6em; opacity: {gameStatus === GameStatus.RUNNING && playerCard.applied ? '0.3' : '1'};">
                <strong>{getCardName(playerCard.cardId)}</strong>
            </div>
        {/each}
    </div>
{/each}
