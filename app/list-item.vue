//list-item.vue

<style lang="sass">

</style>

<template lang="pug">
	h2.red {{msg}} {{$route.params.id}}
</template>

<script>
	module.exports = {
		data: function() {
			return {
				msg: 'List Item View! '
			}
		},
		watch: {
			'$route': function(to, from) {

			}
		}
	}
</script>