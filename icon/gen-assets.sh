#!/bin/sh

resize() {
  convert ${1} -verbose -resize ${2}x${3} ${4}
}

resize gourman-chef.png 72 72 ../src/assets/icons/icon-72x72.png
resize gourman-chef.png 96 96 ../src/assets/icons/icon-96x96.png
resize gourman-chef.png 128 128 ../src/assets/icons/icon-128x128.png
resize gourman-chef.png 144 144 ../src/assets/icons/icon-144x144.png
resize gourman-chef.png 152 152 ../src/assets/icons/icon-152x152.png
resize gourman-chef.png 192 192 ../src/assets/icons/icon-192x192.png
resize gourman-chef.png 384 384 ../src/assets/icons/icon-384x384.png
resize gourman-chef.png 512 512 ../src/assets/icons/icon-512x512.png

