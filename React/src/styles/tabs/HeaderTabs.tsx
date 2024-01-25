import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Outlet, useNavigate} from "react-router-dom";

const TabsStyle = styled(Tabs)`
    button {
        color: white;

        &:hover {
            background-color: dimgray;
            color: white;
            transform: scale(1.12);
            transition: color 0.5s;
        }
    }
`;

const HeaderTabs: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string>("Assignment");
    const navigate = useNavigate();

    const handleSelect = (k: string|null) => {
        if (k) {
            setActiveKey(k);
            navigate(`/${k}`, { replace: true });

        }
    }

    useEffect(() => {
        const currentPath = location.pathname;

        switch (currentPath) {
            case '/Assignment':
                setActiveKey('Assignment');
                break;
            case '/Note':
                setActiveKey('Note');
                break;
            default:
                setActiveKey('Assignment');
        }
    }, [location.pathname]);

    return (
        <TabsStyle
            defaultActiveKey="/"
            id="justify-tab-example"
            className="mb-3"
            justify
            activeKey={activeKey} // 현재 활성화 탭의 eventKey를 설정
            onSelect={handleSelect} // 탭을 선택할때마다 활성화된 탭의 eventKey 업데이트
        >
            <Tab eventKey="Assignment" title={<span style={activeKey === "Assignment" ? {color: "lightblue"} : {}}>과제</span>}>
                <Outlet/>
            </Tab>

            <Tab eventKey="Note" title={<span style={activeKey === "Note" ? {color: "lightblue"} : {}}>공부 노트</span>}>
                <Outlet/>
            </Tab>
        </TabsStyle>
    );
}

export default HeaderTabs;