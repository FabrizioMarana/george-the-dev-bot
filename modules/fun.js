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

var api = require('../api'),
    lastMention = 0;

exports.handlers = [
    {
        types: [1],
        pattern: /\bbacon\b/i,
        process: function(data) {
            api.starMessage(data.e.message_id);
        }
    },
    {
        types: [1],
        pattern: /\b(politic(?:s|al)|gun\s+control)\b/i,
        process: function(data, match) {

            // In order to keep this from getting out of control, don't do
            // anything if we replied within the last hour
            var now = new Date().getTime();

            if(now - lastMention > 3600000) {
                data.s("It has proudly been ---" + (Math.ceil(Math.random() * 29) + 11) +
                        "--- 0 days since \"" + match[1].toLowerCase() +
                        "\" was last mentioned. Time to reset the clock again. ಠ_ಠ");
                lastMention = now;
            }

            return true;
        }
    }
];
