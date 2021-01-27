<template>
  <div>
    <transition name="back-to-top-fade">
      <div class="vue-back-to-top" :style="`bottom:${this.bottom};right:${this.right};`" v-show="visible"
           @click="backToTop">
        <slot>
          <div class="default">
            <span>
              {{ text }}
            </span>
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  props: {
    text: {
      type: String,
      default: 'text'
    },
    visibleoffset: {
      type: [String, Number],
      default: 600
    },
    right: {
      type: String,
      default: '30px',
    },
    bottom: {
      type: String,
      default: '40px',
    },
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.catchScroll)
  },
  methods: {
    catchScroll() {
      this.visible = (window.pageYOffset > parseInt(this.visibleoffset))
    },

    backToTop() {
      window.smoothscroll()
      this.$emit('scrolled');
    }
  }
}
</script>

<style scoped>
.back-to-top-fade-enter-active, .back-to-top-fade-leave-active {
  transition: opacity .7s;
}

.back-to-top-fade-enter, .back-to-top-fade-leave-to {
  opacity: 0;
}

.vue-back-to-top {
  position: fixed;
  z-index: 1000;
  cursor: pointer;
}

.vue-back-to-top .default {
  width: 160px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%);
  border-radius: 3px;

  background-size: 200% auto;
  transition: transform 80ms ease-in;
}

.default:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.vue-back-to-top .default span {
  color: #ffffff;
}
</style>