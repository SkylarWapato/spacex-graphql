import { LaunchSortByGql } from './enums'

export interface SpacexLaunchRest {
  mission_name: string
  rocket: {
    rocket_name: string
  }
  launch_date_unix: string
  links: {
    video_link: string
  }
}

export interface SpacexLaunchGql {
  missionName: string
  rocketName: string
  launchDate: string
  videoLink: string
}

export interface LaunchArgs {
  sortBy: LaunchSortByGql
}
