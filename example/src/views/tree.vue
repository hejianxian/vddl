<template lang="html">
	<div class="demo-content tree">
		<v-title>Tree</v-title>
		<div class="v-row">

			<div class="vddl-tree">

				<tree :item="staticData"
					   itemKey="id_node"
					   itemLabel="label"
					   itemLabelAlt="code"

					   :selected="handleSelect"
					   :moved="handleMove"
					   :dropped="handleDrop"
				/>

			</div>
		</div>

	</div>
</template>
<script>

	import Tree from '../components/tree.vue';

	export default {
		name: 'vTree',
		components: {
			Tree
		},
		props: {},
		data() {

			return {
				staticData: {
					"id_type": 1,
					"id_node": 1,
					"label" : "Root folder",
					isRoot: true,

					"children": [
						{
							"id_type": 2,
							"id_node": 2,
							"label" : "File",
						},
						{
							"id_type": 2,
							"id_node": 3,
							"label" : "Lorem",
						},
						{
							"id_type": 1,
							"id_node": 4,
							"label" : "Folder",
							"children" : [
								{
									"id_type": 2,
									"id_node": 5,
									"label" : "Ipsum"
								},
								{
									"id_type": 2,
									"id_node": 6,
									"label" : "Merol"
								},
								{
									"id_type": 2,
									"id_node": 7,
									"label" : "Muspi",
								}
							]
						}
					]
				},

			}
		},
		methods: {

			handleSelect(item, target)
			{
				console.log('selected');
				/*
				this.sourceItemTitle = 'Selection';
				this.sourceItem = item;

				this.destItemTitle = null;
				this.destItem = null;
				*/
			},

			/**
			 *
			 * @param obj.	Ref. to item's origin.
			 * 				{
			 * 					list: 		Array of items from where the item comes from.
			 * 					index: 		Index of the item in the source list
			 * 					item: 		Dragged Item data object
			 * 				}
			 * @param obj
			 * @param dest
			 */
			handleDrop(obj, dest)
			{
				console.log('dropped');
				/*
				this.sourceItemTitle = 'Element';
				this.sourceItem = obj.item;

				this.destItemTitle = 'Dropped on';
				this.destItem = dest;
				*/
			},

			// From obj

			handleMove(obj)
			{
				console.log('moved');
				/*
				this.sourceItemTitle = 'Moved';
				this.sourceItem = obj;

				this.destItemTitle = null;
				this.destItem = null;
				*/
			},

		}
	}

</script>

<style>


</style>