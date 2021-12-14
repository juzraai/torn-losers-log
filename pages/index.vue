<template>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="border-bottom mb-5">
					<small>Welcome to</small>
					<strong>TLL</strong>!
				</h1>
			</div>
			<div class="col-md-6">
				<p class="mb-4 text-justify"><strong>TLL</strong> (short for <strong>TORN City Losers' Log</strong>) was originally designed for only loss sellers, but now aims to help the loss selling and buying activity of citizens, as it can</p>
				<ul class="list-unstyled mb-4 ml-3">
					<li class="d-flex align-items-center mb-3">
						<i class="fas fa-list fa-fw mr-2" />
						<i class="far fa-chart-bar fa-fw mr-3" />
						<span>list, filter, group, count, plot,</span>
					</li>
					<li class="d-flex align-items-center mb-3">
						<i class="fas fa-tag fa-fw mr-2" />
						<i class="fas fa-check fa-fw mr-3" />
						store price and paid status
					</li>
					<li class="d-flex align-items-center mb-3">
						<i class="fas fa-skull fa-fw mr-2" />
						<i class="fas fa-running fa-fw mr-3" />
						<span>of losses <strong>and escapes</strong><span class="badge badge-success ml-2">NEW!</span></span>
					</li>
					<li class="d-flex align-items-center mb-3">
						<i class="fas fa-crosshairs fa-fw mr-2" />
						<i class="fas fa-shield-alt fa-fw mr-3" />
						<span>you made <strong>or received!</strong><span class="badge badge-success ml-2">NEW!</span></span>
					</li>
				</ul>
				<p class="text-justify"><strong>TLL</strong> does all this entirely in your browser, which means your API key won't be sent out nor stored on a 3rd party server. (In fact, TLL doesn't have any server-side code or database, it's a static website.) However, this also means that you have to carry over your data manually, if you decide to switch browsers. <strong>TLL</strong> provides export and import mechanisms to help with that.</p>
			</div>
			<div class="col-md-6 col-lg-5 ml-auto">
				<LoginCard />
			</div>
		</div>
	</div>
</template>
