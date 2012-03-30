#!/usr/bin/perl
#### Begin section: Edit these variables for the spin box to the foreign key ####
my $child = 'item'; # The child table singularized, e.g. 'item' or 
my $foreign_model = 'Location'; # The foreign model, e.g. 'Location'
my $foreign_key = 'location_id'; # The foreign key in the child table, e.g. 'location_id'
my $foreign_attribute = 'name'; # The thing you want to lookup in the foreign table e.g. 'name'
#### End section: Edit these variables ####

sub spin_box {
    my $spin_box = "<%= select(\"$child\", \"$foreign_key\", $foreign_model.find(:all).collect { |p| [p.$foreign_attribute, p.id]}) %>";
    return $spin_box;
}

#############################################################
#     <%= f.label :person_id %><br />
#     <%= select("torrent", "person_id", Person.find(:all).collect { |p| [p.name, p.id]}) %>
#############################################################

my $spin_box = &spin_box;
print "$spin_box\n";
