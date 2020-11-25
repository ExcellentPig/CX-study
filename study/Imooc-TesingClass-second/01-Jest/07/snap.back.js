// import { gennerateConfig, gennerateConfig1 } from './snap'

// test(`测试generateConfig函数`, () => {
// 	// expect(gennerateConfig()).toEqual({
// 	// 	server: 'http://localhost',
// 	// 	prot: 8080
// 	// })
// 	expect(gennerateConfig()).toMatchSnapshot({
// 		time: expect.any(Date)
// 	})
// })

// test(`测试gennerateConfig1函数`, () => {
// 	expect(gennerateConfig1()).toMatchSnapshot({
// 		time: expect.any(Date)
// 	})
// })

// npm install "prettier": "^1.18.2"

import { gennerateConfig, gennerateConfig1 } from "./snap";

test(`测试generateConfig函数`, () => {
  expect(gennerateConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date)
    },
    `
    Object {
      "prot": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  );
});

test(`测试gennerateConfig1函数`, () => {
  expect(gennerateConfig1()).toMatchInlineSnapshot(
    {
      time: expect.any(Date)
    },
    `
    Object {
      "prot": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  );
});
