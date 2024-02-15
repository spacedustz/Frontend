import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {NewsResponse} from "../../model/News.ts";
import {getNews} from "../../model/Api.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {HeadLine, Img, Menu, News, NewsCol, NewsContainer} from "../../styles/assignment/NewsApp.ts";

const NewsApp: React.FC = () => {
    const [newsList, setNewsList] = useState<NewsResponse[]>([]);

    const fetchNews = async () => {
        const response = await getNews();

        if (response.data && Array.isArray(response.data)) {
            setNewsList(response.data);
        }
    }

    useEffect(() => {
        fetchNews().catch(error);
    }, []);

    return (
        <div style={{all: "initial"}}>
            <NewsContainer>
                <Container>
                    <section>
                        <HeadLine>
                            <Img src="../../../public/assets/news/noona-title.png" alt="news" />
                        </HeadLine>

                        <Menu>
                            <Button variant="secondary">강의</Button>
                            <Button variant="secondary">커뮤니티</Button>
                            <Button variant="secondary">수강생 작품</Button>
                        </Menu>
                    </section>

                    <section>
                            {newsList.map(it => it.articles?.map((article, index) => (
                                <News key={index}>
                                    <NewsCol lg={4}>
                                        <Img src={article.urlToImage}></Img>
                                    </NewsCol>

                                    <NewsCol lg={7}>
                                        <h2>{article.title}</h2>

                                        <p>{article.description}</p>

                                        <div>{article.publishedAt}</div>
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