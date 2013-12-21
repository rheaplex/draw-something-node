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


* In OpenShift, install required software:

ssh [your OpenShift application]
cd $OPENSHIFT_DATA_DIR
# We need librsvg to allow ImageMagick to handle SVG
wget ftp://ftp.muug.mb.ca/mirror/centos/6.4/os/x86_64/Packages/librsvg2-2.26.0-5.el6_1.1.0.1.centos.x86_64.rpm
rpm2cpio librsvg2-2.26.0-5.el6_1.1.0.1.centos.x86_64.rpm | cpio -idmv
exit


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
  working_directory: '/tmp',
  image_width : 640,
  image_height : 480,
  points_min : 4, 
  points_max : 20
})
exit
exit
