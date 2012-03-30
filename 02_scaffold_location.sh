#!/bin/bash
source ./rrp-lib.sh
NAME='point'

function do_generate () {
    rails generate scaffold ${NAME} \
	title:string \
	url:string \
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

