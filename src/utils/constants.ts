/*
 * To keep the template simple and small we're adding padding to prevent view
 * from rendering under the System UI.
 * For bigger apps the recommendation is to use `react-native-safe-area-context`:
 * https://github.com/AppAndFlow/react-native-safe-area-context
 *
 * You can read more about it here:
 * https://github.com/react-native-community/discussions-and-proposals/discussions/827
 */
export const safePadding = "5%"

export enum RemoteKeys {
  down = "down",
  up = "up",
  right = "right",
  left = "left",
  select = "select",
  key0 = "0",
  key1 = "1",
  key2 = "2",
  key3 = "3",
  key4 = "4",
  key5 = "5",
  key6 = "6",
  key7 = "7",
  key8 = "8",
  key9 = "9"
}

export enum Routes {
  Home = "Home",
  Demo = "Demo",
  Login = "Login",
  AlbumList = "AlbumList",
  Zero = "Zero",
  More = "More",
  Tabs = "Tabs"
}

export type RoutesParamList = {
  [Routes.Home]: undefined // 无参数
  [Routes.Login]: undefined // 无参数
  [Routes.Demo]: undefined // 无参数
  [Routes.AlbumList]: undefined // 无参数
  [Routes.More]: undefined // 无参数
  [Routes.Zero]: undefined // 无参数
}
