#!/bin/bash
source ./rrp-lib.sh
NAME='point'

function do_generate () {
    rails generate scaffold ${NAME} \
	latitude:string \
	longitude:string \
	hours:string \
	last_viewed:datetime
}

function edit_model () {
    MODEL="${TOP_DIR}/app/models/${NAME}.rb"
    cat >> ${MODEL} <<EOF
#  belongs_to : XXX
#  has_many : XXX
#  validates :name, :presence => true,
#  validates :username, :presence => true, :uniqueness => true
EOF

    $EDITOR ${MODEL}

    echo "Don't forget to edit foreign key model, if applicable" && sleep 1
    
}

function do_migration () {
    read -p "Run db:migrate? <Ctrl-C> to quit" && rake db:migrate
}

###### Main program #######

do_generate
# edit_model
# do_migration
33.95435,-118.38591,"LAX cell phone waiting area"
33.95186,-118.39783,"Trip ticket purchase location"
33.92326,-118.39548,"Lax south waiting area grocery (Sergio)"
