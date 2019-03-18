import 'whatwg-fetch'

export async function request<T extends object>(
  url: string,
  option?: RequestInit | undefined
): Promise<T> {
  try {
    const res: Response = await fetch(url, option)
    return await res.json()
  } catch (err) {
    throw err
  }
}
