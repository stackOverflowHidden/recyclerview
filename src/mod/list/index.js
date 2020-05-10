/*
 * @Author: your name
 * @Date: 2020-05-10 18:14:58
 * @LastEditTime: 2020-05-10 23:34:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /recyclerview/src/mod/list/index.js
 */
import React from 'react';
import './index.css';

export default function List(props) {
  const { style = {}, dataSource, renderItem } = props;
  if (Object.prototype.toString.apply(dataSource) !== "[object Array]" || Object.prototype.toString.apply(renderItem) !== "[object Function]") {
    return;
  }
  console.log(dataSource)
  
  return <article className="container" style={style}>
    {
      dataSource.map((item, index) => renderItem(item, index))
    }
  </article>
}
