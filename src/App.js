/*
 * @Author: your name
 * @Date: 2020-05-10 17:38:52
 * @LastEditTime: 2020-05-15 16:26:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /recyclerview/src/App.js
 */
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import List from './mod/list/index';
import mockData from "./mockData";
import './App.css';

const listStyle = {
  marginTop: "40px",
  flex: "1",
  width: "100%",
  boxSizing: "border-box",
};

function formatNum(param) {
  if (!param) return;

  const num = Number(param);
  if (num < 10000) {
    return num;
  } else if (num >= 10000) {
    return String((num / 10000).toFixed(2)).replace(/.$/, "万");
  }
}

function App() {
  const [dataSource, addDataSource] = useState([]);

  useEffect(() => {
    addDataSource(mockData.slice());
  }, []);

  function renderItem(cardData = {}, index) {
    return <div
      className="container"
      key={`${cardData.id}_${index}`}
      onClick={() => {
        if (!cardData.contentURL) return;

        window.open(cardData.contentURL);
      }}
    >
      {
        cardData.videoUrl ? <video controls className="coverImg" src={cardData.videoUrl} autoPlay={true} /> : <img
          src={cardData.cover}
          className="coverImg"
        />
      }
      {
        cardData.idDraft !== true && cardData.idDraft !== "true" ? <div className="videoPlay">
          <img
            className="videoIcon"
            src="https://gw.alicdn.com/tfs/TB16jJ3BkL0gK0jSZFxXXXWHVXa-30-32.png"
          />
          <span className="readCount">{formatNum(cardData.readCount)}</span>
        </div> : null
      }
      <p className="title">{cardData.title}</p>
      <div className="interactions">
        <img className="comment" src="https://gw.alicdn.com/tfs/TB1WcYecZKfxu4jSZPfXXb3dXXa-60-58.png" />
        <span className="interactionsText">{formatNum(cardData.commentCount)}</span>
        <img className="favour" src="https://gw.alicdn.com/tfs/TB1V.d1BkL0gK0jSZFxXXXWHVXa-60-60.png" />
        <span className="interactionsText">{formatNum(cardData.praiseCount)}</span>
      </div>
      <div className="borderBottom" />
    </div>
  }

  function loadMore() {
    addDataSource(dataSource => [].concat([], dataSource, mockData));
  }

  return (
    <div className="App">
      <header
        className="header"
      >
        无尽流容器
      </header>
      <List
        dataSource={dataSource}
        renderItem={renderItem}
        style={listStyle}
        onEndReach={loadMore}
      />
    </div>
  );
}

export default App;
