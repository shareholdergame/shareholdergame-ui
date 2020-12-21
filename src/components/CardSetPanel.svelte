<script>
    import { getCardName, getShareId } from '../scripts/gameDescription'
    import {sortCards} from "../scripts/playGamePageMediator";
    import PlayerNameLink from './PlayerNameLink.svelte'

    export let players = []
</script>

{#each players as player}
    <div class="row mb-1">
        <div class="col-md-2 text-right">
            <PlayerNameLink name="{player.name}"/>
        </div>
        {#each sortCards(player.playerCards) as playerCard}
            <div class="pr-1 pl-5 mr-1 text-right game-card-cell-color rounded share-color-{getShareId(playerCard.cardId)}" style="width: 6em;">
                <strong>{getCardName(playerCard.cardId)}</strong>
            </div>
        {/each}
    </div>
{/each}
