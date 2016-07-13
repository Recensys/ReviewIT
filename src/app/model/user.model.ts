/**
 * Created by jbec on 13/07/2016.
 */


export interface User {
  id: number,
  display_name: string
}

export interface Strategy {
  shares: Map<User,number>
}
