"use strict"
$(document).ready(function () {
    let dataToUpload = [];
    let dataToCheck = [];
    let onotherDataToCheck = [];
    let defaultBatchSize = 1;

    // Main Script
    const Import = {
        // Custumoze for specific Import Page
        dataTable: null,
        defaultDateFileFormat: 'DD/MM/YYYY',
        defaultTimeFileFormat: 'HH:mm:ss',
        init: function () {
            // $('#overlay-container').addClass('overlay overlay-block');
            // $('.overlay-layer').removeClass('d-none');
            // Page loader

            $.when(this.getDataToCheck(), this.getAnotherDataToCheck())
                .then((dataToCheckResponse, onotherDataToCheckResponse) => {
                    dataToCheck = usernameResponse.data;
                    onotherDataToCheck = psSkillResponse.data;
                    // $('#overlay-container').removeClass('overlay overlay-block');
                    // $('.overlay-layer').addClass('d-none');
                    // Remove Page loader
                });
        },
        getDataToCheck: function () {
            let d = new $.Deferred();
            $.ajax({
                url: 'get.php',
                type: 'GET',
                success: function (data) {
                    d.resolve(data);
                }
            });
            return d.promise();
        },
        getAnotherDataToCheck: function () {
            let d = new $.Deferred();
            $.ajax({
                url: 'get.php',
                type: 'GET',
                success: function (data) {
                    d.resolve(data);
                }
            });
            return d.promise();
        },
        rowIsValid: function (row) {
            let aDate = moment(row.date, this.defaultDateFileFormat, true);
            let aTime = moment(row.time, this.defaultTimeFileFormat, true);

            var idCheck = typeof row.id != 'undefined' ? true : false;
            var firstnameCheck = typeof row.firstname != 'undefined' ? true : false;
            var lastnameCheck = typeof row.lastname != 'undefined' ? true : false;
            var aDateCheck = aDate.isValid() ?? false;
            var aTimeCheck = aTime.isValid() ?? false;
            var balanceCheck = typeof row.balance != 'undefined' ? true : false;

            var statusCheck = (idCheck && firstnameCheck && lastnameCheck && aDateCheck && aTimeCheck && balanceCheck) ? true : false;

            return statusCheck;
        },
        detailsFormat(d) {
            let dateTdContent = '';
            d.trainingDates.forEach((item) => {
                let aDate = moment(item.date, 'DD-MM-YYYY', true);
                let aStartTime = moment(item.startTime, 'HH:mm', true);
                let aEndTime = moment(item.endTime, 'HH:mm', true);

                if (aDate.isValid() && aStartTime.isValid() && aStartTime.isValid()) dateTdContent += `<span><i class="far fa-clock"></i> ${aDate.format('DD-MM-YYYY')} | ${aStartTime.format('HH:mm')}-${aStartTime.format('HH:mm')}</span><br>`
                else dateTdContent += '<span><i class="far fa-clock"></i> Invalide Date format</span><br>';
            });
            let userContent = '';
            d.users.forEach((item) => {
                let userIDExit = _.findLast(usernames, function (o) { return o.username.toLowerCase() == item.toLowerCase(); });
                if (typeof userIDExit != 'undefined') userContent += `<span class="label label-lg label-inline mx-2">${item.toUpperCase()}</span>`;
                else userContent += `<span class="label label-lg label-inline mx-2 label-light-danger">${item.toUpperCase()}</span>`;
            });
            return 'Training Dates:<br>' + dateTdContent + '<br>' +
                'Users:<br>' + userContent;
        },
        processExcel(data) {
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: 'binary'
            });

            //Fetch the name of First Sheet.
            var dataSheet = workbook.SheetNames[0];

            //Read all rows from First Sheet into an JSON array.
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[dataSheet]);

            excelRows.forEach((item) => {
                item.uiid = Import.uniqId();
            });

            dataToUpload = [];

            if ($.fn.dataTable.isDataTable('#data-to-upload')) {
                this.dataTable.destroy();
            }

            this.dataTable = $('#data-to-upload').DataTable({
                data: excelRows,
                drawCallback: function (settings) {

                },
                initComplete: function () {
                    excelRows.forEach((item) => {
                        if (Import.rowIsValid(item)) dataToUpload.push(item);
                    });
                    if (dataToUpload.length) $('#upload-data').prop('disabled', false);
                    else $('#upload-data').prop('disabled', true);
                },
                columns: [
                    {
                        "data": "id",
                    },
                    { "data": "firstname" },
                    { "data": "lastname" },
                    {
                        "data": "date",
                        "render": function (data, type, row, meta) {
                            var aDate = moment(data, 'DD/MM/YYYY', true);
                            return `${(aDate.isValid() ? `<span><i class="far fa-calendar-minus"></i> ${aDate.format('DD-MM-YYYY')}</span>` : '<span class="badge badge-danger"><i class="far fa-calendar-minus"></i> Invalide Date</span>')}`;
                        }
                    },
                    {
                        "data": "time",
                        "render": function (data, type, row, meta) {
                            var aTime = moment(data, 'HH:mm:ss', true);
                            return `${(aTime.isValid() ? `<span><i class="far fa-clock"></i> ${aTime.format('HH:mm')}</span>` : '<span class="badge badge-danger"><i class="far fa-clock"></i> Invalide Time</span>')}`;
                        }
                    },
                    { "data": "balance" },
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return `<span class="badge ${(Import.rowIsValid(row) ? 'badge-success' : 'badge-danger')} badge-inline" data-uiid="${row.uiid}">${Import.rowIsValid(row) ? 'Ready' : 'Bad'}</span>`;
                        }
                    }
                ]
            });

            // For Detail Row
            // Array to track the ids of the details displayed rows
            var detailRows = [];

            $('#data-to-upload tbody').on('click', 'tr td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = Import.dataTable.row(tr);
                var idx = $.inArray(tr.attr('uiid'), detailRows);

                if (row.child.isShown()) {
                    tr.removeClass('details');
                    row.child.hide();

                    // Remove from the 'open' array
                    detailRows.splice(idx, 1);
                }
                else {
                    tr.addClass('details');
                    row.child(Import.detailsFormat(row.data())).show();

                    // Add to the 'open' array
                    if (idx === -1) {
                        detailRows.push(tr.attr('id'));
                    }
                }
            });

            // On each draw, loop over the `detailRows` array and show any child rows
            Import.dataTable.on('draw', function () {
                $.each(detailRows, function (i, id) {
                    $('#' + id + ' td.details-control').trigger('click');
                });
            });
        },
        saveRowData(callParams, dataRow = {}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: (typeof callParams.type != 'undefined') ? callParams.type : 'POST',
                    url: callParams.url,
                    quietMillis: 100,
                    dataType: (typeof callParams.dataType != 'undefined') ? callParams.dataType : 'JSON',
                    data: dataRow,
                    // cache: true,
                    success: function (response) {
                        resolve(response);
                    },
                    error: function (response) {
                        reject(response);
                    }
                });
            });
        },
        uploadData: async (dataToUpload, batchSize, loader = false) => {
            const dataLength = dataToUpload.length

            for (let i = 0; i < dataLength; i += batchSize) {
                const requests = dataToUpload.slice(i, i + batchSize).map((data) => { // The batch size is 2. We are processing in a set of 2 users.

                    let ajaxCallParams = {},
                        ajaxDataParams = {};
                    ajaxCallParams.type = "POST"; // POST type function 
                    ajaxCallParams.url = "save.php"; // Pass Complete end point Url e-g Payment Controller, Create Action
                    ajaxCallParams.dataType = "JSON"; // Return data type e-g Html, Json etc
                    ajaxDataParams = data;

                    $(`span[data-uiid="${data.uiid}"]`).removeClass('label-light-primary').addClass('label-light-warning').text('In progress');

                    return Import.saveRowData(ajaxCallParams, ajaxDataParams) // Async function to send the mail.
                        .catch(e => console.log(`Error save data | ${data} - ${e}`)) // Catch the error if something goes wrong. So that it won't block the loop.
                })

                // requests will have 2 or less pending promises. 
                // Promise.all will wait till all the promises got resolves and then take the next 2.
                const results = await Promise.all(requests)
                    .catch(e => console.log(`Error get id for the batch ${i} - ${e}`)) // Catch the error.

                results.forEach((item) => {
                    $(`span[data-uiid="${item.uiid}"]`).removeClass('label-light-warning');
                    if (item.uiid) $(`span[data-uiid="${item.uiid}"]`).addClass('label-light-success').text('Done');
                    else $(`span[data-uiid="${item.uiid}"]`).addClass('label-light-danger').text('Error');
                });
            }

            $('#fileUpload').val('');
            Swal.fire({ type: 'success', title: 'Data Upload', text: 'Data Uploaded successfully !' });
        },
        uniqId() {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        }
    }


    // Events Listenner start
    $("body").on("click", "#loadfile", function () {
        //Reference the FileUpload element.
        var fileUpload = $("#fileUpload")[0];
        //Validate whether File is valid Excel file.

        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    Import.processExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    Import.processExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    });

    $("#fileUpload").change(function (e) {
        if ($(this)[0].files.length) $('#loadfile').prop('disabled', false);
        else $('#loadfile').prop('disabled', true);
    });

    $("#upload-data").click(function (e) {
        e.preventDefault();
        // $('#loadfile').prop('disabled', true);
        // $(this).prop('disabled', true);
        Import.uploadData(dataToUpload, defaultBatchSize);
    });
    // Events Listenner end

    // Init page
    // Import.init();
});
