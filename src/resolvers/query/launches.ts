import { ISchemaLevelResolver } from 'graphql-tools'
import fetch from 'node-fetch'

import { compare } from '../../libs/compare'
import { SPACEX_URL } from '../../libs/constants'
import {
  LaunchOrderByRest,
  LaunchSortByGql,
  LaunchSortByRest,
} from '../../libs/enums'
import { filterString } from '../../libs/filter'
import {
  SpacexLaunchGql,
  SpacexLaunchRest,
} from '../../libs/interfaces'

export const launches: ISchemaLevelResolver<{}, {}, {
  sortBy: LaunchSortByGql,
  searchByMission: keyof SpacexLaunchGql | null,
  searchByRocket: keyof SpacexLaunchGql | null,
  searchByStartDate: number | null,
  searchByEndDate: number | null,
}> = async (
  _root,
  { sortBy, searchByStartDate, searchByEndDate, ...args },
  _context,
  _info
): Promise<SpacexLaunchGql[]> => {
    const queryParams = {
      [LaunchSortByGql.launch_date_asc]: {
        sort: LaunchSortByRest.launch_date_unix,
        order: LaunchOrderByRest.asc,
      },
      [LaunchSortByGql.launch_date_desc]: {
        sort: LaunchSortByRest.launch_date_unix,
        order: LaunchOrderByRest.desc,
      },
      [LaunchSortByGql.mission_name_asc]: {
        sort: LaunchSortByRest.mission_name,
        order: LaunchOrderByRest.asc,
      },
      [LaunchSortByGql.mission_name_desc]: {
        sort: LaunchSortByRest.mission_name,
        order: LaunchOrderByRest.desc,
      },
      [LaunchSortByGql.rocket_name_asc]: {
        sort: LaunchSortByRest.launch_date_unix,
        order: LaunchOrderByRest.desc,
      },
      [LaunchSortByGql.rocket_name_desc]: {
        sort: LaunchSortByRest.launch_date_unix,
        order: LaunchOrderByRest.desc,
      },
    }

    const stringSearchMap: Record<string, keyof SpacexLaunchGql> = {
      searchByMission: 'missionName',
      searchByRocket: 'rocketName',
    }

    const urlParams = (new URLSearchParams(sortBy ? queryParams[sortBy] : '')).toString()
    const results: SpacexLaunchRest[] = await (await fetch(`${SPACEX_URL}?${urlParams}`)).json()
    
    const transormedResults: SpacexLaunchGql[] = results.map(item => ({
      missionName: item.mission_name,
      rocketName: item.rocket.rocket_name,
      launchDate: item.launch_date_unix,
      videoLink: item.links.video_link
    })).filter(item => {
      const date = parseInt(item.launchDate)
      const min = searchByStartDate || 0
      const max = searchByEndDate || Infinity

      return date >= min && date <= max
    })

    if (sortBy === LaunchSortByGql.rocket_name_asc) {
      transormedResults.sort(compare('rocketName'))
    } else if (sortBy === LaunchSortByGql.rocket_name_desc) {
      transormedResults.sort(compare('rocketName', LaunchOrderByRest.desc))
    }

    return (Object.keys(args) as Array<keyof typeof args>)
      .filter(key => args[key])
      .reduce<SpacexLaunchGql[]>((total, current) => filterString(args[current]!, stringSearchMap[current], total), transormedResults)
  }