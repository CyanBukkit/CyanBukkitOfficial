<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <a-card v-for="member in members" :key="member.id" class="member-card">
      <template #cover>
        <img :src="member.avatar" :alt="member.name" class="member-avatar" />
      </template>
      <a-card-meta :title="member.name">
        <template #description>
          <div>
            <p class="font-bold">{{ member.title }}</p>
            <p class="mt-2">{{ member.description }}</p>
            <div class="mt-2">
              <strong>工作时间：</strong>{{ member.workTime }}
            </div>
            <div class="mt-2">
              <strong>技能：</strong>
              <a-tag v-for="skill in member.skills" :key="skill" class="mt-1 mr-1">
                {{ skill }}
              </a-tag>
            </div>
          </div>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup>
defineProps({
  members: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.member-card {
  transition: transform 0.3s;
}
.member-card:hover {
  transform: translateY(-5px);
}
.member-avatar {
  height: 300px;
  object-fit: cover;
}
</style>