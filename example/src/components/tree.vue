<template>

	<vddl-draggable
			:draggable="item"
			:index="index"
			:disable-if="disable"
			:selected="selectEvent"
			:moved="moveEvent"
			:wrapper="list"
			:class="{'selected': selectedItem === item}"
	>
		<div v-if="item.id_type === 1" >
			<div v-if="!isHidden"
				 class="vddl-tree-item"
				 :title="getLabel"

				 @mouseover="onMouseOver"
				 @mouseout="onMouseOut"
			>
				<span class="icon open-close" :class="{open: isOpen}" @click="toggleOpen">
					<i aria-hidden="true"></i>
				</span>
				<span class="icon node" v-show="!isLoading"><i :class="{'open': isOpen}"></i></span>
				<span class="icon is-loading" v-show="isLoading"></span>
				<span class="vddl-label" :class="{'has-cursor-pointer': hasSelectedEvent}">{{getLabel}}</span>

				<span class="vddl-actions">
					<tree-icon v-for="icon in icons" :model="icon" :key="icon.title" :item="item"/>
				</span>

			</div>
			<vddl-list
					:class="{'vddl-root': isRootHidden}"
					:data-id="itemId"
					v-show="isOpen"
					:key="itemId"
					:list="children"
					:disable-if="disable"
					:external-sources="true"
					:drop="dropEvent"
			>
				<tree v-for="(child, number) in children"
					  :key="child.id_node"
					  :item="child"
					  :list="children"
					  :index="number"
					  :first="false"
					  :selected="selectEvent"
					  :selected-item="selectedItem"
					  :dropped="dropped"
					  :moved="moved"
					  :disable="children.disable"

					  :itemKey="itemKey"
					  :itemLabel="itemLabel"
					  :itemLabelAlt="itemLabelAlt"

					  :apiMode="apiMode"
					  :apiUrl="apiUrl"
					  :httpOptions="httpOptions"
					  :httpFetch="httpFetch"
					  :httpMethod="httpMethod"

					  :icons="icons"
					  :refreshEventName="refreshEventName"
					  :hoverClassName="hoverClassName"
				>
				</tree>
			</vddl-list>
		</div>
		<div v-else>
			<div class="vddl-tree-item"
				 :title="getLabel"

				 @mouseover="onMouseOver"
				 @mouseout="onMouseOut"
			>
				<span class="icon leaf"><i></i></span>
				<span class="vddl-label" :class="{'has-cursor-pointer': hasSelectedEvent}">{{getLabel}} </span>
			</div>
		</div>
	</vddl-draggable>
</template>

