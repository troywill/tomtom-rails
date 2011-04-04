#!/usr/bin/env perl
use warnings;
use strict;
use Text::CSV;

open ( my $out, ">", "troy.ov2" );

my $csv = Text::CSV->new ( { binary => 1 } )  # should set binary attribute.
    or die "Cannot use CSV: ".Text::CSV->error_diag ();

# my $csv = Text::CSV->new;

my @rows;
open my $fh, "Lax.csv" or die "Lax.csv: $!";
while ( my $row = $csv->getline( $fh ) ) {
#    $row->[2] =~ m/pattern/ or next; # 3rd field should match
    my $longitude = $row->[0] * 100000;
    my $latitude = $row->[1] * 100000;
    my $name = $row->[2];
    my $length = length($name) + 13 + 1;
    print "==> $length\n";
    print "=> $longitude, $latitude, $length, $name\n";
    push @rows, $row;

    
    my $packed = pack("c V N N A* c", 2, $length, $longitude, $latitude, $name, 0);
    $packed = pack("c V V V A* c", 2, $length, $longitude, $latitude, $name, 0);
    print $out $packed;
}
$csv->eof or $csv->error_diag();
close $fh;

close $out;
