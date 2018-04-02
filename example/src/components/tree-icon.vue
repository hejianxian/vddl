<template>

	<span class="icon right" @click="onClick">
		<i  class="fa" :class="[`fa-${model.icon}`]" aria-hidden="true" :title="model.title"></i>
	</span>

</template>

<script>

	export default {
		name: 'TreeIcon',
		props: {
			model: {
				type: Object,
				default: function () {
					return {
						icon: '',
						title: '',
						click: null,
						onClick: function(){},
						event: {
							name: null,
							bus: null
						}
					}
				}
			},
			item: {
				type: Object,
				default: null
			}
		},
		methods: {
			onClick()
			{
				if (typeof(this.model.click === 'function'))
				{
					this.model.click(this.item);
				}
			}
		}
	}

</script>