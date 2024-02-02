import Tab from 'react-bootstrap/Tab';
import React, {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {TabsStyle} from "../styles/tabs/TabStyle.ts";

const MainTabs: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<string>("Assignment");

    const handleSelect = (k: string|null) => {
        if (k) {
            setActiveKey(k);
            navigate(`/${k}`, { replace: true });

        }
    }

    useEffect(() => {
        const currentPath = location.pathname.slice(1);
        setActiveKey(currentPath)
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
            <Tab eventKey="Assignment" title={<span style={activeKey === "Assignment" ? {color: "lightblue"} : {}}>☃️ 과제 ☃️</span>}>
                <Outlet/>
            </Tab>

            <Tab eventKey="Note" title={<span style={activeKey === "Note" ? {color: "lightblue"} : {}}>📚 공부 노트 📚</span>}>
                <Outlet/>
            </Tab>

            <Tab eventKey="Comment" title={<span style={activeKey === "Comment" ? {color: "lightblue"} : {}}>🐣 방명록 🐣</span>}>
                <Outlet/>
            </Tab>
        </TabsStyle>
    );
}

export default MainTabs;