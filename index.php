<!doctype html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


	<meta name="description" content="Simple upload xlsx file data">
	<meta name="author" content="Ugrah">
	<meta name="author.email" content="grulogdev@gmail.com">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css">

	<title>Module, Import xlsx!</title>
</head>

<body>
	<div class="d-flex flex-column-fluid">
		<!--begin::Container-->
		<div class="container overlay-wrapper mb-3">
			<div class="">
				<h2>Module, Import xlsx!</h2>
				<a href="dummy-import.xlsx" id="downloadSample" class="btn btn-warning float-right">Download Sample data</a>
			</div>
			<div class="row">
				<div class="col">
					<input type="file" id="fileUpload" />
					<button id="loadfile" class="btn btn-info" disabled>Load File</button>
					<button id="upload-data" class="btn btn-success float-right mx-3" disabled>Upload Data</button>
				</div>
			</div>

			<div class="row mt-4">
				<div class="col">
					<h3 class="">
						Data to upload
					</h3>
					<div align="center">
						<button id="table_loader" style="width:500px" name="table_loader"
							class="btn btn-primary d-none" type="button" disabled="">
							Please wait while we are loading the users list &nbsp;
							<span class="spinner"></span>
						</button>
					</div>
					<div id="users-dt_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
						<div class="row">
							<div class="col-sm-12">
								<table class="table table-hover dataTable no-footer" id="data-to-upload" role="grid"
									aria-describedby="users-dt_info">
									<thead>
										<tr role="row">
											<th class="sorting_disabled">Id</th>
											<th class="sorting_disabled">Firstname</th>
											<th class="sorting_disabled">Lastname</th>
											<th class="sorting_disabled">Date</th>
											<th class="sorting_disabled">Time</th>
											<th class="sorting_disabled">Balance</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--end::Container-->
	</div>

	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
		crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
		crossorigin="anonymous"></script>

	<!-- MomentJs CDN -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js" type="text/javascript"></script>

	<!-- MomentJs Timezone CDN -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.33/moment-timezone.min.js" integrity="sha512-jkvef+BAlqJubZdUhcyvaE84uD9XOoLR3e5GGX7YW7y8ywt0rwcGmTQHoxSMRzrJA3+Jh2T8Uy6f8TLU3WQhpQ==" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.33/moment-timezone-with-data.js" integrity="sha512-nwFvp27oDSOkJAXZdkqJDB2FkkI3dXJKSapfBmm+R9YW/4KvT8SAGhyTxmt6Uxfa49rTYODHdjjVjOLSJELfJQ==" crossorigin="anonymous"></script>

	<!-- axios CDN -->
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	<!-- Lodash CDN -->
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

	<!-- Sweetalert2 CDN -->
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

	<!-- XLSX READER -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/xlsx.full.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>

	<!-- Datatable JS -->
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>

	<!-- Main script JS -->
    <script type="text/javascript" src="assets/js/main.js"></script>

</body>

</html>