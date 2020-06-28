---
title: v-if is not a directive
date: '2020-06-27'
---

For my first task in my VueJS project, I had to implement a feature flag solution for the system.
Basically what we needed is a `v-if` checking if the feature flag is enabled or not.

## My solution

As Vue allows us to create custom directives for the components, I decided to try to toss some sugar
on it and try to create a directive to make it easier to use the feature flags. Directive system in Vue
is very flexible and would allow me to do some things like this:

```html
<div v-ff:my-feature-flag.on>...</div>
<div v-ff:my-feature-flag.off>...</div>
```

My initial thinking was "let me look at the code for the v-if directive, I'll copy and paste it just
tweaking a little bit the condition and boom, I have my feature flag directive working". But when I
started digging into the VueJs code I found out that `v-if` is not a VueJS directive but a template
compiler directive (yeah yeah, I cheated a little bit on the title) but what does it mean?

## The compiler

VueJs has a compiler that compiles your template into a Javascript function. Depending on the situation
this compilation happens in transpile time (like when you a loader in webpack) or during runtime ( when
you use template property while registering a component).

So if you have this template:

```html
<div>
  <ul>
    <li>first item</li>
    <li>second item</li>
  </ul>
</div>
```

A function that looks like this will be generated to render the template:

```js
with (this) {
  return _c('div', [
    _c('ul', [
      _c('li', [_v('first item')]),
      _v(' '),
      _c('li', [_v('second item')]),
    ]),
  ]);
}
```

[[info]]
| You might be wondering what `with(this)` means. Turns out `with` is a unrecommended
| [statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)
| for extending the scope. This is basically adding everything inside of this to be
| available on the scope. Vue uses it to avoid having to add `this.` before all references
| to `_c` and `_v` functions. But back to the main topic

And if we throw a `v-if` on the `ul`

```html
<ul v-if="isFFEnabled('my-feature-flag')">
  ...
</ul>
```

It gets compiled to a ternary expression

```js
with (this) {
  return _c('div', [
    isFFEnabled('my-feature-flag')
      ? _c('ul', [
          _c('li', [_v('first item')]),
          _v(' '),
          _c('li', [_v('second item')]),
        ])
      : _e(),
  ]);
}
```

This prevents everything inside the `ul` and including it to be instantiated if the
condition is false.

If I implement the custom directive that I've described above, the compiler would
generate the following function:

```js
with (this) {
  return _c('div', [
    _c(
      'ul',
      {
        directives: [
          {
            name: 'ff',
            rawName: 'v-ff:my-feature-flag.on',
            arg: 'my-feature-flag',
            modifiers: { on: true },
          },
        ],
      },
      [_c('li', [_v('first item')]), _v(' '), _c('li', [_v('second item')])],
    ),
  ]);
}
```

This means that everything inside of the `ul` will be instantiated before the
component with my directive is instantiated and the code of my directive executes.
This might not be too much but in a situation where the components are loaded async
and loading two different versions of the same page might affect the time to interact
of your page.

[[info]]
| This is the basis of the [difference](https://vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)
| between `v-if` and `v-show`. `v-show` is a "normal" directive that messes around with the
| `display` css property of the element. My initial solution would function more like
| `v-show`.

Turns out you can write directives for the compiler, I couldn't find much documentation
about compiler directives. Digging into the compiler code I was able to write a directive
but... you cannot do anything like `v-if` because that is a special case and handled
specially by the compiler.

## Final solution

So my solution was just simply write a mixin that exposes a function that checks the feature
flag value and we can simply add that our components and use it with the good old `v-if`.
