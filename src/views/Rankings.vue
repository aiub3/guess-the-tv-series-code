<template>
  <div class="ma-2">
    <v-data-table
      :headers="headers"
      :items="users"
      :must-sort="true"
      :sort-by="'levelsCompleted'"
      :item-key="'id'"
      :items-per-page="15"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading users ranking..."
      no-data-text="There are no users yet. Play to appear in the ranking"
    >
      <template v-slot:item.coins="{ item }">
        <v-list-item-avatar color="yellow darken-2" class="coin">{{ item.coins }}</v-list-item-avatar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getAllUsers } from '@/services/Firebase'

export default {
  data() {
    return {
      users: [],
      headers: [
        { text: 'User name', value: 'name', sortable: false },
        {
          text: 'Levels completed',
          value: 'levelsCompleted',
          sort: (a, b) => b - a
        },
        { text: 'Coins', value: 'coins', sort: (a, b) => b - a },
        {
          text: 'Survival max points',
          value: 'survivalMaxPoints',
          sort: (a, b) => b - a
        },
        {
          text: 'Survival difficulty',
          value: 'survivalDifficulty',
          sortable: false
        },
        { text: 'Survival mode', value: 'survivalMode', sortable: false }
      ],
      loading: true
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      getAllUsers().then((data) => {
        const obj = data.val()
        for (const key in obj) {
          let user = {
            id: key,
            name: obj[key].name,
            levelsCompleted: obj[key].normalGame.levelsCompleted
              ? obj[key].normalGame.levelsCompleted.length
              : 0,
            coins: obj[key].normalGame.coins
          }
          if (obj[key].survivalMode) {
            user = Object.assign(user, {
              survivalMaxPoints: obj[key].survivalMode.maxPoints,
              survivalDifficulty: obj[key].survivalMode.difficulty,
              survivalMode: obj[key].survivalMode.mode
            })
          }
          this.users.push(user)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.coin {
  color: white;
}
</style>
