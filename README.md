# [Ferris Wheel](http://ferris-wheel.herokuapp.com/)

[![Greenkeeper badge](https://badges.greenkeeper.io/TechnologyAdvice/ferris-wheel.svg)](https://greenkeeper.io/)
Share your highs and lows.

# Slack Integration

Add a couple slash commands:

**/high** - pointed to http://ferris-wheel.herokuapp.com/slack/high 

**/low** - pointed to http://ferris-wheel.herokuapp.com/slack/low

Usage:
```
/high <description>
/low <description>
```

Slack username and team domain is collected when posting.

That's it!

# Hacking

1. `npm install` - Install dependencies.
1. `gulp` - Create a build and watch.
1. `node server/web.js` - Start the dev server.

`gulp help` for more commands.
