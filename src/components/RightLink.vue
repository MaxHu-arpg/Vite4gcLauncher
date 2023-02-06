<script setup>
import {ref} from 'vue'

const paimonShow = ref(false)

function installProxy(){
  window.elec.installProxy().then((result) => {
    console.log('install code:'+result)
  })
}

</script>

<template>
  <div id="logo" class="flex flex-col fixed left-10 top-5 h-auto w-auto">
    <img @mouseenter="paimonShow = true;" @mouseleave="paimonShow = false;" class="shake" src="/原神图标.png" alt="原神" width="190" height="151">
    <Transition name="paimon">
      <img v-if="paimonShow" class="shake-hard shake-constant" src="/派蒙gc.png" alt="派蒙gc" width="190">
    </Transition>
  </div>
  <div id="Right" class="flex flex-col content-center justify-center fixed right-0 top-0 h-screen w-20 bg-black bg-opacity-25">
    <div class="">
      <button @click="installProxy" id="selectbtn" class="w-full h-full btn-yellow">
        <p class="font-semibold text-yellow-900">
          安装代理
        </p>
      </button>
    </div>
  </div>
</template>

<style scoped>
.paimon-enter-active {
  transition: opacity 10s ease-in-out;
}


.paimon-enter-from,.paimon-leave-active {
  opacity: 0;
}
</style>
