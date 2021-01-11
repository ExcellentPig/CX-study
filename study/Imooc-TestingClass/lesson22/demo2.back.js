import { generateConfig, generateOtherConfig } from "./demo2";

// test(`测试generateConfig函数`,()=>{
// 	// expect(generateConfig()).toEqual({
// 	// 	server: 'http://localhost',
// 	// 	port: 8080
// 	// })

// test(`测试generateConfig函数`,()=>{
// 	expect(generateConfig()).toMatchSnapshot({
// 		time: expect.any(Date)
// 	}); ///快照 匹配
// 	// 命令行u 更新快照 snapshot
// })

// test(`测试generateOtherConfig函数`,()=>{
// 	expect(generateOtherConfig()).toMatchSnapshot(); ///快照 匹配
// 	// 命令行i 然后u  可以一个一个的更新快照
// })

test(`测试generateConfig函数`, () => {
  expect(generateConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date)
    },
    `
    Object {
      "dimain": "localhost",
      "port": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  ); ///快照 匹配
  // 命令行u 更新快照 snapshot
});

test(`测试generateOtherConfig函数`, () => {
  expect(generateOtherConfig()).toMatchInlineSnapshot(`
    Object {
      "dimain": "localhost1",
      "port": 8090,
      "server": "http://localhost",
    }
  `); ///快照 匹配
  // 命令行i 然后u  可以一个一个的更新快照
});
