---
title: 'Nx: Monorepo for my sites'
date: 2020-07-23
keywords: nx, monorepo, Gatsby, typescript, emotion
description: Moving all my websites into a monorepo using Nx.
---

First time I heard about a monorepo was in a talk from a developer from Google.
She quickly mentioned that they used a single repo for all the projects and right after
she finished the talk and opened for questions the first question was "When you say you
have a single repo, you mean a single git repo for all the projects?". She replied simply
"Yes!" with most normality of the world. At the time, I thought it was a crazy nonsense
idea. How do you coordinate everything? How do you avoid crazy conflicts? How do you build,
test and deploy this efficiently? No way that this works!

Some years after that, I've started working in a project that was part of a monorepo. And
everything started to makes sense. Code was all together in the same repo which facilitate
sharing bits of code without the need to create publish and maintain a library. It also
made refactors much easier, if you change one piece of code that is shared, you can easily
change the consumers of that code and run their tests to make sure you can safely deploy
your change without the risk of breaking things and having to release a newer version of
your library. I became an enthusiast of the monorepos.

But you really need to have a good tooling around your monorepo to avoid performance
problems while executing tasks inside your monorepo. This is not a simple task and the
monorepo project that I worked in had a dedicated build team tackling those problems.
Of course a small company cannot afford a whole team just to babysit its monorepo.

## Nx comes to save you

Some time ago I heard a podcast talking about [Nx](https://nx.dev). Nx is a set of tools
that help you run projects in a monorepo style. It has a lot of tools that let you share
code easily, scaffold apps and libraries, run tasks only on affected projects. And they
claim your are going to "help you develop like Google, Facebook, and Microsoft". So why
not?

I always wanted to give it a try but never had a change that made sense to try it. But
during the pandemic, I created a couple of sites (including this one and more to come)
and as a single maintainer of those I felt a little bit the pain of having to upgrade
everything, copy and pasting code from one site to the other and setting up environments,
deployments and everything for every project. So I decided to learn Nx and bring some
monorepo goodness to my sites.

## Process

The process for migrating is pretty simple and
[described on their website](https://nx.dev/angular/migration/overview).

### Create workspace

First you need to create your workspace. For my case I've created an empty workspace.

```sh
yarn create nx-workspace --cli=nx --preset=empty
```

### Create website

As all my sites are created using [Gatsby](http://gatsbyjs.org/), I've installed the
Gatsby plugin for Nx.

```sh
yarn add -D @nrwl/gatsby
```

And then created my website with this command:

```sh
yarn nx g @nrwl/gatsby:app personal
yarn nx g @nrwl/gatsby:app covid19-brazil
```

[[info]]
| While creating the website, you are prompted to choose which css solution you want
| Nx to pre-configure for your website. In my case I've chosen [emotion](https://emotion.sh/).

Nx configure a bunch of different things for you newly created project:

- [Typescript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/) (it creates a separate project for your e2e test)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)

This will cut of lot of time for me! It also incentivizes me to start writing e2e test
giving me everything configured and leaving me free to focus on the test writing instead
of the library setup.

[[info]]
| A couple of days after I started the monorepo, I new major version of Nx was released.
| Because of that update I was able to test the migrations feature of Nx. When I updated
| the library it generated a `migrations.json` the necessary migrations to be performed
| in my existing project. The migrations changed a little bit the organization of the
| monorepo to adapt it the standards of the new major version. It was everything very
| smooth. Hope all major upgrades are that smooth.

### Move my website into it

To move the website, it was as simple as copy na paste the code for my existing project into
the `apps/personal` and `apps/covid19-brazil`.

### Building

One of the most important aspects for me was the ability of to run tasks of the affected
projects of the change I'm merging. The [Covid-19 site](https://covid19.luiz-guilherme.com/)
has more than 5 thousands pages and takes a reasonable time to build and deploy and I don't
want it being deployed when only other sites change.

For that Nx has a command called `affected` which executes tasks only for projects
[affected](https://nx.dev/angular/cli/affected) by the change.

As this builds will be executed by [Github Actions](https://github.com/features/actions)
I had to somehow tell Nx to calculate the projects affected from this all the commits
being merged into master. For that, we can use the `event` object exposed by the actions
runtime:

```yaml
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    name: Build all websites and deploy
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Install dependencies
        run: yarn install
      - name: Test affected websites
        run: yarn nx affected:test --base=${{ github.event.before }}
      - name: e2e test affected websites
        run: yarn nx affected:e2e --base=${{ github.event.before }}
      - name: Build affected websites
        run: yarn nx affected:build --base=${{ github.event.before }}
      - name: Deploy affected websites
        env:
        run: yarn nx affected --target=deploy --base=${{ github.event.before }}
```

Checkout the whole workflow file
[here](https://github.com/luiz290788/sites.luiz-guilherme.com/blob/master/.github/workflows/build-and-deploy.yml).

Now I can share code and build efficiently without the need to publish packages, deal
with links and crazy configuration.

## Conclusion

You can check the repo with all my websites
[here](https://github.com/luiz290788/sites.luiz-guilherme.com).

I definitely have to work more with Nx to have more concentre conclusion (watch out for
future posts) but I'm pretty happy to how things end up. It was pretty easy to configure
the monorepo and I am confident that this will help me move faster and focus on what it
is import specially when I'm building my websites as a hobby.
