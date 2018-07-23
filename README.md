# An example of how to test Redux connected React components with integration tests only

![Travis-ci](https://travis-ci.org/rbrtsmith/react-tdd.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/rbrtsmith/react-tdd/badge.svg?branch=master)](https://coveralls.io/github/rbrtsmith/react-tdd?branch=master)

**Hint:**  You don't need to test reducers, selectors and actions directly.  There's no mock store.  You only test the connected component and assert against all the expected behaviours - this will indirectly test the full redux-flow with fewer, easier to maintain tests.

If you decide that selectors are an abstraction too far then you can bring those directly into the component itself and as long as the behaviour that is presented to the user remains consistent then you won't need to update the tests.
I should also be really easy to completely move away from Redux and use local state without updating tests.

>**A good testing strategy will allow you to refactor with confidence and this is only possible if you can refactor without making changes to tests**


This demonstration has two test suites that cover exactly the same behaviours, one Using [Enzyme](https://github.com/airbnb/enzyme) and the other [React Testing Library](https://github.com/kentcdodds/react-testing-library) as a side-by side comparison.

To run Enzyme tests:
`yarn test:enzyme`

To run React Testing Library tests:
`yarn test:reactTestingLibrary`

Both suites give 100% coverage and avoid testing what I'd describe as implementation details.  Using this approach you can refactor your implementation with confidence and only have to update the tests if the behaviour the user cares about changes.
