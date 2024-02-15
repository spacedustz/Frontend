export type NewsResponse = {
    status?: string,
    totalResults?: number,
    articles?: ArticleResponse[]
}

export type ArticleResponse = {
    source?: Source,
    author?: string,
    title?: string,
    description?: string,
    url?: string,
    urlToImage?: string,
    publishedAt?: string,
    content?: string
}

export type Source = {
    id?: string,
    name?: string
}