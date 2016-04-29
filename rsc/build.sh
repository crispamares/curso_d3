#!/bin/bash

for i in `ls *.md`; do
    name=`basename $i .md`;
    pandoc -t revealjs -V revealjs-url:../rsc/reveal.js -s $i -V transition="linear" -V theme="simple" --smart -c ../rsc/style.css --template=../rsc/template.revealjs -o $name.html;
    pandoc -s $i -t beamer --template=../rsc/default.beamer -o $name.pdf -V graphics;
done
