// Listeners for comparsion
jQuery("#comparsionStart").click(function(){ 
    comparsionStart()
});

function comparsionStart() {
	var productCodeArr= jQuery("#compareItems").val().split(",");
	jQuery( "#comparsionResults" ).html("<table class='text-center'><thead><tr></tr></thead></table>");
	productCodeArr.forEach(function(element) {
		getProductData(element);
	});
}

function renderComparsionTable(productData) {
	jQuery( "#comparsionResults table thead tr" ).append("<td id='compareProduct" + productData.code + "'><img src='" + productData.images[0].url + "' style='max-width:100%;'><br /><b>" + productData.manufacturer + "</b> " + productData.name + "</td>" );
	productData.classifications.forEach(function(classification) {
		if (!jQuery( "#comparsionResults table tbody#classification" + classification.code).length) {
			jQuery( "#comparsionResults table").append("<tbody id='classification" + classification.code + "'><tr></tr></tbody>");
			jQuery( "#comparsionResults table tbody#classification" + classification.code + " tr").append("<td class='compareHeader text-center'><h2>" + classification.name + "</h2></td>");
		}
		classification.features.forEach(function(feature) {
			var featureCode=feature.code.replace(/\./g,"-").replace(/\//g,"-");
			if (!jQuery( "#comparsionResults table tbody#classification" + classification.code + " tr#feature" + featureCode ).length) {
				jQuery( "#comparsionResults table tbody#classification" + classification.code ).append("<tr id='feature" + featureCode + "'></tr>" );
				jQuery( "#comparsionResults table tbody#classification" + classification.code + " tr#feature" + featureCode  ).append("<td  class='compareHeader text-center'><h3>" + feature.name + "</h3></td>" );
				jQuery( "#comparsionResults table tbody#classification" + classification.code ).append("<tr id='feature" + featureCode + "Values'></tr>" );
			}
			jQuery( "#comparsionResults table tbody#classification" + classification.code + " tr#feature" + featureCode + "Values" ).append("<td id='feature" + featureCode + productData.code + "'></td>" );
			feature.featureValues.forEach(function(featureValue) {
				jQuery( "#comparsionResults table tbody#classification" + classification.code + " tr#feature" + featureCode + "Values td#feature" + featureCode + productData.code ).append("<div>" + featureValue.value + "</div>" );
			});
		});
	});
	jQuery(".compareHeader").attr('colspan',jQuery("#comparsionResults table thead tr").children().length);
}

function getProductData(productCode) {
	jQuery.ajax({
		url: "https://www.babyartikel.de/kpfrest/v2/babyartikel/products/" + productCode + "?fields=FULL&accept=application/json",
		type: "GET",
		contentType: 'application/json; charset=utf-8',
		success: function(productData) {
			//here is your json.
			  // process it
				console.log(productData);
				renderComparsionTable(productData);
		},
		error : function(jqXHR, textStatus, errorThrown) {
		},
		timeout: 120000,
	});
}




