export enum LaunchSortByGql {
  mission_name_asc = 'mission_name_asc',
  mission_name_desc = 'mission_name_desc',
  rocket_name_asc = 'rocket_name_asc',
  rocket_name_desc = 'rocket_name_desc',
  launch_date_asc = 'launch_date_asc',
  launch_date_desc = 'launch_date_desc',
}

export enum LaunchSortByRest {
  launch_date_unix = 'launch_date_utc',
  mission_name = 'mission_name',
}

export enum LaunchOrderByRest {
  asc = 'asc',
  desc = 'desc',
}