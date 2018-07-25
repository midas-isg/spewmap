//globals
var GOOGLE_ANALYTICS_TRACKING_ID = 'UA-122846038-1',
	ANALYTICS_TRACKER = 'SPEWMap',
	ga;

(function(){
	/* --Google Site Tag-- */
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	
	gtag('config', GOOGLE_ANALYTICS_TRACKING_ID);
	/* --Google Site Tag-- */
	
	/* -- Google Analytics -- */
	ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
	ga('create', GOOGLE_ANALYTICS_TRACKING_ID, 'auto', ANALYTICS_TRACKER);
	
	//This is called when tracker is created, so it's redundant to include
	//ga(ANALYTICS_TRACKER + '.send', 'pageview');
	
	/*
	//typical send 'hit' usage
	//Note: values specified in ...fields and fieldsObject are sent with the current hit,
	//but they are not stored on the tracker object. Use the set method to update a tracker.
	
	ga('[trackerName.]send', [hitType], [...fields], [fieldsObject]);
		[hitType] {...fields}
			pageview {page}
			event {eventCategory, eventAction, eventLabel, eventValue}
			social {socialNetwork, socialAction, socialTarget}
			timing {timingCategory, timingVar, timingValue, timingLabel}
	
	//Sends a pageview hit.
	ga('send', 'pageview');
	
	//Sends an event hit for the tracker named "myTracker" with the following category,
	//action, and label, and sets the nonInteraction field value to true.
	ga('send', 'event', 'link', 'click', 'http://example.com', {
	  nonInteraction: true
	});
	
	//typical set field usage
	// Sets a single field and value.
	ga('[trackerName.]set', fieldName, fieldValue);
	
	// Sets a group of field/value pairs.
	ga('[trackerName.]set', fieldsObject);
	*/
	
	/* -- Google Analytics -- */
	
	return;
})();
