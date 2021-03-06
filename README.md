[![Build Status](https://travis-ci.org/Tevinthuku/Authors-haven-cli.svg?branch=develop)](https://travis-ci.org/Tevinthuku/Authors-haven-cli)
[![Coverage Status](https://coveralls.io/repos/github/Tevinthuku/Authors-haven-cli/badge.svg?branch=develop)](https://coveralls.io/github/Tevinthuku/Authors-haven-cli?branch=develop)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-by-hipsters.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

## AH CLI

A CLI app that interacts with Author's Haven

## Commands available

1. View all articles `yarn ah list`
2. View specific article `yarn ah view <article-slug>`
3. Save specific article to file `yarn ah view <article-slug> --save`
4. Retrieve specific saved article from file `yarn ah view <article-slug> --offline`
5. Filter article with various flags
   `yarn ah search <flag_name>=<flag_value> <2nd_flag_name=<2nd_flag_value>`


    ### Flags available:


        1. author - to get posts by a specific author `author=tevin`
        2. tag - to get articles with a specific tag `tag=python`
        3. title - to get articles with a title that matches what is provided `title=flutter`
        4. page_size - determines the number of articles displayed per page. `page_size=40`



    Flags can be composed together

    `yarn ah search author=tevin tag=python title=flutter page_size=40`

6. Save to MongoDB database `yarn ah db <article-slug> --save`
7. To read from MongoDB database `yarn ah db <article-slug> --read`

8. To Get help with commands `yarn ah help`
