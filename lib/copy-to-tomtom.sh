#!/bin/bash
sudo mount /dev/disk/by-label/INTERNAL /mnt/tomtom/
# sudo cp --interactive ov2/* /mnt/tomtom/North_America_2GB/
sudo cp --verbose ov2/* /mnt/tomtom/North_America_2GB/
time sync

