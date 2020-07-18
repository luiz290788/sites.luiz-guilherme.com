---
title: mockOf
date: 2020-07-16
keywords: typescript, jest, mock, test, testing, unit test
description: Mocking entire objects in using Jest and Typescript
---

Lately I've been working more closely with backend applications written in Typescript
using a Object-Oriented programming with Inversify for dependency injection and Jest
for unit and integration test.

The dependencies of our classes are inject by Inversify in the constructor and while
writing testings we can inject mocks to isolate the class being tested.

Jest is great for mocking using `jest.fn()`, `jest.mock()` and `jest.spy()`. With `fn`
you can create a mock function which you can use to verify calls to that function checking
arguments and number of calls also simulating the behaviour controlling the return or
giving it an implementation. With `mock` you can mock an entire Javascript module
changing its content completely. This is very useful when you are using third party
libraries that you want verify calls against and change behavior. Lastly `spy` is useful
if you want change a single function of an object. It will replace the function with a
mocked function and then after you finish testing it will put the original function back
into the object.

But having a Java background and loving to use mockito for creating mocks of classes and
interfaces, I always missed the ability to give a type to a function and it gives me back
a mock of that type. So I decided to try to do that using Typescript and Jest.

I did a little bit of research on how to solve that problem. Javascript does not have
reflection capabilities that Java has because Typescript types does not exist during
runtime. But there is one very simple class in Javascript that I could use to achieve something
similar: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

Proxy is a class creates a wrapper around an object where you can capture various different
accesses to that object. You could use to validate properties before setting them in
target object and define properties dynamically.

For my solution, I will take advantage of the dynamically definition of properties. When
I need to create a mock of a class or object I will simply return a Proxy to an empty
object and whenever a property is read from the proxy I check if exists in the target
object, if it doesn't I return a `jest.fn()` and save it on the target object.

```Typescript
export const mockOf = <T extends {}>(target: Partial<T> = {}, excludes = ['then']): Mocked<T> =>
  new Proxy(target, {
    get: (target, property, ...rest) => {
      const targetValue = Reflect.get(target, property, ...rest)
      if (targetValue !== undefined || excludes.find(excluded => excluded === property)) {
        return targetValue
      }
      const newMock = jest.fn()
      Reflect.set(target, property, newMock)
      return newMock
    }
  }) as Mocked<T>
```

[[info]]
| You probably noticed that second argument in the function: `excludes`. This is necessary
| because there are some situations that we don't want our mock object to return a mock
| function for specific properties. An example of this is when the mock object is returned
| by a promise callback or awaited in a async/await function. The promise will check if that
| object is a "thenable" by looking for the `then` function in the mock object which will always
| be defined by our proxy. That's why we need to somehow tell the proxy to ignore some attributes
| just returning `undefined`.

As for the types, I am casting the proxy to a `Mocked` type that takes advantage of Typescript
Conditional Types to say that every function type in the mocked object also has the signature of
a `jest.fn()`.

```Typescript
export type Mocked<T> = T & {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? jest.Mock<ReturnType<T[K]>, Parameters<T[K]>> & T[K]
    : T[K];
};
```

Typescript here will also guard that only attributes in the type will be accessible in the mock
object.

Now I can use this function like this:

```Typescript
interface Calculator {
  sum(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calculatorMock = mockOf<Calculator>()
calculatorMock.sum.mockReturnValue(10);
expect(calculatorMock.sum(2, 4)).toBe(10);
expect(calculatorMock.sum).toHaveBeenCalled();
```

This facilitated a lot how I write my tests because I can trust the types of the mocked object
without having to unsafely type cast them and without the need to define a mock object with
every method defined by the interface.
