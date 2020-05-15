/*
 * @Author: your name
 * @Date: 2020-05-10 18:14:58
 * @LastEditTime: 2020-05-15 16:29:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /recyclerview/src/mod/list/index.js
 */
import React, { useEffect } from 'react';
import './index.css';

export default function List(props) {
  const { style = {}, dataSource, renderItem, onEndReach } = props;

  useEffect(() => {
    let observer;
    if (onEndReach && Object.prototype.toString.apply(onEndReach) === "[object Function]") {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        
        onEndReach();
      });
      const footer = document.querySelector(".endReachFooter");
      observer.observe(footer);
    }

    return observer ? () => {
      observer.disconnect();
    } : null;
  }, []);

  if (Object.prototype.toString.apply(dataSource) !== "[object Array]" || Object.prototype.toString.apply(renderItem) !== "[object Function]") {
    return;
  }
  
  return <article
    className="container"
    style={style}
  >
    {
      dataSource.map((item, index) => renderItem(item, index))
    }
    {
      dataSource && <div className="endReachFooter" style={{ width: "100%", height: "100px", }} />
    }
  </article>
}
