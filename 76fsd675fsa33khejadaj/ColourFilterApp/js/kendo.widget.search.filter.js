/**
 * SearchFilter - filters a lists datasource by a text contained in a field 
 * @widget kendo.ui.SearchFilter
 * @namespace kendo.SearchFilter
 * @options listView, fieldName
 * @events
 * @methods
 * @usage creates a textfield for text search filtering a listView by a field
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
        proxy = $.proxy;

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
        PASTE = 'paste',
        NS = ".kendoSearchFilter",
        SELECT = 'select';

    // Redefine and extend the widget declaring new functionality and overrides
    var SearchFilter = Widget.extend({

        /**
        * Initialises the widget. This method is called automatically after being added to the Kendo collection from instantiation
        * >> IMPORTANT: This is not where DOM elements are created or attached to the DOM see _setup and _render <<
        * @method init
        * @widget SearchFilter
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
            name: "SearchFilter", // Name is a required unique value and will be added onto the Kendo Widget collection
            template:  "<input id='search-filter-input' class='k-textbox' placeholder='#: placeholder #' type='text' >",
        },

        /**
        * When user input changes update the filter.
        * @method _inputChange
        * @widget SearchFilter
        */
        _inputChange: function() {
            var that = this;

            var clearFilter = false;
            var filterValue = that.textbox.val();

            if(filterValue == undefined || !filterValue || filterValue == '' ){
              clearFilter = true;
            }

            that._applyFilter("contains", clearFilter, filterValue);
        },

        /**
        * Apply/update the filter for the operator
        * @method _applyFilter
        * @widget SearchFilter
        * @arg operator (string) : "eq" (equal to), "neq" (not equal to), "lt" (less than), "lte" (less than or equal to), "gt" (greater than), "gte" (greater than or equal to), "startswith", "endswith", "contains"
        * @arg clearFilter (boolean) : set true if the filter needs to be cleared
        * @arg filterValue : the value of the filter
        */
        _applyFilter: function(operator, clearFilter, filterValue) {
            var that = this;
            var filterDone = false;

            var filter = that.dataSource.filter();

            for (var i = 0; i < filter.filters.length; i++) {
              //console.log(filter.filters[i].operator + ":" + operator.value);
              if(filter.filters[i].operator && filter.filters[i].operator == operator){
                if(clearFilter){
                  filter.filters.splice(i,1);
                } else {
                  filter.filters[i].value = filterValue;
                }
                filterDone = true;
                break;
              }
            }

            if(!filterDone){
                filter.filters.push({ field: that.fieldName, operator: operator, value: filterValue });
            }

            console.log(filter);

            that.dataSource.filter(filter);
        },



        /**
        * Creates elements toappend to the DOM but does not append them. This method is automatically executed by Kendo on instantiation
        * @method _setup
        * @widget SearchFilter
        */
        _setup: function () {
            var that = this,
                options = that.options, // Get the options from when the widget was initialised
                $element = that.element; // Get a reference to the DOM element. This is a jQuery object

            // After building up the DOM elements, place them back onto the module so that they can be referenced.
            var template = kendo.template(options.template);
            that.textbox = $(template({ placeholder: "Search colour names..." }));
        },

        /**
        * Attach the created elements from _setup to the DOM
        * @method _render
        * @widget SearchFilter
        */

        // If the widget has a view that is available to the application on load, this would be called immediately.
        // If the component view is only visible after a user event (like a window) then render would be called after receiving that event.

        _render: function() {
            var that = this,
                options = that.options, // Get the options from when the widget was initialised
                $element = that.element; // Get a reference to the DOM element. This is a jQuery object

            that.element.append(that.textbox);

        },

        _bindEvents: function() {

            var that = this,
                options = that.options, // Get the options from when the widget was initialised
                $element = that.element; // Get a reference to the DOM element. This is a jQuery object

            that.textbox.keyup(function (e) {
                that._inputChange();
            });

            that.dataSource.bind("change", function() {
                // remove previous selected class
                if(that.dataSource.filter().filters.length == 0){
                    that.textbox.val('');
                }
            });

        },

    });

    // add Class back to ui plugins
    ui.plugin(SearchFilter);

}($, kendo));
