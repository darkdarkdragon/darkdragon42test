#! /bin/sh

echo "Script executed from: ${PWD}"

cd django_angular_backend/static/
npm --cache npm_cache install
export XDG_CACHE_HOME=bower_cache/cache
export XDG_CONFIG_HOME=bower_cache/config
export XDG_DATA_HOME=bower_cache/data
node node_modules/bower/bin/bower install -V --config.interactive=false

cd ../..
#echo "Script executed from: ${PWD}"
#
#

../uwsgi/post_deploy.sh "$@"

