'use strict'


$(function() {

    var filters = { logic: "and", filters : [] };

    var COLOUR_CHECKS = "input[class=colour-check]",
        COLOUR_LISTVIEW = "#colour-listview",
        LISTVIEW_TEMPLATE = "#listview-template",
        ALPHABETIC_TEMPLATE = "#alphabetic-template",
        TOGGLE_SELECTED = "#toggleSelected",
        REMOVE_FILTER = "#removeFilter",
        SELECTED_COLOURS_COUNT = "#selectedColoursCount",
        COLOUR_ALPHABETIC_FILTER = "#colour-alphabetic-filter",
        COLOUR_SEARCH_FILTER = "#colour-search-filter";

    // Colours data source
    var dataSource = new kendo.data.DataSource({
        data: getData(),
        filter : filters,
        schema: {
            data : "data",
            model: {
                id: "ColourId",
                fields: {
                    "ColourId": { editable: false, nullable: true },
                    "ColourHex": { editable: false },
                    "ColourName": { editable: false }
                }
            }
        }
    });

    // colour list view
    $(COLOUR_LISTVIEW).kendoListView({
        dataSource: dataSource,
        template: kendo.template($(LISTVIEW_TEMPLATE).html())
    });

    // Toggle display of checked colours
    var toggleSelections = function () {
      // if toggle is checked
      if ($(TOGGLE_SELECTED).is(':checked')) {
        // iterate colour-checks
        $(COLOUR_CHECKS).each(function () {
          // if checked show parent, otherwise hide
          if ($(this).is(':checked')) {
            $(this).closest("span.colourItem").show();
          } else {
            $(this).closest("span.colourItem").hide();
          }
        });
      } else {
        // toggle is not checked, show all
        $(COLOUR_CHECKS).each(function () {
            $(this).closest("span.colourItem").show();
        });
      }
    }

    // Toggle selected colours
    $(TOGGLE_SELECTED).change(function (e) {
        toggleSelections();
    });

    // Remove filters
    $(REMOVE_FILTER).click(function (e) {
      dataSource.filter({ logic: "and", filters : [] });
    });

    // Selected colours ViewModel
    var selectedColoursViewModel = kendo.observable({
        selectedColours: []
    });
    // bind colour-checks to selectedColoursViewModel
    kendo.bind($(COLOUR_CHECKS), selectedColoursViewModel);

    // Update selected count
    selectedColoursViewModel.bind("change", function(e){
      $(SELECTED_COLOURS_COUNT).html(selectedColoursViewModel.selectedColours.length);
      toggleSelections();
    });

    // dataSource change updates
    dataSource.bind("change", function() {
      // uncheck toggle when data chages
        $(TOGGLE_SELECTED).attr('checked', false);
      // re-bind colour-checks to selectedColoursViewModel
      kendo.bind($(COLOUR_CHECKS), selectedColoursViewModel);
    });

    // alphabetic filter
    $(COLOUR_ALPHABETIC_FILTER).kendoAlphabeticFilter({
        dataSource: dataSource,
        orientation: "horizontal",
        fieldName: "ColourName",
        template: kendo.template($(ALPHABETIC_TEMPLATE).html())
    });

    // text search filter
    $(COLOUR_SEARCH_FILTER).kendoSearchFilter({
        dataSource: dataSource,
        fieldName: "ColourName"
    });

    // This was needed as using async: false on the datasource transport read did not work
    function getData() {
        var _resData;
        $.ajax({
            type: 'GET',
            url: 'js/data.js',
            dataType: 'json',
            success: function (data) {
                _resData = data;
            },
            data: {},
            async: false
        });
        return _resData;
    }

});
