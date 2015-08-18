/**
 * WidgetName is responsible for WidgetDescription
 * @widget kendo.ui.WidgetName
 * @namespace kendo.WidgetName
 * @options 
 * @events 
 * @methods 
 * @usage 
 */


// Start with a closure to protect the global namespace
(function($, kendo) {

    /**
     * Shared variables
     * Define any vars used across the component here as needed. 
     * This make them accessible to any method in the component, improves minification and convenience.
     */

    var ui = kendo.ui,
        Widget = ui.Widget; // Attach to the Kendo Widget library or name kendo Widget you want to extend eg: ui.Grid. A copy of the original functions can be found on the .fn object       

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
        SELECT = 'select';

    // Redefine and extend the widget declaring new functionality and overrides
    var WidgetName = Widget.extend({

        /**
        * Initialises the widget. This method is called automatically after being added to the Kendo collection from instantiation
        * >> IMPORTANT: This is not where DOM elements are created or attached to the DOM see _setup and _render << 
        * @method init
        * @widget WidgetName
        * @arg  {element} – jQuery DOM element to attach to
        * @arg  {options} – Options provided when called to instantiate
        */

        init: function(element, options) { 
            var that = this;
            Widget.fn.init.apply(that, arguments);  // Call the original init method applying the new widget context and all arguments
            // You do not need to explicitly call _setup() as it is created by Kendo

            that._render(); // Attach DOM elements created in _setup() to the DOM
            that._bindEvents(); // Call any methods that are required for this widgets initialisation
        },

        options: {
            name: "WidgetName" // Name is a required unique value and will be added onto the Kendo Widget collection
            // Other options go here if needed
        },

        // Optional - If you have Kendo events you want to bind to or want to expose events for binding, they must be named here
        // events: [].concat(Widget.fn.events, ['change']), // Public events subcribed to 

        /**
        * Description of method. What is does and why.
        * @method name
        * @widget WidgetName
        * @arg  {objectName} – option description 
        * @arg “stringName”
        * @arg [arrayName]
        * @arg +numberName+
        * @arg !booleanName!
        */

        methodname: function(args) {

            var that = this,
                options = that.options, // Get the options from when the widget was initialised
                $element = that.element; // Get a reference to the DOM element. This is a jQuery object

        },

        /**
        * Creates elements toappend to the DOM but does not append them. This method is automatically executed by Kendo on instantiation
        * @method _setup
        * @widget WidgetName
        */

        _setup: function() {

            //     var that = this,
            //         options = that.options, // Get the options from when the widget was initialised
            //         $element = that.element; // Get a reference to the DOM element. This is a jQuery object

            // After building up the DOM elements, place them back onto the module so that they can be referenced.
            // eg, that.list = myDOMElements;
            
        },

        /**
        * Attach the created elements from _setup to the DOM
        * @method _render
        * @widget WidgetName
        */

        // If the widget has a view that is available to the application on load, this would be called immediately. 
        // If the component view is only visible after a user event (like a window) then render would be called after receiving that event. 

        _render: function() { 

            //     var that = this,
            //         options = that.options, // Get the options from when the widget was initialised
            //         $element = that.element; // Get a reference to the DOM element. This is a jQuery object

        },

        /**
        * Register DOM based  No event delegations can be outside of the scope ot the containing element
        * @method _bindEvents
        * @widget WidgetName
        */

        _bindEvents: function() { 

            var that = this,
                options = that.options, // Get the options from when the widget was initialised
                $element = that.element; // Get a reference to the DOM element. This is a jQuery object

        }

    });

    // add Class back to ui plugins
    ui.plugin(WidgetName);

}($, kendo));
