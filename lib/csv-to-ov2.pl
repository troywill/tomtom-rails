#!/usr/bin/env perl
use warnings;
use strict;
use Text::CSV;

my $infile = $ARGV[0];
my $outfile = $ARGV[1];

open my $fh, $infile or die "$infile: $!";
open( my $out, ">", $outfile ) or die "$outfile: $!";


my $csv = Text::CSV->new ( { binary => 1 } )  # should set binary attribute.
    or die "Cannot use CSV: ".Text::CSV->error_diag ();

my @rows;
while ( my $row = $csv->getline( $fh ) ) {
#    $row->[2] =~ m/pattern/ or next; # 3rd field should match
    my $longitude = $row->[0] * 100000;
    my $latitude = $row->[1] * 100000;
    my $name = $row->[2];
    my $length = length($name) + 13 + 1;
    push @rows, $row;

    my $packed = pack("c V V V A* c", 2, $length, $longitude, $latitude, $name, 0);
    print $out $packed;
}
$csv->eof or $csv->error_diag();
close $fh;

close $out;