<script>

	import Tree from './tree'
	import TreeIcon from './tree-icon'

	export default {
		name: 'Tree',
		components: {
			Tree,
			TreeIcon
		},
		props: {
			item: {},
			height: {type: Number, default: 22},

			list: {
				type: Array,
				default() {
					return []
				}
			},
			itemLabel: {
				type: String,
				default: null
			},
			itemLabelAlt: {
				type: String,
				default: null
			},
			icons: {
				type: Array,
				default: function () {
					return []
				}
			},
			index: {
				type: [String, Number],
				default: 0
			},
			selected: {},
			selectedItem: {},
			moved: {
				type: Function,
				default: function(){}
			},
			copied: {
				type: Function,
				default: function(){}
			},
			dropped: {
				type: Function,
				default: function(){}
			},
			disable: {
				type: Boolean,
				default: false
			},
			apiMode: {
				type: Boolean,
				default: false
			},
			apiUrl: {
				type: String,
				default: ''
			},
			httpOptions: {
				type: Object,
				default () {
					return {}
				}
			},
			httpFetch: {
				type: Function,
				default: null
			},
			httpMethod: {
				type: String,
				default: 'get',
				validator: (value) => {
					return ['get', 'post'].indexOf(value) > -1
				}
			},
			itemKey: {
				type: String,
				default: null
			},
			loadOnStart: {
				type: Boolean,
				default: false
			},
			hideRoot: {
				type: Boolean,
				default: false
			},
			first: {
				type: Boolean,
				default: true
			},
			refreshEventName: {
				type: String,
				default: null
			},
			hoverClassName: {
				type: String,
				default: "hover"
			}

		},
		data() {
			return {
				isOpen: false,
				isLoading: false,
				children: [],
				droppedIn: null
			}
		},
		mounted() {
			if (this.loadOnStart || (this.isRootHidden))
			{
				this.toggleOpen();
			}
		},
		computed: {
			isContainer() {
				return this.item.id_type === 1
			},
			isApiMode () {
				return this.apiMode
			},
			isRootHidden(){
				return this.hideRoot && this.first;
			},
			isHidden()
			{
				return this.isRootHidden;
			},
			hasSelectedEvent()
			{
				return typeof(this.selected) === 'function';
			},
			itemId() {
				return this.item[this.itemKey] ? this.item[this.itemKey] : this.index;
			},
			getLabel() {
				return this.item[this.itemLabel] ? this.item[this.itemLabel] : (
					this.item[this.itemLabelAlt] ? this.item[this.itemLabelAlt] : (
						this.item[this.itemKey] ? this.item[this.itemKey] : this.index
					)
				);
			}
		},
		methods: {

			// Decide if it's this item to refresh
			refresh(idParent) {
				if (idParent === this.item.id_node)
					this.loadData();
			},

			// Detect hover
			onMouseOver(e) {
				e.stopPropagation();
				this.detectTarget(e.target, true);
			},
			onMouseOut(e) {
				e.stopPropagation();
				this.detectTarget(e.target, false);
			},

			// Find target to apply hover
			detectTarget(target, addOrRemove) {

				// If it's not root
				if (this.item.id_node !== 0) {

					// If it's a folder
					if (this.item.id_type === 1) {

						let targetToRemove = this.findTreeItem(target);

						while (target.classList[0] !== "vddl-draggable")
							target = target.parentNode;

						this.changeClass(targetToRemove, false);
						this.changeClass(target, addOrRemove);

					} else {

						target = this.findTreeItem(target);

						this.changeClass(target, addOrRemove);
					}
				}
			},

			// Find vddl-tree-item target
			findTreeItem(target) {
				while (target.classList[0] !== "vddl-tree-item")
					target = target.parentNode;

				return target
			},

			// Apply hover
			changeClass(target, addOrRemove) {
				if (addOrRemove) {
					target.classList.add(this.hoverClassName);
				} else
					target.classList.remove(this.hoverClassName);
			},

			selectEvent(item, target) {
				if (typeof(this.selected) === 'function' && target.classList && target.classList.contains('vddl-label') ) {
					this.selected(item, target);
				}
			},

			/**
			 * @param obj.		Ref. to item's destination.
			 * 					{
			 * 						list: 		Array of items where the item is dropped in.
			 * 						index: 		Index of the position where the item is dropped
			 * 						item:		Item data object
			 * 					}
			 *
			 */
			dropEvent(obj)
			{
				// After 50ms, so the moveEvent had the time to remove the previous item
				// if the target is the same than the origin
				setTimeout(()=>{
					obj.list.splice(obj.index, 0, obj.item);
					this.dropped(obj, this.item);
				}, 25);

				return true;
			},

			/**
			 *
			 * @param obj.		Ref. to item's origin.
			 * 					{
			 * 						list: 		Array of items from where the item comes from.
			 * 						index: 		Index of the item in the source list
			 * 						draggable: 	Item data object
			 * 					}
			 */
			moveEvent(obj)
			{
				// Remove the item from the original list
				obj.list.splice(obj.index, 1);
				this.moved(obj.draggable);
			},

			toggleOpen()
			{
				this.isOpen = !this.isOpen;

				if (this.isOpen)
					this.loadData();
			},

			loadData(success = this.loadSuccess, failed = this.loadFailed)
			{
				if (this.isApiMode)
				{
					this.isLoading = true;

					this.httpOptions['params'] = this.item;

					let url = this.apiUrl + (this.itemKey ? this.item[this.itemKey] : '');

					this.fetch(url, this.httpOptions).then(
						success,
						failed
					).catch(() => failed());
				}
				else
				{
					if (this.item.children)
						this.children = this.item.children;
				}
			},

			fetch (apiUrl, httpOptions)
			{
				/*
				return this.httpFetch
					? this.httpFetch(apiUrl, httpOptions)
					: axios[this.httpMethod](apiUrl, httpOptions)
				*/
				if (this.httpFetch)
					this.httpFetch(apiUrl, httpOptions);

			},

			loadSuccess (response)
			{
				this.children = response.data;

				this.isLoading = false;
			},

			loadFailed (response){}
		}
	}

</script>

<style lang="less">
	@import '../styles/tree.less';

	.vddl-tree .vddl-label{
		font-size: 1rem;
		margin-left:.3rem
	}

	.vddl-tree .vddl-list {
		padding-left: 1.2rem;
		min-height: 4px;
	}
	.vddl-tree .icon.leaf {
		margin-left: 1.2rem;
	}
	.vddl-tree .vddl-placeholder {
		height: 1.2rem;
		background: #eee;
	}

	.icon {
		width: 1.2rem;
		height: 1.2rem;
		display: block;
		float: left;
		text-align: center;
	}

	.icon i{

		display: inline-block;
		font: normal normal normal 14px/1 icomoon;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon {
		&.leaf{
			color: gray;
			i:before{
				content: "\e926";
			}
		}
		&.node{
			color: orange;
			i:before{
				content: "\e92f";
			}
			i.open:before{
				content: "\e930";
			}
		}
		&.open-close {
			&.open {
				i:before {
					content: "-"
				}
			}
			i:before {
				content: "+";
			}
		}
	}

</style>
