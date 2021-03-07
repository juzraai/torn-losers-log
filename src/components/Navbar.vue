<template>
	<nav class="navbar navbar-expand-sm navbar-light">
		<span class="font-italic font-weight-bold navbar-brand text-dark">TORN City Losers' Log</span>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbar"
			aria-controls="navbar"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div
			class="collapse navbar-collapse"
			id="navbar"
		>
			<ul class="navbar-nav ml-auto">
				<li class="nav-item dropdown">
					<a
						class="font-weight-bold nav-link dropdown-toggle text-dark"
						href="#"
						id="playerDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						{{ names[playerId] }} [{{ playerId }}]
					</a>
					<div
						class="dropdown-menu dropdown-menu-right"
						aria-labelledby="playerDropdown"
					>
						<a
							class="dropdown-item"
							:href="'https://www.torn.com/profiles.php?XID=' + playerId"
							target="_blank"
						>
							<i class="fas fa-user-circle fa-fw mr-2"></i>
							View profile
						</a>
						<div class="dropdown-divider"></div>
						<a
							class="dropdown-item text-danger"
							href="#"
						>
							<i class="fas fa-trash-alt fa-fw mr-2"></i>
							Clear data
						</a>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["names", "playerId"]),
	},
};
</script>
