/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Nathan Osman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

// George's favorite things
var FAVORITES = {
    "city":             "Georgetown",
    "color":            "blue",
    "colour":           "blue (and it's spelled 'color' FYI)",
    "company":          "Canonical",
    "food":             "fish (surprise)",
    "os":               "Linux",
    "operating system": "Linux",
    "thing":            "doing nothing or almost nothing",
    "user":             "me (yeah, I'm a bit of a narcissist)",
    "website":          "[Ask Ubuntu](http://askubuntu.com)"
};

exports.handlers = [
    {
        types: [8, 18],
        pattern: /^wh(?:at|o|ich)('s|\s+(?:is|are))\s+(your|my)\s+favou?rite\s+([^?.]+)[?.]?/i,
        process: function(e, m, match) {

            // Fill in the patterns from the expression
            var verb  = match[1].toLowerCase(),
                who   = match[2].toLowerCase(),
                thing = match[3].toLowerCase().trim();

            // Change "'s" to is
            if(verb == "'s") {
                verb = "is";
            }

            // Where we look for favorites depends on who the user is asking
            // about - use the predefined list for George and localStorage
            // for retrieving user favorites
            if(who == "your") {
                if(thing in FAVORITES) {
                    return "My favorite " + thing + " " + verb +
                            " " + FAVORITES[thing] + ".";
                } else {
                    return "I don't have a favorite " + thing + ".";
                }
            } else {

                var key = 'favorites-' + e.user_id;

                // Check to see if we have favorites for the user
                if(typeof localStorage[key] !== 'undefined') {
                    if(thing in localStorage[key]) {
                        return "Your favorite " + thing + " " + verb +
                                " " + localStorage[key][thing] + ".";
                    }
                }

                // If we reach here, George doesn't know
                return "How should I know?";
            }
        }
    }
];