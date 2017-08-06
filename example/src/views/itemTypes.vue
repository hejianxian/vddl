<template>
  <div class="demo-content">
    <v-title>Item types</v-title>
    <div class="v-row">
      <div class="v-col--auto" v-for="list in lists">
        <div class="panel">
          <div class="panel__heading">
            <h3 class="">List of {{list.label}} (max. {{list.max}})</h3>
          </div>
          <div class="panel__body">
            <vddl-list class="panel__body--list" :list="list.people"
              :allowed-types="list.allowedTypes"
              :disable-if="list.people.length >= list.max">

              <vddl-draggable class="panel__body--item" v-for="(person, index) in list.people" :key="person.name"
                :draggable="person"
                :type="person.type"
                :wrapper="list.people"
                :index="index"
                :disable-if="person.type == 'unknown'"
                effect-allowed="move"
                v-bind:class="{'unknown': person.type == 'unknown'}">
                {{person.name}}
              </vddl-draggable >

              <vddl-placeholder class="panel__placeholder">
                Drop any <strong>{{list.allowedTypes.join(' or ')}}</strong> here
              </vddl-placeholder>
            </vddl-list>
          </div>
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

<style scoped>
.unknown {
  color: #ccc;
}
</style>
