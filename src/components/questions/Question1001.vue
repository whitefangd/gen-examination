<template>
  <div>1001</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Mixins, Component, Prop } from "vue-property-decorator";
import QuestionsEntity from '@/types/entities/QuestionsEntity';

@Component
export default class Question1001 extends Vue {
    @Prop() data!: QuestionsEntity
}
</script>

<style>

</style>