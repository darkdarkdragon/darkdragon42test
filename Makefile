MANAGE=django-admin.py
ROOT_DIR=`pwd`

test:
	PYTHONPATH=`pwd` DJANGO_SETTINGS_MODULE=django_angular_backend.settings $(MANAGE) test
	cd django_angular_backend/static; npm --cache npm_cache install
	export XDG_CACHE_HOME=bower_cache/cache; export XDG_CONFIG_HOME=bower_cache/config; export XDG_DATA_HOME=bower_cache/data; cd django_angular_backend/static; node node_modules/bower/bin/bower install --config.interactive=false
	cd django_angular_backend/static; npm run test-barista

localtest:
	. $(ROOT_DIR)/.env/bin/activate; PYTHONPATH=`pwd` DJANGO_SETTINGS_MODULE=django_angular_backend.settings $(MANAGE) test
	cd django_angular_backend/static; npm run test-single-run
run:
	. $(ROOT_DIR)/.env/bin/activate; PYTHONPATH=`pwd` DJANGO_SETTINGS_MODULE=django_angular_backend.settings $(MANAGE) runserver

syncdb:
	PYTHONPATH=`pwd` DJANGO_SETTINGS_MODULE=django_angular_backend.settings $(MANAGE) syncdb --noinput


install:
	virtualenv --no-site-packages .env
	. $(ROOT_DIR)/.env/bin/activate; pip install -r $(ROOT_DIR)/requirements.txt
	. $(ROOT_DIR)/.env/bin/activate; make syncdb
	cd django_angular_backend/static; npm install
	cd django_angular_backend/static; bower install
