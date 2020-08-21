<template>
	<div class=" flex justify-center">
		<div id="Modal" class="fixed -mt-6 md:-mt-24 bg-white z-20 rounded-lg p-6 shadow" :class="classProp" v-show="modalShow" v-closable="{
      excludedTagNames: ['IMG','A','BUTTON'],
      handler: 'hideModal'
    }">
			<div id="modalSrc" class="">
        <slot></slot>
				<div @click="hideModal"
					 class="absolute text-right mr-2 top-0 right-0 font-bold text-xl text-gray-600 cursor-pointer">x</div>
			</div>
		</div>
	</div>
</template>
<script>
    let handleOutsideClick
    export default {

        data: () => {
            return {
                modalShow: false,
            }
        },
        directives: {
            closable: {
                bind: function (el, binding, vnode) {
                    handleOutsideClick = (e) => {

                        e.stopPropagation()
                        const {handler, excludedTagNames} = binding.value
                        let clickedOnExcludedEl = false
                        excludedTagNames.forEach(excludedTagName => {
                            if (e.target.tagName === excludedTagName) {
                                clickedOnExcludedEl = true
                            }
                        })
                        if (!el.contains(e.target) && !clickedOnExcludedEl) {
                            console.log("close")
                            vnode.context[handler]()
                        }
                    }
                    document.addEventListener('click', handleOutsideClick)
                    document.addEventListener('touchstart', handleOutsideClick)
                },
                unbind: function () {
                    document.removeEventListener('click', handleOutsideClick)
                    document.removeEventListener('touchstart', handleOutsideClick)
                }
            }
        },
        methods: {
            hideModal() {
              console.log("hideModal in modal")
                this.modalShow = false
            },
            showModal() {
              console.log("showModal in modal")
                this.modalShow = true
            }
        },
      props: {
        classProp: {
          type: String,
          required: false
        },
      }
    }
</script>
