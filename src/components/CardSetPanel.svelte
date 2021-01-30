<script>
    import { getCardName, getShareId, isMajorCard } from '../scripts/gameDescription'
    import {isMe} from "../auth";
    import {sortCards} from "../scripts/playGamePageMediator";
    import {GameStatus} from "../scripts/constants";
    import PlayerNameLink from './PlayerNameLink.svelte'

    export let gameStatus = GameStatus.FINISHED
    export let players = []
</script>

{#each players as player}
    <div class="row mb-1">
        <div class="col-sm-2 text-right">
            <PlayerNameLink name="{player.name}"/>
        </div>
        <div class="col-sm-3 mr-3 d-inline-flex">
            {#each sortCards(player.playerCards) as playerCard}
                {#if isMajorCard(playerCard.cardId)}
                    <div class="pr-1 mr-1 text-right game-card-cell-color rounded share-color-{getShareId(playerCard.cardId)}"
                         style="width: 5em; opacity: {gameStatus === GameStatus.RUNNING && playerCard.applied && isMe(player.name) ? '0.3' : '1'};">
                        <strong>{getCardName(playerCard.cardId)}</strong>
                    </div>
                {/if}
            {/each}
        </div>
        <div class="col-sm-4 mr-3 d-inline-flex">
            {#each sortCards(player.playerCards) as playerCard}
                {#if !isMajorCard(playerCard.cardId)}
                    <div class="pr-1 mr-1 text-right game-card-cell-color rounded share-color-{getShareId(playerCard.cardId)}"
                         style="width: 4em; opacity: {gameStatus === GameStatus.RUNNING && playerCard.applied && isMe(player.name) ? '0.3' : '1'};">
                        <strong>{getCardName(playerCard.cardId)}</strong>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/each}
