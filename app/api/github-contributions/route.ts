import {NextRequest,NextResponse} from "next/server";

const githubApiUrl=process.env.GITHUB_GRAPHQL_URL

const QUERY = `
  query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function GET(req:NextRequest){
 const {searchParams}=new URL(req.url);
 const username=searchParams.get("username");
 if(!username){
    return NextResponse.json({error:"username query param is required"},{
        status:400
    });
 }
 const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: "GitHub token missing on server. Set GITHUB_TOKEN in .env.local" },
      { status: 500 },
    )
  }

  const today = new Date()
  const from = new Date(today)
  // last 365 days including today
  from.setDate(from.getDate() - 364)

  try {
    const res = await fetch(`${githubApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username,
          from: from.toISOString(),
          to: today.toISOString(),
        },
      }),
    })

    const json = await res.json()

    if (!res.ok || json.errors) {
      console.error("GitHub GraphQL error:", json.errors || json)
      return NextResponse.json(
        { error: "Failed to fetch contributions from GitHub" },
        { status: 500 },
      )
    }

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) {
      return NextResponse.json(
        { error: "No contribution data found for user" },
        { status: 404 },
      )
    }

    const days = calendar.weeks.flatMap((week: any) =>
      week.contributionDays.map((d: any) => ({
        date: d.date as string,
        count: d.contributionCount as number,
      })),
    )

    return NextResponse.json({
      totalContributions: calendar.totalContributions as number,
      days,
    })
  } catch (err) {
    console.error("API route error:", err)
    return NextResponse.json(
      { error: "Internal server error while fetching contributions" },
      { status: 500 },
    )
  }
}