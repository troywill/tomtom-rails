#!/usr/bin/env perl

# TomTom GO LIVE 2535M 5-Inch Bluetooth GPS Navigator with HD Traffic, Lifetime Maps, and Voice Recognition shipped on Saturday October 29, 2011 from Amazon.com

print `lsusb|grep T`; # Bus 001 Device 002: ID 1390:5454 TOMTOM B.V. 
print `ls -l /sys/class/net/usb0`;

