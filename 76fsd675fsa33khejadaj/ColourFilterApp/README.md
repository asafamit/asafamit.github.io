Intro
-------

I implemented all the features as described in 'Javascript Assessment.docx'.
I haven't introduced any extra libraries or code to the application apart from my own.
This was my first time using Kendo UI and Telerik Testing Framework.
I used mostly TDD during implementation, my process involved a mini prototype phase for each feature followed by feature completion using TDD.
For developement productivity I also used nodejs/npm with grunt watch https://github.com/gruntjs/grunt-contrib-watch
The application is the ColourFilterApp folder

A few assumptions regarding behavior
------------------------------------

- 'Toggle Only Show Selected' is reset after every filer / search event
- Text search is a 'contains' query rather than a 'starts with', makes sense that the search term 'blue' will match on 'blueviolet' and 'skyblue'
- No need for an 'Apply Filter' button as filers get applied automatically on user input
- 'Remove Filter' button removes all the filters

Main app source files
---------------------

js/app.js							: application js file
js/kendo.widget.alphabetic.filter	: alphabetic filter widget
js/kendo.widget.search.filter		: text search filter widget
styles/app.css						: application specific css
alphabetic-list.html				: updated appliction page
tests/EndToEndTest.cs				: end to end tests of the application

Testing
-------

I chosen to use Telerik Testing Framework + NUnit for automated testing with, in the past I used Cucumber/SpecFlow + WebDriver

Running the tests:

- Run a local web server on port 8080 with the root being the application directory e.g:
	cd "C:\Program Files (x86)\IIS Express\"
	iisexpress /path:C:\Users\asaf\Desktop\JavascriptAssessment_Asaf\ColourFilterApp /port:8080
- Install Visual Studio 2013
- Install Telerik Testing Framework ( http://docs.telerik.com/teststudio/testing-framework/getting-started )
- Open ColourFilterApp.sln in VS 2013
- Install NUnit ( http://docs.telerik.com/teststudio/testing-framework/using-nunit )
- Install NUnit Test Adapter
- From the Test Explorer "Run All"
- The tests are all in tests/EndToEndTest.cs
