var $ = jQuery;
function truncate(input, max) {
    if (input.length > max)
        return input.substring(0,max) + '...';
    else
        return input;
};

$(document).ready(function() {


    var headerOffset = null;
    var comparisonListHeader =  $('#comparisonListHeader');

    $(window).scroll(function() {
        if (headerOffset !== null) {
            var windowOffset = headerOffset - $(window).scrollTop();
            var $lastProduct = $('#comparisonProducts1 .carousel-item.active .product-link').first();
            var lastProductOffset = $lastProduct.offset().top;
            var bottomOffset = lastProductOffset - $(window).scrollTop();
            var showSticky = windowOffset <= 0 && bottomOffset > 210;
            comparisonListHeader.toggleClass('visible', showSticky);
        }

    });


    $("#comparsionStart").click(function(){
        $("#comparisonListWrapper").show();
        var products = [];
        var features = {};
        var productFeatures = {};
        var productCodeArr = $("#compareItems").val().split(",");


        productCodeArr.forEach(function(productCode) {
            getProductData(productCode, products, features, productFeatures);
        });





        // window.console.log(products, features, productFeatures);

        //Reset all containers
        $('#comparisonProducts1').html('');
        $('#comparisonProducts2').html('');
        $('#comparisonHeaderProducts1').html('');
        $('#comparisonHeaderProducts2').html('');



        var html;
        var headerHtml;

        // Render product columns
        products.forEach(function(product, index) {
            //Sticky header
            headerHtml =
                '<div class="carousel-item' + (index == 0 ? ' active' : '') + '">' +
                '<span class="product-image"><img src="' + product.image + '" /></span>' +
                '<span class="product-brand">' + product.manufacturer + '</span>' +
                '<span class="product-name">' +truncate(product.name,55) + '</span>' +
                '<span class="product-price">'+ product.price + '</span>' +
                '</div>';


            $('#comparisonHeaderProducts1').append(headerHtml);
            $('#comparisonHeaderProducts2').append(headerHtml);


            $('#comparisonHeaderProducts2').carousel({
                interval: false,
                ride:false
            }).carousel(1);


            $('#comparisonHeaderProducts1').carousel({
                interval: false,
                ride:false
            });






//Main Sliders
            html =
                '<div class="carousel-item' + (index == 0 ? ' active' : '') + '">' +
                '<ul class="product-list">' +
                '<li class="compHeader">' +
                '<p class="w3-display-middle">' +
                '<img src="' + product.image + '" />' +
                '<b>' + product.manufacturer + '</b> ' + '<b>'+product.name+'</b>' + '<br />' +
                product.price + '<br />' +
                '</p>' +
                '</li>';


            for(var featureCode in features) {
                var featureValue = '-';

                if (productFeatures.hasOwnProperty(product.code + '_' + featureCode).length !== 0) {
                    featureValue = productFeatures[product.code + '_' + featureCode];
                    if (featureValue == undefined){
                        featureValue = '-';
                    }
                }

                if(features[featureCode].maxHeight <= 55){
                    html = html + '<li class="product resize-1">' + '<b>';

                } else {
                    html = html + '<li class="product resize-2">' + '<b>';

                }
                html= html + features[featureCode].name + '</b>' + '<br>'  + featureValue + '</li>';

            }
            html = html + '<li class="product-link"><a href="https://www.babyartikel.de' + product.url+'" class="btn btn-primary btn-block">Zum Produkt</a></li>';
            html = html + '</ul></div>';




            $('#comparisonProducts1').append(html);
            $('#comparisonProducts1').carousel({
                interval: false,
                ride:false
            });
            $('#comparisonProducts2').append(html);
            $('#comparisonProducts2').carousel({
                interval: false,
                ride:false
            }).carousel(1);

            $(".carousel-sync1, .carousel-sync2").swiperight(function() {
                $(this).carousel('prev');
            });
            $(".carousel-sync1, .carousel-sync2").swipeleft(function() {
                $(this).carousel('next');
            });

        });

        /**
         * Create Navigations-indicators;
         */
        var bootCarousel = $("#comparisonCarousel1");

        var indicators1 = $("#comparisonCarousel1 .carousel-indicators");
        indicators1.html('');

        var indicators2 = $("#comparisonCarousel2 .carousel-indicators");
        indicators2.html('');

        var headerIndicators1 = $("#comparisonHeaderCarousel1 .carousel-indicators");
        headerIndicators1.html('');

        var headerIndicators2 = $("#comparisonHeaderCarousel2 .carousel-indicators");
        headerIndicators2.html('');

        bootCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
            // 1st carousel
            (index === 0) ?
                indicators1.append("<li  data-target='#comparisonCarousel1' data-slide-to='" + index + "' class='active'></li>"):
                indicators1.append("<li  data-target='#comparisonCarousel1' data-slide-to='" + index + "'></li>");

            // 1st header carousel
            (index === 0) ?
                headerIndicators1.append("<li  data-target='#comparisonHeaderCarousel1' data-slide-to='" + index + "' class='active'></li>"):
                headerIndicators1.append("<li  data-target='#comparisonHeaderCarousel1' data-slide-to='" + index + "'></li>");

            // 2nd carousel
            (index === 1) ?
                indicators2.append("<li data-target='#comparisonCarousel2' data-slide-to='" + index + "' class='active'></li>") :
                indicators2.append("<li data-target='#comparisonCarousel2' data-slide-to='" + index + "'></li>");

            // 2nd header carousel
            (index === 1) ?
                headerIndicators2.append("<li  data-target='#comparisonHeaderCarousel2' data-slide-to='" + index + "' class='active'></li>"):
                headerIndicators2.append("<li  data-target='#comparisonHeaderCarousel2' data-slide-to='" + index + "'></li>");
        });


        /**
         * Sync carousels
         */
        $('.carousel-sync1').on('slide.bs.carousel', function (ev) {
            // get the direction, based on the event which occurs
            var dir = ev.direction == 'right' ? 'prev' : 'next';

            // get synchronized non-sliding carousels, and make'em sliding
            $('.carousel-sync1').not('.sliding').addClass('sliding').carousel(dir);


        });
        $('.carousel-sync1').on('slid.bs.carousel', function () {
            // remove .sliding class, to allow the next move
            $('.carousel-sync1').removeClass('sliding');
        });

        $('.carousel-sync2').on('slide.bs.carousel', function (ev) {
            // get the direction, based on the event which occurs
            var dir = ev.direction == 'right' ? 'prev' : 'next';
            // get synchronized non-sliding carousels, and make'em sliding
            $('.carousel-sync2').not('.sliding').addClass('sliding').carousel(dir);
        });
        $('.carousel-sync2').on('slid.bs.carousel', function () {
            // remove .sliding class, to allow the next move
            $('.carousel-sync2').removeClass('sliding');
        });

        // sync clicks on carousel-indicators as well
        $('.carousel-sync1 .carousel-indicators li').click(function (e) {
            e.stopPropagation();
            var goTo = $(this).data('slide-to');
            $('.carousel-sync1').not('.sliding').addClass('sliding').carousel(goTo);
        });

        $('.carousel-sync2 .carousel-indicators li').click(function (e) {
            e.stopPropagation();
            var goTo = $(this).data('slide-to');
            $('.carousel-sync2').not('.sliding').addClass('sliding').carousel(goTo);
        });

        var $firstProduct = $('#comparisonProducts1 .product').first();
        headerOffset = $firstProduct.offset().top;
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
                    'kinderwagen-abmessungen-gewicht-hoehe',
                    'kinderwagen-fahrwerk.vorderraeder',
                    'kinderwagen-material-pflege-textilbezug',
                    'kinderwagen-material-pflege-material',
                    'kinderwagen-abmessungen-gewicht-laenge-klappmass',
                    'kinderwagen-abmessungen-gewicht.laenge-sitzflaeche',
                    'kinderwagen-ausstattung.babywanne',



                    // @todo: add more attributes
                ];

                products.push({
                    'code': productData.code,
                    'name' : productData.name,
                    'image' : productData.images[0].url,
                    'manufacturer' : productData.manufacturer,
                    'price': productData.price.formattedValue,
                    'url': productData.url,
                });

                if (productData.hasOwnProperty('classifications')) {
                    productData.classifications.forEach(function(classification) {
                        classification.features.forEach(function(feature) {
                            var featureValue = '';
                            var featureCode = feature.code.split('/');
                            var featureUnit = "";
                            if(typeof feature.featureUnit !== "undefined"){
                                featureUnit=feature.featureUnit.symbol;
                            }
                            featureCode = featureCode[featureCode.length - 1];
                            featureCode = featureCode.replace(/\./g,"-").replace(/\//g,"-");
                            featureValue = feature.featureValues[0].value + ' ' + featureUnit;
                            // if (whitelist.indexOf(featureCode) !== -1 && feature.featureValues[0]) {
                            productFeatures[productData.code + '_' + featureCode] = featureValue;
                            if(typeof features[featureCode] !== 'undefined'){
                                //overwrite maxHeight
                                if(features[featureCode].maxHeight<featureValue.length){
                                    features[featureCode].maxHeight=featureValue.length;
                                }
                            }else{
                                features[featureCode] = {'maxHeight':featureValue.length,'name':feature.name};
                            }

                            //}
                        });
                    });
                }
            },
            error : function(jqXHR, textStatus, errorThrown) {},
            timeout: 30000,
        });
    }
});