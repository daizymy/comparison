var $ = jQuery;

$(document).ready(function() {

  $("#comparsionStart").click(function(){
    var products = [];
    var features = {};
    var productFeatures = {};
    var productCodeArr = $("#compareItems").val().split(",");

    productCodeArr.forEach(function(element) {
        getProductData(element, products, features, productFeatures);
    });

    window.console.log(products, features, productFeatures);

    // Render 1st column
    $('#comparisonFeatures').html();

    var html = '<ul class="product">' +
        '<li class="compHeader">' +
          '<p class="w3-display-middle">Features</p>' +
        '</li>';

    for(var featureCode in features) {
       html = html + '<li>' + features[featureCode] + '</li>';
    }

    html = html + '</ul>';

    $('#comparisonFeatures').append(html);

    // Render product columns
    $('#comparisonProducts1').html('');
    $('#comparisonProducts1').html('');

    products.forEach(function(product, index) {
      html = '<div class="carousel-item' + (index == 0 ? ' active' : '') + '">' +
            '<ul class="product">' +
                '<li class="compHeader">' +
                    '<p class="w3-display-middle">' +
                      '<img src="' + product.image + '" />' +
                      '<b>' + product.manufacturer + '</b> ' + product.name + '<br />' +
                    '</p>' +
                '</li>';

        for(var featureCode in features) {
           var featureValue = '-';
           if (productFeatures.hasOwnProperty(product.code + '_' + featureCode)) {
             featureValue = productFeatures[product.code + '_' + featureCode];
           }
           html = html + '<li>' + featureValue + '</li>';
        }
      html = html + '</ul></div>';

      $('#comparisonProducts1').append(html);
      $('#comparisonProducts2').append(html);
    });
  });

  function getProductData(productCode, products, features, productFeatures) {
    $.ajax({
  		url: "https://www.babyartikel.de/kpfrest/v2/babyartikel/products/" + productCode + "?fields=FULL&accept=application/json",
  		type: "GET",
      async: false,
  		contentType: 'application/json; charset=utf-8',
  		success: function(productData) {

        var whitelist = [
          'kinderwagen-abmessungen-gewicht-abmessungen',
          'kinderwagen-abmessungen-gewicht-gewicht',
          'kinderwagen-fahrwerk-anzahl-raeder',
          // @todo: add more attributes
        ];

        products.push({
          'code': productData.code,
          'name' : productData.name,
          'image' : productData.images[0].url,
          'manufacturer' : productData.manufacturer
        });

        if (productData.hasOwnProperty('classifications')) {
          productData.classifications.forEach(function(classification) {
            classification.features.forEach(function(feature) {
              var featureCode = feature.code.split('/');
                featureCode = featureCode[featureCode.length - 1];
                featureCode = featureCode.replace(/\./g,"-").replace(/\//g,"-");

                if (whitelist.indexOf(featureCode) !== -1 && feature.featureValues[0]) {
                  features[featureCode] = feature.name;
                  productFeatures[productData.code + '_' + featureCode] = feature.featureValues[0].value;
                }
            });
          });
        }
  		},
  		error : function(jqXHR, textStatus, errorThrown) {},
  		timeout: 30000,
  	});
  }
});
