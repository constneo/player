export interface UserInfo {
  id: string
  isAdmin: boolean
  lastFMApiKey: string
  name: string
  subsonicSalt: string
  subsonicToken: string
  token: string
  username: string
}

//id:"keepalive"
// response:"ok"

export interface KeepaliveRes {
  id: string
  response: string
}

const al = {
  playCount: 132,
  playDate: "2025-05-05T23:21:12.328+08:00",
  starred: true,
  starredAt: "2025-04-15T22:42:53.136028+08:00",
  id: "4slt91ocnF4iG7Vmc4Ppxo",
  libraryId: 1,
  name: "大声唱",
  albumArtistId: "7KvoHegTtKg0qkSy46sfq0",
  albumArtist: "凤凰传奇",
  maxYear: 2011,
  minYear: 2011,
  date: "2011",
  maxOriginalYear: 0,
  minOriginalYear: 0,
  compilation: false,
  songCount: 9,
  duration: 2238.5898,
  size: 90063250,
  discs: { "1": "" },
  orderAlbumName: "大声唱",
  orderAlbumArtistName: "凤凰传奇",
  explicitStatus: "",
  externalInfoUpdatedAt: null,
  genre: "",
  genres: null,
  participants: {
    albumartist: [{ id: "7KvoHegTtKg0qkSy46sfq0", name: "凤凰传奇" }],
    artist: [{ id: "7KvoHegTtKg0qkSy46sfq0", name: "凤凰传奇" }]
  },
  missing: false,
  importedAt: "2025-04-15T23:12:54.2915303+08:00",
  createdAt: "2024-11-21T01:56:28.6492368+08:00",
  updatedAt: "2023-09-12T19:50:12+08:00"
}
export interface AlbumItem {
  id: string //"4slt91ocnF4iG7Vmc4Ppxo",
  name: string //"大声唱",
  playCount: number //132,
  albumArtist: string //"凤凰传奇",
  playDate: string //"2025-05-05T23:21:12.328+08:00"
  starred: true
  starredAt: string //"2025-04-15T22:42:53.136028+08:00"

  libraryId: number // 1

  albumArtistId: string // "7KvoHegTtKg0qkSy46sfq0"

  maxYear: number // 2011
  minYear: number //2011
  date: string //  "2011"
  maxOriginalYear: number // 0
  minOriginalYear: number // 0
  compilation: boolean // false
  songCount: number // 9
  duration: number // 2238.5898
  size: number // 90063250
  discs: any // { "1": "" }
  orderAlbumName: string // "大声唱"
  orderAlbumArtistName: string // "凤凰传奇"
  explicitStatus: ""
  externalInfoUpdatedAt: null
  genre: string // ""
  genres: null // 类型
  participants: {
    // 参与者
    albumartist: Array<any> // [{ id: "7KvoHegTtKg0qkSy46sfq0"; name: "凤凰传奇" }]
    artist: Array<any> // [{ id: "7KvoHegTtKg0qkSy46sfq0"; name: "凤凰传奇" }]
  }
  missing: boolean // false
  importedAt: string // "2025-04-15T23:12:54.2915303+08:00"
  createdAt: string // "2024-11-21T01:56:28.6492368+08:00"
  updatedAt: string // "2023-09-12T19:50:12+08:00"
}
