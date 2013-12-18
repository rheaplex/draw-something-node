This is the online node.js reimplementation of draw-something.

It runs on OpenShift and posts images to tumblr. 

You will need accounts on OpenShift and tumblr to use it.
OpenShift is free software, tumblr isn't.

Some notes on installation follow.


* Register a tumblr app, and authenticate here:

https://api.tumblr.com/console/


* Register for OpenShift here:

https://www.openshift.com/app/account/news


* Create an OpenShift node app:

rhc app create <appname> nodejs-0.10
rhc cartridge add mongodb-2.2 -a <appname>
rhc cartridge add cron-1.4 -a <appname>


* Set an important evironment variable

rhc env set DRAW_SOMETHING_MONGO_URI="<db-uri>" --app <appname>
rhc app restart --app <appname>


* And create a config (inserting the correct values...):

ssh [your OpenShift application]
mongo -u <username> -p <password> --host <host-ip> --port <port> <db-name>
db.config.insert({
  tumblr_consumer_key: '',
  tumblr_consumer_secret: '',
  tumblr_access_token: '',
  tumblr_access_secret: '',
  tumblr_blog_url: '.tumblr.com',
  image_width : 640,
  image_height : 480,
  points_min : 4, 
  points_max : 20
})
exit
exit
