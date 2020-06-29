---
title: Feature Flags in VueJs
date: 2020-06-28
keywords: vuejs, vue, directives, v-if, feature flags
description: My journey through implementing of feature flags in my first VueJs project.
---

For my first task in my VueJS project, I had to implement a feature flag solution for the system.
Basically what we needed is a `v-if` checking if the feature flag is enabled or not.

[[info]]
| Feature Flag is a technique used to change software behavior without changing the code. This is
| a powerful technique that is useful is various use cases like gradual rollouts, A/B testing,
| experimentation and quick rollbacks. Feature Flag can also add a lot of complexity to the software
| and can become one of the biggest sources of technical debt.

## My initial solution

As VueJs allows us to create custom directives for the components, I decided to try to toss some sugar
on it and try to create a directive to make it easier to use the feature flags. Directive system in VueJs
is very flexible and would allow me to do some things like this:

```html
<div v-ff:my-feature-flag.on>...</div>
<div v-ff:my-feature-flag.off>...</div>
```

My initial thinking was "let me look at the code for the v-if directive, I'll copy and paste it just
tweaking a little bit the condition and boom, I have my feature flag directive working". But when I
started digging into the VueJs code I found out that `v-if` is not a VueJS directive but a template
compiler directive but what does it mean?

## Dissecting v-if

VueJs has a compiler that compiles your template into a Javascript function. Depending on the situation
this compilation happens in transpile time (like when you use a loader in webpack) or during runtime
(when you use a template property while registering a component).

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
function render() {
  with (this) {
    return _c('div', [
      _c('ul', [
        _c('li', [_v('first item')]),
        _v(' '),
        _c('li', [_v('second item')]),
      ]),
    ]);
  }
}
```

[[info]]
| You might be wondering what `with(this)` means. Turns out `with` is a not recommended
| [statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)
| for extending the scope. This is basically adding everything inside of `this` to be
| available on the scope. VueJs uses it to avoid having to add `this.` before all references
| to `_c` and `_v` functions. But back to the main topic

And if we throw a `v-if` on the `ul`

```html
<ul v-if="isFFEnabled('my-feature-flag')">
  ...
</ul>
```

It gets compiled to a ternary expression

```js
function render() {
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
}
```

This prevents everything inside the `ul` and including it to be instantiated if the
condition is false.

If I implement the `v-ff` as described above, the compiler would generate the following
function:

```js
function render() {
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
}
```

This means that everything inside of the `ul` will be instantiated before the
component with my directive is instantiated and the code of my directive executes.

It is not a big problem in my example but it may cause some undesired side effects like
loading not needed components and creating a long tree of components that won't be rendered
because the feature flag is disabled. These side effects could impact the time to interact
of your application.

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

Based on my research, I don't recommend using custom directives for implementing feature flags
in your VueJs app.

In my case I simply wrote a mixin that exposes a function that checks the feature
flag value. This function can be used inside `v-if` to achieve the result I desired from the
beginning without the need to create a new directive.

```html
<div v-if="isFFEnabled('my-feature-flag')">...</div>
<div v-else>...</div>
```

It is not so sugary as I wanted but it is more resource efficient and does not require any
complex obscure code that no one will understand in some months.
