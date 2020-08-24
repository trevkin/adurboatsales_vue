<template>
	<div id="navMenu" class="navMenu ml-6 block xl:text-2xl leading-loose" ref="navMenu">
		<ul class="">
			<li>
				<router-link to="/" class="text-white">
					Boats for Sale
				</router-link>
			</li>
			<li>
				<router-link to="/aboutus" class="text-white">
					About Us
				</router-link>
			</li>
			<li>
				<router-link to="/contactus" class="text-white">
					Contact Us
				</router-link>
			</li>
<!--			<li v-if="loggedIn">-->
<!--				<router-link to="/admin" class="text-white">-->
<!--					Admin-->
<!--				</router-link>-->
<!--			</li>-->
			<li v-if="!loggedIn">
				<router-link to="/login" class="text-white">
					Login
				</router-link>
			</li>
			<li v-else>
				<div @click="logout" class="inline text-white font-bold cursor-pointer">
					Logout
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
    export default {
        props: {
            loggedIn: {
                type: Boolean,
                required: true
            }
        },
		methods: {
            logout(){
                this.$parent.logout();
            },
		}
    }
</script>
<style scoped>
	.navMenu {
		position: relative;
	}
	.navMenu li {
		padding-right: 14px;
		display: inline;
		font-weight: bold;
	}
</style>