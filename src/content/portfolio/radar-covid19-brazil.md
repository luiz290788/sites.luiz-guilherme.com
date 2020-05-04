---
title: Radar Covid-19 Brazil
date: 2020-03-28
---

I've created a website called ["Radar Covid-19 Brasil"](https://covid19.luiz-guilherme.com/) using
React and Gatsby to help visualize the [Covid-19 Pandemic](https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic)
data in Brazil.

Besides [Gatsby](https://www.gatsbyjs.org/) and React, I've also used Gatsby Cloud to build the project automatically
and Netlify to host it.

The website is automatically updated by a Google Cloud Function that fetches data from
[Brazilian Ministry of Health](https://saude.gov.br/). The function was developed using [Go](https://golang.org/).
You can check the code for that [here](https://github.com/luiz290788/covid19-brazil-importer).
