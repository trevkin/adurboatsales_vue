<template>
	<div id="navMenu" class="navMenuMobile transition ease-in duration-500" ref="navMenu" @click="menuClicked"
		 :class="{'showMenu':showNav}">
		<ul class="text-white">
			<li>
				<router-link to="/">
					Boats for Sale
				</router-link>
			</li>
			<li>
				<router-link to="/aboutus">
					About Us
				</router-link>
			</li>
			<li>
				<router-link to="/contactus">
					Contact Us
				</router-link>
			</li>
<!--			<li v-if="loggedIn">-->
<!--				<router-link to="/admin">-->
<!--					Admin-->
<!--				</router-link>-->
<!--			</li>-->
			<li v-if="!loggedIn">
				<router-link to="/login">
					Login
				</router-link>
			</li>
			<li v-else>
				<div @click="logout" class="block text-white font-bold cursor-pointer">
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
            },
            showNav: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            menuClicked() {
                this.$parent.toggleShowNav();
            },
            logout() {
                this.$parent.logout();
            }
        }
    }
</script>
<style scoped>
	.navMenuMobile {
		position: fixed;
		height: 300px;
		width: 200px;
		top: 60px;
		left: 15px;
		z-index: 0;
		opacity: 0;
	}

	.navMenuMobile li {
		display: block;
		padding-bottom: 10px;
	}

	.navMenuMobile li a, .navMenuMobile li div {
		font-size: 1.3rem;
		font-weight: bold;
		color: #999;
		font-family: "Century Gothic"

	}

	.showMenu {
		opacity: 1;
	}
</style>