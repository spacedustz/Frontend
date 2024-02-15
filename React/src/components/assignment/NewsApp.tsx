import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {ArticleResponse, NewsResponse} from "../../model/News.ts";
import {getNewsForAdmin} from "../../model/Api.ts";
import {HeadLine, Img, Menu, News, NewsCol, NewsContainer} from "../../styles/assignment/NewsApp.ts";

const NewsApp: React.FC = () => {
    const [newsList, setNewsList] = useState<NewsResponse[]>([]);
    const [filteredNewsList, setFilteredNewsList] = useState<NewsResponse[]>([]);

    const fetchNews = async () => {
        const response = await getNewsForAdmin();

        console.log("ddd", response.data)
        if (response.data && Array.isArray(response.data)) {
            setNewsList(response.data);
            filterNews('course')
        }
    }

    const filterNews = (sourceId: string) => {
        const filteredNews = newsList.filter((news: NewsResponse) => news.articles?.some((article: ArticleResponse) => article.source?.id === sourceId));
        setFilteredNewsList(filteredNews)
    }

    useEffect(() => {
        fetchNews().catch((error) => { console.error('An error occurred:', error); });
    }, []);

    useEffect(() => {
        filterNews('course');
    }, [newsList]);

    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) {
            return '날짜 정보가 없습니다.'
        } else {
            const date = new Date(dateStr);

            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
        }
    }

    return (
        <div style={{all: "initial"}}>
            <NewsContainer>
                <Container>
                    <section>
                        <HeadLine>
                            <Img src="../../../public/assets/news/noona-title.png" alt="news"/>
                        </HeadLine>

                        <Menu>
                            <Button variant="secondary" onClick={() => filterNews('course')}>강의</Button>
                            <Button variant="secondary" onClick={() => filterNews('community')}>커뮤니티</Button>
                            <Button variant="secondary" onClick={() => filterNews('project')}>수강생 작품</Button>
                        </Menu>
                    </section>

                    <section>
                        {filteredNewsList.map(it => it.articles?.map((article, index) => (
                            <News key={index}>
                                <NewsCol lg={4}>
                                    <Img src={article.urlToImage}></Img>
                                </NewsCol>

                                <NewsCol lg={7}>
                                    <h2>{article.title}</h2>

                                    <p>{article.description}</p>

                                    <div>작성일 : {formatDate(article.publishedAt)}</div>
                                    <div>작성자 : {article.author}</div>
                                </NewsCol>
                            </News>
                        )))}
                    </section>
                </Container>
            </NewsContainer>
        </div>
    );
};

export default NewsApp;