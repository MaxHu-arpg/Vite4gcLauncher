<script setup>
import {ref, watch} from 'vue'

const inputIPaddress = ref('')
const realIPaddress = ref('')
const inputPort = ref('')
const realPort = ref('')
const Loading = ref(false)
const execpath = ref('')
const gameversion = ref('---')
const playernum = ref('---')
const severstatus = ref('-')
const isActive = ref(false)
const ProxyInstalled = ref(true)

window.elec.getConfig().then((config) => {
  inputIPaddress.value = config.hasOwnProperty('IP') ? config.IP : inputIPaddress.value
  inputPort.value = config.hasOwnProperty('Port') ? config.Port : inputPort.value
  execpath.value = config.hasOwnProperty('ExecPath') ? config.ExecPath : execpath.value
  ProxyInstalled.value = config.hasOwnProperty('ProxyInstalled') ? config.ProxyInstalled : ProxyInstalled.value
})


watch(([realIPaddress, realPort, execpath, ProxyInstalled]), ([newW, newX, newY, newZ], [oldW, oldX, oldY, oldZ]) => {
  console.log('Watched ref change')
  if (newW) {
    window.elec.setConfig('IP', newW)
  }
  if (newX) {
    window.elec.setConfig('Port', newX)
  }
  if (!newZ) {
    window.elec.showUninstall().then((response) => {
      if (response === 0) {
        installProxy()
      }
    })
  }
  if ((!!newW) && (!!newX) && (!!newY) && (newZ)) {
    console.log('判断了成功.开始游戏按钮激活')
    isActive.value = true
  }else {
    isActive.value = false
  }
})

function installProxy() {
  window.elec.installProxy().then((response) => {
    if (response === 1) {
      ProxyInstalled.value = true
      window.elec.setConfig('ProxyInstalled', true)
    }
  })
}

function selectGamePath(event) {
  window.elec.selectFile().then((result) => {
    if (result) {
      execpath.value = result
      window.elec.setConfig('ExecPath', result)
    }
  })
}

function startGame() {
  console.log('Starting Game...')
  console.log('realIPaddress:' + realIPaddress.value)
  console.log('realPort:' + realPort.value)
  console.log('execpath:' + execpath.value)
  window.elec.startGame(realIPaddress.value, realPort.value, execpath.value).then((result) => {

  })
}

async function ipVerify() {
  Loading.value = true
  await fetch('https://' + inputIPaddress.value + ':' + (inputPort.value ? inputPort.value : '443') + '/status/server')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        Loading.value = false
        playernum.value = data.status.playerCount
        gameversion.value = data.status.version
        severstatus.value = '√'
        realIPaddress.value = inputIPaddress.value
        realPort.value = (inputPort.value ? inputPort.value : '443')
      })
      .catch(async (err) => {
        console.log(err)
        await fetch('http://' + inputIPaddress.value + ':' + (inputPort.value ? inputPort.value : '443') + '/status/server')
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              Loading.value = false
              playernum.value = data.status.playerCount
              gameversion.value = data.status.version
              severstatus.value = '√'
              realIPaddress.value = inputIPaddress.value
              realPort.value = (inputPort.value ? inputPort.value : '443')
            })
            .catch((err) => {
              console.log(err)
              Loading.value = false
              playernum.value = '---'
              gameversion.value = '---'
              severstatus.value = '×'
              realIPaddress.value = ''
              realPort.value = ''
            });
      })
      .finally(() => {
        console.log('realIPaddress.value:' + realIPaddress.value)
        console.log('realPort.value:' + realPort.value)
      });
}

</script>

<template>
  <div id="frame" class="flex flex-col justify-end content-center">
    <div class="flex-none self-center w-2/3 h-14">
      <button @click="selectGamePath" id="selectbtn" class="btn-yellow w-full h-full">
        <svg id="selectSVG" class="inline-block align-middle mx-0.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="28" height="28">
          <path
              d="M853.333333 298.666667v512H170.666667V213.333333h221.866666l42.666667 42.666667H853.333333v42.666667zM256 341.333333v384h512V341.333333H256z m298.666667 256h170.666666v85.333334h-170.666666v-85.333334z"
              fill="#713f12">
          </path>
        </svg>
        <p class="inline-block align-middle text-lg font-semibold text-yellow-900">
          选择游戏可执行文件
        </p>
      </button>

    </div>
    <div class="flex-grow bg-gray-600 bg-opacity-80">
      <div class="flex flex-nowrap flex-col justify-around content-center w-full h-full">
        <p class="text-gray-100 text-center" v-if="!execpath">请选择游戏可执行文件</p>
        <p class="text-gray-100 text-center" v-else>{{ execpath }}</p>
        <div class="flex justify-around">
          <input name="ip" maxlength="20" autocomplete= "on" placeholder="服务器IP地址" v-model="inputIPaddress"
                 class="h-10 w-44 rounded-lg text-lg outline-none px-3 focus:ring-2 focus:ring-yellow-500">
          <input name="port" maxlength="5" autocomplete= "on" placeholder="端口" v-model="inputPort"
                 class="h-10 w-20 rounded-lg text-lg outline-none px-3 focus:ring-2 focus:ring-yellow-500">
          <div class="w-1/4">
            <button @click="ipVerify" id="selectbtn" class="w-full h-full btn-yellow">
              <p class="text-lg font-semibold text-yellow-900">
                查询
              </p>
            </button>
          </div>
        </div>
        <div class="flex flex-col border border-white rounded-xl">
          <p class="text-2xl text-gray-100">
            &nbsp&nbsp&nbsp&nbsp服务器状态
          </p>
          <p class="text-base text-gray-100 text-center">
            服务器连接：{{ severstatus }}
          </p>
          <p class="text-base text-gray-100 text-center">
            服务器游戏版本：{{ gameversion }}
          </p>
          <p class="text-base text-gray-100 text-center">
            当前玩家数：{{ playernum }}
          </p>
          <br>
        </div>
      </div>
    </div>
    <div class="flex-none w-full h-24">
      <button id="startbtn" @click="startGame" class="w-full h-full btn-yellow disabled:bg-gray-400" :disabled="!isActive">
        <p class="text-3xl font-semibold text-yellow-900">
          启动私人服务器
        </p>
      </button>
    </div>
  </div>
  <!-- 条件渲染部分 -->
  <Teleport to="body">
    <div id="loadingMask" v-if="Loading" class="fixed top-0 left-0 z-10000 w-screen h-screen bg-black bg-opacity-30">
      <div id="loading" class="z-100000 flex content-center justify-center bg-black bg-opacity-80 rounded-3xl">
        <div class="self-center spinner">
          <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.spinner {
  width: 50px;
  height: 50px;
  position: relative;
}

.container1 > div, .container2 > div, .container3 > div {
  width: 10px;
  height: 10px;
  background-color: #eeeeee;

  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}

.circle1 {
  top: 0;
  left: 0;
}

.circle2 {
  top: 0;
  right: 0;
}

.circle3 {
  right: 0;
  bottom: 0;
}

.circle4 {
  left: 0;
  bottom: 0;
}

.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}

.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}

.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}

.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0.0)
  }
  40% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  }
  40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

#loading {
  width: 128px;
  height: 128px;
  position: fixed;
  top: 311px;
  left: 586px;
}

#frame {
  width: 400px;
  height: 375px;
  position: fixed;
  top: 250px;
  right: 150px;
}

button:hover {
  cursor: url("../assets/cursor/hand.cur"), pointer;
}

input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: url("../assets/cursor/text.cur"), text;
}
</style>
