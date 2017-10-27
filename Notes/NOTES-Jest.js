///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Jest - react testing/////
///////////////////////////////////////////////////////////////////////////////////////////////
yarn add --dev jest

ensuite dans package.json
{
  "name": "Boilerplate",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Axe-Z",
  "license": "MIT",
  "scripts": {
    "dev": "webpack-dev-server",
    "test": "jest"
  },

le partir, dnas le terminal :
yarn test



creer un test:
creer a la racine un rep TESTS

nom des fichiers : truc.test.js



exemple, jest vient avec des variable globales, donc rien a installer de plus
on peut faire nos trucs et tester immediatement :

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
