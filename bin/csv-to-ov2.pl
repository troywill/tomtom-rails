#!/usr/bin/env perl
use warnings;
use strict;
use Text::CSV;

my $infile = $ARGV[0];

# Given an input file, which I assume to be somename.csv,
# created an output file ov2/_somename.ov2


$infile =~ m/csv\/(.*?)\.csv/;
my $basename = $1;
my $outfile = "ov2/_" . $basename . ".ov2";

open my $fh, $infile or die "$infile: $!";
open( my $out, ">", $outfile ) or die "$outfile: $!";


my $csv = Text::CSV->new ( { binary => 1 } )  # should set binary attribute.
    or die "Cannot use CSV: ".Text::CSV->error_diag ();

my @rows;
while ( my $row = $csv->getline( $fh ) ) {
#    $row->[2] =~ m/pattern/ or next; # 3rd field should match
    my $latitude = $row->[0] * 100000;
    my $longitude = $row->[1] * 100000;
    my $name = $row->[2];
    my $length = length($name) + 13 + 1;
    push @rows, $row;

    my $packed = pack("c V V V A* c", 2, $length, $longitude, $latitude, $name, 0);
    print $out $packed;
}
$csv->eof or $csv->error_diag();
close $fh;

close $out;
