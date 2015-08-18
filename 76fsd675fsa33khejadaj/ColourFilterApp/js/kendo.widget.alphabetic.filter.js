/**
 * AlphabeticFilter displays A-Z buttons that filter a datasource based on a filed startswith character
 * @widget kendo.ui.AlphabeticFilter
 * @namespace kendo.AlphabeticFilter
 * @options listView, fieldName, orientation
 * @events
 * @methods
 * @usage add a A-Z filter to a lists datasource as a list of buttons
 */

// Start with a closure to protect the global namespace
(function($, kendo) {

    /**
     * Shared variables
     * Define any vars used across the component here as needed.
     * This make them accessible to any method in the component, improves minification and convenience.
     */

    var ui = kendo.ui,
        Widget = ui.Widget,// Attach to the Kendo Widget library or name kendo Widget you want to extend eg: ui.Grid. A copy of the original functions can be found on the .fn object
        proxy = $.proxy,
        alphaFilter = '*';

    // Put reused strings into static var to help minification
    var CLICK = 'click',
        CHANGE = 'change',
        READY = 'ready',
        FOCUS = 'focus',
        BLUR = 'blur',
        KEYDOWN = 'keydown',
        KEYUP = 'keyup',
        MOUSEUP = 'mouseup',
        MOUSEDOWN = 'mousedown',
        MOUSEMOVE = 'mousemove',
        NS = ".kendoAlphabeticFilter",
        SELECT = 'select';

    // Redefine and extend the widget declaring new functionality and overrides
    var AlphabeticFilter = Widget.extend({

        /**
        * Initialises the widget. This method is called automatically after being added to the Kendo collection from instantiation
        * >> IMPORTANT: This is not where DOM elements are created or attached to the DOM see _setup and _render <<
        * @method init
        * @widget AlphabeticFilter
        * @arg  {element} – jQuery DOM element to attach to
        * @arg  {options} – Options provided when called to instantiate
        */

        init: function(element, options) {
            var that = this;

            Widget.fn.init.apply(that, arguments);
            // You do not need to explicitly call _setup() as it is created by Kendo
            that._setup(); // _setup was not being called so I had to add this

            that.dataSource = that.options.dataSource;
            that.fieldName = that.options.fieldName;

            that._render(); // Attach DOM elements created in _setup() to the DOM
            that._bindEvents(); // Call any methods that are required for this widgets initialisation
        },

        options: {
            name: "AlphabeticFilter", // Name is a required unique value and will be added onto the Kendo Widget collection
            orientation: "horizontal",
            filterValues: ["*","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        },

        /**
        * Creates elements toappend to the DOM but does not append them. This method is automatically executed by Kendo on instantiation
        * @method _setup
        * @widget AlphabeticFilter
        */

        _setup: function() {
            var that = this,
                options = that.options, // Get the options from when the widget was initialised
                $element = that.element; // Get a reference to the DOM element. This is a jQuery object

            // After building up the DOM elements, place them back onto the module so that they can be referenced.
            that.template = kendo.template(that.options.template);
            view = that.options.filterValues,
            html = kendo.render(that.template, view);
        },

        /**
        * Attach the created elements from _setup to the DOM
        * @method _render
        * @widget AlphabeticFilter
        */

        // If the widget has a view that is available to the application on load, this would be called immediately.
        // If the component view is only visible after a user event (like a window) then render would be called after receiving that event.

        _render: function() {
          var that = this,
              options = that.options, // Get the options from when the widget was initialised
              $element = that.element; // Get a reference to the DOM element. This is a jQuery object

            $element.html(html);
            $element.children().css("float", (that.options.orientation == "horizontal") ? "left" : "top");
        },

        /**
        * Apply the filter when an element is clicked, highlight the selected filter
        * @method _click
        * @widget AlphabeticFilter
        */
        _click: function(e) {
            var that = this;
            var target = $(e.currentTarget);

            // remove previous selected class
            if(that.alphaFilter){
              that.alphaFilter.removeClass("k-state-selected");
            }

            // set new alphaFilter
            that.alphaFilter = target;
            // set selected class
            that.alphaFilter.addClass("k-state-selected");

            // get filetr value
            var filterValue = that.alphaFilter.attr("filter");

            var clearFilter = false;
            if(filterValue == '*') filterValue = '';

            if(filterValue == undefined || !filterValue || filterValue == ''){
              clearFilter = true;
            }

            that._applyFilter("startswith", clearFilter, filterValue);
        },

        /**
        * Apply/update the filter for the operator
        * @method _applyFilter
        * @widget SearchFilter
        * @arg operator (string) : "eq" (equal to), "neq" (not equal to), "lt" (less than), "lte" (less than or equal to), "gt" (greater than), "gte" (greater than or equal to), "startswith", "endswith", "contains"
        * @arg clearFilter (boolean) : set true if the filter needs to be cleared
        * @arg filterValue : the value of the filter
        */
        _applyFilter: function (operator, clearFilter, filterValue) {
            var that = this;
            var filterDone = false;

            var filter = that.dataSource.filter();

            for (var i = 0; i < filter.filters.length; i++) {
                //console.log(filter.filters[i].operator + ":" + operator.value);
                if (filter.filters[i].operator && filter.filters[i].operator == operator) {
                    if (clearFilter) {
                        filter.filters.splice(i, 1);
                    } else {
                        filter.filters[i].value = filterValue;
                    }
                    filterDone = true;
                    break;
                }
            }

            if (!filterDone) {
                filter.filters.push({ field: that.fieldName, operator: operator, value: filterValue });
            }

            console.log(filter);

            that.dataSource.filter(filter);
        },

        /**
        * Register DOM based  No event delegations can be outside of the scope ot the containing element
        * @method _bindEvents
        * @widget AlphabeticFilter
        */
        _bindEvents: function() {

            var that = this,
            options = that.options, // Get the options from when the widget was initialised
            $element = that.element; // Get a reference to the DOM element. This is a jQuery object

            that.element.on(CLICK + NS, "a", proxy(that._click, that));

            that.dataSource.bind("change", function() {
                // remove previous selected class
                if(that.dataSource.filter().filters.length == 0 && that.alphaFilter){
                  that.alphaFilter.removeClass("k-state-selected");
                }
            });

        }

    });

    // add Class back to ui plugins
    ui.plugin(AlphabeticFilter);

}($, kendo));
