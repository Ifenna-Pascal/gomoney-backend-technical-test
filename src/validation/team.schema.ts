import { boolean, number, object, string } from "zod";

export const teamSchema = {
    body: object({
      name: string({
        required_error: 'team name is required'
      }),
      teamCEO: string({
        required_error: "CEO name is required"
      }),
      yearOfEstablishment: string({
        required_error: "year of team establishment is required"
      }),
      location: string({
        required_error: "team location is required"
      }),
      nickName: string({
        required_error: "team nickName is required"
    }),
}),
params: object({
    id: string({
        required_error: "param is required"
    })
})
}

export const fixtureSchema = {
  body: object({
    awayScore: number({
      required_error: "Away score is required"
    }),
    homeScore: number({
      required_error: "Home score is required"
    })
  }),
  status: object({
    isCompleted: boolean({
      required_error: "status is required"
    })
  })
}