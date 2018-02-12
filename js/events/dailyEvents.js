define([], function(){


    return [
        {}
    ]
})

/// ???

/*

every event should have a (nullable)requirement 
    +reward / penalty
    +message

-- should be able to return quasi-random values based on a base input
-- Need to subdivide events into categories with a base requirement that determines whether the category is searched
-- random events have a maxValue property: this basically limits how much value the event can add -- the limit of the base modifier that can be passed to it

types of events    {need both good and bad events} - {some kind of luck/leadership stat that affects positivity/frequency of events}
    - purely random / daily - no reqs
    - random, but with reqs such as population / resources / turn #
    - game milestones -- non-random, always fire when reqs are met -- for these, we could insert directly into the events array, rather than waiting for turn end
    - after expedition
    - every event should have a max number of times it can be triggered.


All of this will require the creation of a "state" object that is passed in each time to check against requirements -- just fill with all fields off of which a requirement is based

--------------------------------------------
How to select events?
    - Needs to be semi-random, perhaps with some kind of tier system?
    - can be 0-?multiple? per day
    - milestone events always trigger

            == Process ==

    - First, check for milestone events-- go through all requirements and see if any match, if so, add to event queue, then flag as triggered
        - Then
    - event stat is passed in as base value, modifying frequency + positivity of events
        - this determines an int N, which is pased into a loop, running N times.
        - go through categories, see if base req is met, 
            if so => select random event => check individual requirements => roll to decide if triggered,
            if so => increment times triggered / instantiate class with arg of N up to event's maxValue, add to queue, restart loop of remainder of N
            if no event selected, decrement N


need an eventSelector() -- attach as method to game object
 
possibleEvents  -- 


*/

