<template>
  <div>
    <div v-for="list in lists">
      <div class="panel panel-vue">
        <div class="panel-heading">
          <h3 class="panel-title">List of {{list.label}} (max. {{list.max}})</h3>
        </div>
        <div class="panel-body">
          <vddl-list  :dnd-list="list.people"
            :dnd-allowed-types="list.allowedTypes"
            :dnd-disable-if="list.people.length >= list.max">

            <vddl-draggable v-for="(person, index) in list.people" :key="person.name"
                :dnd-draggable="person"
                :dnd-type="person.type"
                :dnd-wrapper="list.people"
                :dnd-index="index"
                :dnd-disable-if="person.type == 'unknown'"
                dnd-effect-allowed="move"
                >
                {{person.name}}
            </vddl-draggable >

            <div class="dndPlaceholder">
                Drop any <strong>{{list.allowedTypes.join(' or ')}}</strong> here
            </div>
          </vddl-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vddl-item-types-demo',
  data(){
    return {
      "lists": [
        {
          "label": "Men",
          "allowedTypes": [
            "man"
          ],
          "max": 4,
          "people": [
            {
              "name": "Bob",
              "type": "man"
            },
            {
              "name": "Charlie",
              "type": "man"
            },
            {
              "name": "Dave",
              "type": "man"
            }
          ]
        },
        {
          "label": "Women",
          "allowedTypes": [
            "woman"
          ],
          "max": 4,
          "people": [
            {
              "name": "Alice",
              "type": "woman"
            },
            {
              "name": "Eve",
              "type": "woman"
            },
            {
              "name": "Peggy",
              "type": "woman"
            }
          ]
        },
        {
          "label": "People",
          "allowedTypes": [
            "man",
            "woman"
          ],
          "max": 6,
          "people": [
            {
              "name": "Frank",
              "type": "man"
            },
            {
              "name": "Mallory",
              "type": "woman"
            },
            {
              "name": "Alex",
              "type": "unknown"
            },
            {
              "name": "Oscar",
              "type": "man"
            },
            {
              "name": "Wendy",
              "type": "woman"
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
/**
 * For the correct positioning of the placeholder element, the dnd-list and
 * it's children must have position: relative
 */
.typesDemo ul[dnd-list],
.typesDemo ul[dnd-list] > li {
	position: relative;
}

/**
 * The dnd-list should always have a min-height,
 * otherwise you can't drop to it once it's empty
 */
.typesDemo ul[dnd-list] {
    padding-left: 0px;
		min-height: 40px;
}

/**
 * The dndDraggingSource class will be applied to
 * the source element of a drag operation. It makes
 * sense to hide it to give the user the feeling
 * that he's actually moving it.
 */

.typesDemo ul[dnd-list] .dndDragging{
    opacity: 0.7;
}

.typesDemo ul[dnd-list] .dndDraggingSource {
    display: none;
}

/**
 * An element with .dndPlaceholder class will be
 * added to the dnd-list while the user is dragging
 * over it.
 */
.typesDemo ul[dnd-list] .dndPlaceholder {
    display: block;
    background-color: #eee;
    min-height: 41px;
}

/**
 * The dnd-lists's child elements currently MUST have
 * position: relative. Otherwise we can not determine
 * whether the mouse pointer is in the upper or lower
 * half of the element we are dragging over. In other
 * browsers we can use event.offsetY for this.
 */
.typesDemo ul[dnd-list] li {
    background-color: #fff;
    border-bottom: 1px solid #41B883;
    display: block;
    padding: 10px 15px;
}

.typesDemo ul[dnd-list] li:last-child{
    border-bottom: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}

.typesDemo ul[dnd-list] li dnd-nodrag {
  display: block;
  padding: 10px 15px;
}

/**
 * Gender-specifc background
 */
.typesDemo ul[dnd-list] li.background-man {
  color: #41B883;
}

.typesDemo ul[dnd-list] li.background-woman {
  color: #F26B63;
}

</style>
