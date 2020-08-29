<template>
	<div class="absolute top-0 left-0 right-0 bottom-0">
		<NavMobile v-if="mobileView" :loggedIn="loggedIn" :showNav="showNav"></NavMobile>
		<div id="container"
			 class="relative rounded-lg m-4 z-10 bg-white transition ease-in duration-500"
			 :class="{'slideContainer':showNav}">
			<nav id="banner"
				 class=" items-center bg-blue-800 p-3 pt-5 rounded-t-lg h-24 md:h-40 z-20 ver"
				 :class="mobileView ? 'bannerMobile' : 'banner'"
			>
				<font-awesome-icon
					v-if="mobileView" @click="toggleShowNav" icon="bars"
					class="text-white text-3xl cursor-pointer inline-block"
				/>
				<router-link id="logo" to="/"
					 exact-active-class=""
					 class=" mt-1 ml-5 w-3/4 sm:w-2/3 lg:w-1/2 xl:w-1/2 inline-block visited:no-underline"
				>
					<img
						alt="Adur Boat Sales"
						class=""
						contain
						src="@/assets/images/adurboatsales.png"
						transition="scale-transition"
					/>
				</router-link>
				<NavRegular v-if="!mobileView" :loggedIn="loggedIn"></NavRegular>
			</nav>
			<router-view id="content" class="flex-column justify-center rounded-b-lg"/>
		</div>
	</div>
</template>
<script>
    import {authComputed} from './vuex/helper.js'
    import NavMobile from "./components/NavMobile"
    import NavRegular from "./components/NavRegular"

    export default {
        name: 'App',
        components: {
            NavMobile,
            NavRegular
        },
        props: {
            navClass: {
                type: String,
                required: false
            }
        },
        data: () => ({
            items: {},
            mobileView: true,
            mobileMenuActive: false,
            showNav: false,
            boatTypes: [{type: 'M', typeTitle: 'Motor'}, {type: 'S', typeTitle: 'Sail'}],
            boatStatuses: [{status: 'A', statusTitle: 'Available'}, {status: 'S', statusTitle: 'Sold'}, {
            status: 'P',
            statusTitle: 'Pending Information'
          }],
        }),
        computed: {
            ...authComputed
        },
        methods: {
            toggleShowNav() {
                this.showNav = !this.showNav
            },
            logout() {
                console.log("logout called")
                this.$store.dispatch('logout')
                location.reload()
            },
            handleView() {
                this.showNav = false
                this.mobileView = window.innerWidth <= 600
            },
        },
        created() {
            window.addEventListener('resize', this.handleView);
            this.handleView();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleView);
        },
    }
</script>
<style>
	@import './assets/styles/tailwind.postcss';

	body, html {
		height: 100%;
		background-color: #ddd;
	}
	.banner {
		background-image: url("./assets/images/sunset-over-yachts.jpg");
		background-position-y: 80%;
		background-position-x: 0px;
		background-size: 100%;
	}
	.bannerMobile {
		background-image: url("./assets/images/sunset-over-yachts.jpg");
		background-position-y: -40px;
		background-size: 100%;
	}
	#content {
		background-color: #88adc7;
	}
	.slideContainer {
		transform: translateX(200px);
	}
</style>