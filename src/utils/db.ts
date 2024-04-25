import { ShortenedUrl, User, db, eq, like } from "astro:db"

export const getUserByEmail = async (email: string) => {
  try {
    const res = await db.select().from(User).where(
      like(User.email, email)
    )
  
    if (res.length === 0) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: res[0]
    }
  } catch (e) {
    const error = e as Error
    return {
      success: false,
      error: error.message
    }
  }
}

export const getLinkUrl = async (code: string) => {
  try {
    const res = await db.select().from(ShortenedUrl).where(
      like(ShortenedUrl.code, code)
    )

    if (res.length === 0) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: res[0].url
    }
  } catch (e) {
    const error = e as Error
    return {
      success: false,
      error: error.message
    }
  } 
}

export const getUrlsFromUser = async (userId: number) => {
  try {
    const res = await db.select({
      url: ShortenedUrl.url,
      code: ShortenedUrl.code
    }).from(ShortenedUrl).where(
      eq(ShortenedUrl.userId, userId)
    )

    return {
      success: true,
      data: res
    }
  } catch (e) {
    const error = e as Error
    return {
      success: false,
      error: error.message
    }
  }
}
