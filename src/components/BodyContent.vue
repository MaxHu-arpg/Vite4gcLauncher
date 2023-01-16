<script setup>
import StartGame from './StartGame.vue'
import RightLink from './RightLink.vue'
import {ref} from 'vue'

const show = ref(true)

function unShow() {
  show.value = false
}

function reShow() {
  show.value = true
}

</script>

<template>
  <div id="bg" class="">
    <Transition name="fade">
      <div v-show="show">
        <StartGame/>
        <RightLink/>
        <button class="flex content-center justify-center fixed bottom-6 left-6 w-16 h-16 rounded-full cursor-pointer
              transition duration-75 ease-in-out bg-gray-500 bg-opacity-50 hover:bg-gray-600 hover:bg-opacity-80 transform hover:-translate-y-1 hover:scale-100
              active:bg-yellow-500" @click="unShow">
          <svg class="showicon self-center" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               width="50" height="50">
            <path
                d="M512 192c133.824 0 247.978667 44.650667 333.205333 120.042667C915.285333 374.037333 960 453.973333 960 512c0 58.026667-44.714667 137.962667-114.794667 199.957333C759.978667 787.349333 645.824 832 512 832s-247.978667-44.650667-333.205333-120.042667C108.714667 649.962667 64 570.026667 64 512c0-58.026667 44.714667-137.962667 114.794667-199.957333C264.021333 236.650667 378.176 192 512 192z m0 64c-117.952 0-217.088 38.762667-290.794667 103.957333C163.690667 410.837333 128 474.666667 128 512s35.690667 101.162667 93.205333 152.042667C294.912 729.237333 394.026667 768 512 768s217.088-38.762667 290.794667-103.957333C860.309333 613.162667 896 549.333333 896 512s-35.690667-101.162667-93.205333-152.042667C729.088 294.762667 629.973333 256 512 256z m0 96a160 160 0 1 1 0 320 160 160 0 0 1 0-320z m0 64a96 96 0 1 0 0 192 96 96 0 0 0 0-192z"
                fill="#111111"></path>
          </svg>
        </button>
      </div>
    </Transition>
    <div v-if="!show" class="fixed top-0 left-0 w-screen h-screen" @click="reShow"></div>

  </div>

</template>

<style scoped>
#bg {
  width: 1300px;
  height: 750px;
  background-image: url("../assets/bg.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
