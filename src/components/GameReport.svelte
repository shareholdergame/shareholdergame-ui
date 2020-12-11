<script>
    import RoundsList from './RoundsList.svelte'

    export let game = {}
    export let players = []
    export let rounds = []
</script>

<RoundsList rounds="{rounds}"/>
