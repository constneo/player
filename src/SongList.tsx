// song 获取歌曲列表
// GET: [host]/api/song

// query:

// 参数名	备注
// _start	起始行数，0开始
// _end	结束行数，_end 和 _start 都等于 0 时可以查询全部歌手
// _order	排序，可选值 ASC, DESC
// _sort	排序方式，可选值 random, createdAt, max_year, play_count, play_date, title, album, rating, 可用,分割多个排序方式，如 max_year asc,date asc
// album_id	专辑id
// starred	收藏状态
// title	标题

// 响应头：

// x-total-count: 总行数
// 警告
// 当 _sort = createdAt 时，最多可以获取到 5w 条记录，再往后服务端会报错。
